/* eslint-disable react-native/no-inline-styles */
import { useScrollToTop } from "@react-navigation/native"
import { StatusBar, StatusBarProps, StatusBarStyle } from "expo-status-bar"
import { ReactNode, useRef, useState } from "react"
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { useAppTheme } from "@/utils/useAppTheme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

export const DEFAULT_BOTTOM_OFFSET = 50

interface ScreenProps {
  children?: ReactNode
  style?: string
  contentContainerStyle?: string
  safeAreaEdges?: string
  backgroundColor?: string
  statusBarStyle?: StatusBarStyle
  keyboardOffset?: number
  keyboardBottomOffset?: number
  StatusBarProps?: StatusBarProps
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
  preset?: "fixed" | "scroll" | "auto"
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  ScrollViewProps?: ScrollViewProps
}

const isIos = Platform.OS === "ios"

function useAutoPreset({ preset }: ScreenProps) {
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const scrollViewHeight = useRef<number | null>(null)
  const scrollViewContentHeight = useRef<number | null>(null)

  function updateScrollState() {
    if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return
    const contentFitsScreen = scrollViewContentHeight.current < scrollViewHeight.current * 0.92
    setScrollEnabled(!contentFitsScreen)
  }

  function onContentSizeChange(_: number, h: number) {
    scrollViewContentHeight.current = h
    updateScrollState()
  }

  function onLayout(e: LayoutChangeEvent) {
    scrollViewHeight.current = e.nativeEvent.layout.height
    updateScrollState()
  }

  return { scrollEnabled: preset === "auto" ? scrollEnabled : true, onContentSizeChange, onLayout }
}

function ScreenWithoutScrolling({ children, style, contentContainerStyle }: ScreenProps) {
  return (
    <View className={` flex-1 h-full w-full ${style}`}>
      <View className={` justify-start items-stretch ${contentContainerStyle}`}>{children}</View>
    </View>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    keyboardBottomOffset = DEFAULT_BOTTOM_OFFSET,
    ScrollViewProps,
    style,
    contentContainerStyle,
  } = props
  const ref = useRef<ScrollView>(null)
  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props)
  useScrollToTop(ref)

  return (
    <KeyboardAwareScrollView
      bottomOffset={keyboardBottomOffset}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      scrollEnabled={scrollEnabled}
      ref={ref}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e)
        ScrollViewProps?.onLayout?.(e)
      }}
      onContentSizeChange={(w, h) => {
        onContentSizeChange(w, h)
        ScrollViewProps?.onContentSizeChange?.(w, h)
      }}
      className={`pt-20 pb-10 px-4 flex-1 bg-white overflow-visible ${style}`}
      contentContainerClassName={`justify-start items-stretch ${contentContainerStyle}`}
    >
      {children}
    </KeyboardAwareScrollView>
  )
}

export function Screen(props: ScreenProps) {
  const {
    theme: { colors },
    themeContext,
  } = useAppTheme()
  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps,
    statusBarStyle,
  } = props
  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges as any)

  return (
    <View
      className={`flex-1 h-full w-full ${containerInsets}`}
      style={{ backgroundColor: backgroundColor || colors.background }}
    >
      <StatusBar
        style={statusBarStyle || (themeContext === "dark" ? "light" : "dark")}
        {...StatusBarProps}
      />
      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        className="flex-1"
      >
        {props.preset === "fixed" ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </View>
  )
}

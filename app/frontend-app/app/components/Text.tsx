import { Text as RNText, TextProps as RNTextProps } from "react-native"
import { ReactNode } from "react"
import { typography } from "@/theme/typography"

interface Props extends RNTextProps {
  className?: string
  children: ReactNode
}

const fontMap: Record<string, string> = {
  "font-thin": typography.primary.thin,
  "font-extralight": typography.primary.extraLight,
  "font-light": typography.primary.light,
  "font-normal": typography.primary.normal,
  "font-medium": typography.primary.medium,
  "font-semibold": typography.primary.semiBold,
  "font-bold": typography.primary.bold,
  "font-extrabold": typography.primary.extraBold,
  "font-black": typography.primary.black,
}

export function Text({ children, className = "", style, ...props }: Props) {
  const fontFamily =
    className
      .split(" ")
      .map((cls) => fontMap[cls])
      .find(Boolean) || typography.primary.normal

  return (
    <RNText style={[{ fontFamily }, style]} {...props} className={className}>
      {children}
    </RNText>
  )
}

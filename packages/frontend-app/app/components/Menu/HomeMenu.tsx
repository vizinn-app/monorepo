/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */

import { useState } from "react"
import { View, TouchableOpacity, FlatList } from "react-native"
import { Text } from "@/components/Text"

interface Props extends React.ComponentProps<typeof View> {
  className?: string
}

const menuItems = [
  { key: "mostViewed", label: "mais vistos" },
  { key: "nearby", label: "por perto" },
  { key: "latest", label: "últimos" },
  { key: "test1", label: "menu 4" },
  { key: "test2", label: "menu 5" },
  { key: "test3", label: "menu 6" },
]

export function HomeMenu({ className = "", ...props }: Props) {
  const [selected, setSelected] = useState("mostViewed")

  return (
    <View className={`${className}`}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={menuItems}
        className="overflow-visible"
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          const isActive = selected === item.key
          return (
            <TouchableOpacity
              onPress={() => setSelected(item.key)}
              style={{
                backgroundColor: isActive ? "#1E2336" : "transparent",
                padding: 16,
                borderRadius: 16,
                shadowOpacity: isActive ? 0.4 : 0,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 4,
              }}
            >
              <Text
                style={{
                  color: isActive ? "#FFFFFF" : "#C5C5C5",
                }}
                className="font-medium"
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )
        }}
        {...props}
      />
    </View>
  )
}

import { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { Bell, Heart, Home, Plus, UserRound } from "lucide-react-native"

interface Props extends React.ComponentProps<typeof View> {
  className?: string
}

export function BottomMenu({ className = "", ...props }: Props) {
  const [selected, setSelected] = useState<"home" | "clock" | "heart" | "user">("home")

  const menuItems = [
    { key: "home", icon: Home, isNotification: false },
    { key: "bell", icon: Bell, isNotification: true },
    { key: "plus", icon: Plus, isNotification: false },
    { key: "heart", icon: Heart, isNotification: false },
    { key: "user", icon: UserRound, isNotification: false },
  ]

  return (
    <View
      className={`${className} px-16 h-[70px] mb-2 pt-4 justify-between flex-row bg-white`}
      {...props}
    >
      {menuItems.map(({ key, icon: Icon, isNotification }) => {
        const isActive = selected === key
        return (
          <TouchableOpacity
            key={key}
            onPress={() => setSelected(key as any)}
            className="items-center gap-2 relative justify-center -mt-6"
          >
            {key === "plus" ? (
              <View className="rounded-full bg-black p-2">
                <Plus size={20} color="white" />
              </View>
            ) : (
              <Icon size={32} color={isActive ? "#2F2F2F" : "#848282"} />
            )}
            {isNotification && (
              <View className="h-[8px] w-[8px] bg-red-500 rounded-full absolute bottom-0 mb-3" />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

/* eslint-disable react-native/no-inline-styles */

import { Screen, Text } from "@/components"
import { observer } from "mobx-react-lite"
import { HomeMenu } from "@/components/Menu/HomeMenu"
import { HomeSwiper } from "@/components/Swiper/HomeSwiper"
import { TopMenu } from "@/components/Menu/TopMenu"
import { View } from "react-native"

export const HomeScreen = observer(function HomeScreen(_props) {
  return (
    <Screen>
      <TopMenu />
      <View className="justify-between items-center flex-row my-10">
        <Text className="text-[#2F2F2F] font-semibold text-2xl">anúncios populares</Text>
        <Text className="text-[#888888] font-semibold">ver todos</Text>
      </View>
      <HomeMenu />
      <HomeSwiper />
    </Screen>
  )
})

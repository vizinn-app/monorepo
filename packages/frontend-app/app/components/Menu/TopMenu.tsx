/* eslint-disable react-native/no-inline-styles */
import { Text } from "@/components"
import { observer } from "mobx-react-lite"
import { Image, TextInput, TouchableOpacity, View } from "react-native"
import { Controller, useForm } from "react-hook-form"
import adam from "@/assets/images/adam.jpeg"
import settingsIcon from "@/assets/icons/settings.png"
import { useNavigation } from "@react-navigation/native"

export const TopMenu = observer(function HomeScreen(_props) {
  const {
    control,
    formState: { errors },
  } = useForm()
  const navigation = useNavigation()

  return (
    <>
      <View className="flex flex-row justify-between gap-y-[20px]">
        <View className="gap-3">
          <Text className="text-4xl  text-[#2F2F2F] font-semibold">ei, adam! 👋</Text>
          <Text
            className="text-[18px] text-[#888888] font-medium tracking-wider
"
          >
            explore suas redondezas
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
          <Image source={adam} className="w-[65px] h-[65px] rounded-full" />
        </TouchableOpacity>
      </View>
      <View
        className={`${errors.locais ? "border-2 border-red-600/50" : "border-2 border-[#D2D2D2]"} rounded-3xl mt-10 flex-row items-center`}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`px-8 p-4 text-[#888888] placeholder:text-[18px] h-[58px] w-[75%]`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="procurar locais"
              autoCapitalize="none"
              placeholderTextColor="#888888"
            />
          )}
          name="locais"
          rules={{ required: "Este campo é obrigatório" }}
        />
        <View className="max-h-[32px] border-[#D2D2D2] h-full border-l-2" />
        <View className="text-[#888888] ps-10">
          <Image source={settingsIcon} className="h-[21px] w-[24px]" />
        </View>
      </View>
    </>
  )
})

import { Text, TextInput, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Image, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"

const logoLight = require("../../assets/images/logos/logo-light.png")
const pin = require("../../assets/images/login-pin.png")
const icon = require("../../assets/images/new-icons/brillant-icon.png")
const gradientBg = require("../../assets/images/bg-gradient.png")

export const ForgotPasswordScreen = observer(function ForgotPassword(_props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigation = useNavigation()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <View className="min-h-screen flex flex-col relative">
      <Image source={gradientBg} className="h-screen w-screen contain absolute z-0" />

      <Image
        source={logoLight}
        className="w-[133px] h-[35px] cover z-10 absolute -translate-x-1/2 left-1/2 top-40 mt-8"
      />
      <Image
        source={pin}
        className="h-[661px] w-[550px] cover absolute  -translate-x-1/2 left-1/2 right-1/2"
      />
      <View className="w-[95%] h-[350px] bg-dark mt-auto mx-auto rounded-t-[70px] relative">
        <View className="absolute left-1/2 -translate-x-1/2 rotate-6 py-3 px-7 bg-white rounded-full -mt-10 shadow">
          <Text className=" text-4xl text-dark font-black">tá esquecido né?</Text>
          <Image
            source={icon}
            className="w-[44px] h-[44px] absolute left-[35px] top-[42px] -me-2"
          />
        </View>
        <View className="flex flex-col pt-[60px] px-4 text-white gap-y-2 h-full">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${errors.email ? "border border-red-600/50" : "border border-white/10"} rounded-full  p-4 text-white/50`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="email"
                placeholderTextColor="#888888"
              />
            )}
            name="locais"
            rules={{ required: "Este campo é obrigatório" }}
          />

          <Text className="text-white max-w-[275px] block mx-auto mt-auto text-center">
            iremos enviar um email com um link para você resetar sua senha
          </Text>
          <TouchableOpacity
            className="bg-light rounded-full my-4 p-4 block mx-auto"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-dark">redefinir senha</Text>
          </TouchableOpacity>

          <View className="flex gap-2 mb-10">
            <TouchableOpacity className="" onPress={() => navigation.navigate("Login" as never)}>
              <Text className="text-white block mx-auto">
                lembrou da senha? <Text className="font-bold">login</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="" onPress={() => navigation.navigate("Register" as never)}>
              <Text className="text-white block mx-auto">
                novo por aqui? <Text className="font-bold">cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
})

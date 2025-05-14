import { TextInput, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Image, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { Text } from "@/components"

const logoDark = require("../../assets/images/logos/logo-dark.png")
const pin = require("../../assets/images/login-pin.png")
const icon = require("../../assets/images/new-icons/brillant-icon.png")
const gradientBg = require("../../assets/images/bg-linear.png")
const googleIcon = require("../../assets/images/new-icons/google.png")

export const LoginScreen = observer(function LoginScreen(_props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigation = useNavigation()

  const onSubmit = (data: any) => {
    console.log(data)
    navigation.navigate("Home" as never)
  }

  return (
    <View className="min-h-screen flex flex-col relative">
      <Image source={gradientBg} className="h-screen w-screen contain absolute z-0" />

      <Image
        source={logoDark}
        className="w-[133px] h-[35px] cover z-10 absolute -translate-x-1/2 left-1/2 top-40 mt-1"
      />
      <Image
        source={pin}
        className="h-[599px] w-[499px] cover absolute  -translate-x-1/2 left-1/2 right-1/2"
      />
      <View className="w-[95%] h-[353px] bg-dark mt-auto mx-auto rounded-t-[70px] relative shadow">
        <View className="absolute left-1/2 -translate-x-1/2 rotate-6 py-1 px-7 bg-light rounded-full -mt-8 shadow">
          <Text className=" text-[35px] text-dark font-black">já é nosso vizinn?</Text>
          <Image
            source={icon}
            className="w-[44px] h-[44px] absolute left-[35px] top-[40px] -me-2"
          />
        </View>
        <View className="flex flex-col pt-[60px] px-4 text-white gap-y-2 h-full">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${errors.email ? "border border-red-600/50" : "border border-white/10"} rounded-full  p-4 text-white/50  `}
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
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${errors.password ? "border border-red-600/50" : "border border-white/10"} rounded-full  p-4 text-white/50  `}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="senha"
                secureTextEntry
                placeholderTextColor="#888888"
              />
            )}
            name="password"
            rules={{ required: "Este campo é obrigatório" }}
          />

          <TouchableOpacity
            className="bg-light rounded-full my-2 px-4 py-2 mx-auto flex justify-center items-center min-w-[166px]"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-dark font-bold">entrar agora</Text>
          </TouchableOpacity>
          <View className="flex gap-1 mt-1">
            <Text className="text-white max-w-[275px] block mx-auto mt-auto">
              ou faça login com <Text className="font-bold">google</Text>
            </Text>
            <View className="bg-white p-1 flex items-center justify-center rounded-full mx-auto">
              <Image source={googleIcon} className="w-[35px] h-[36px] cover" />
            </View>
            <View className="flex gap-2 mb-10">
              <TouchableOpacity
                className=""
                onPress={() => navigation.navigate("ForgotPassword" as never)}
              >
                <Text className="text-white block mx-auto">
                  não lembra da senha? <Text className="font-bold">esqueci a senha</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className=""
                onPress={() => navigation.navigate("Register" as never)}
              >
                <Text className="text-white block mx-auto">
                  novo por aqui? <Text className="font-bold">cadastre-se</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
})

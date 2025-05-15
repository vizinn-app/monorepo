import { TextInput, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Image, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { Text } from "@/components"

const logoWhite = require("../../assets/images/logos/logo-light.png")
const pin = require("../../assets/images/pin.png")
const icon = require("../../assets/images/new-icons/brillant-icon.png")
const gradientBg = require("../../assets/images/bg-linear.png")

export const RegisterScreen = observer(function WelcomeScreen(_props) {
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

      <View className="py-20 px-10 relative">
        <Text className="text-white text-[36px] my-20 max-w-[250px] relative z-10 mt-[180px] font-bold">
          tem uma xícara de açúcar aí?
        </Text>
        <Image source={logoWhite} className="w-[130px] h-[35px] cover" />
        <Image source={pin} className="h-[450px] w-[453px] cover absolute ms-[125px] -mt-5 z-0" />
      </View>
      <View className="w-[95%] h-[390px] bg-dark mt-auto mx-auto rounded-t-[70px] relative shadow">
        <View className="absolute left-1/2 -translate-x-1/2 rotate-6 py-3 px-7 bg-light  rounded-full -mt-10">
          <Text className=" text-5xl text-dark font-black">novo por aqui?</Text>
          <Image source={icon} className="w-[44px] h-[44px] absolute right-0 bottom-[47px] -me-2" />
        </View>
        <View className="flex flex-col pt-[60px] px-4 text-white gap-y-2">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${errors.name ? "border border-red-600/50" : "border border-white/10"} rounded-full  p-4 text-white/50  `}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="vizinn, como posso te chamar?"
                placeholderTextColor="#888888"
              />
            )}
            name="name"
            rules={{ required: "Este campo é obrigatório" }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor="#888888"
                placeholder="agora, teu melhor email"
                className={`${errors.email ? "border border-red-600/50" : "border border-white/10"} rounded-full  p-4 text-white/50  `}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="locais"
            rules={{ required: "Este campo é obrigatório" }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                placeholderTextColor="#888888"
                placeholder="a senha, não esquece hein?"
                className={`${errors.password ? "border border-red-600/50" : "border border-white/10"} rounded-full  p-4 text-white/50  `}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            rules={{ required: "Este campo é obrigatório" }}
          />
          <View className="mt-2">
            <Text className="text-white max-w-[275px] block mx-auto">
              você concorda com os <Text className="font-bold">Termos de Uso do Aplicativo</Text> ao
              confirmar seu cadastro
            </Text>
            <TouchableOpacity
              className="bg-light rounded-full my-3 px-4 py-3 mx-auto flex justify-center items-center"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-dark font-bold">me tornar um vizinn</Text>
            </TouchableOpacity>
            <TouchableOpacity className="" onPress={() => navigation.navigate("Login" as never)}>
              <Text className="text-white block mx-auto">
                já tem uma conta? <Text className="font-bold">faça login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
})

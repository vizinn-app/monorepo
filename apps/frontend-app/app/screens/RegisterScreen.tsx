import { Text } from "@/components"
import { useRegister } from "@/hooks/useRegister"
import { UserRegistrationRequest } from "@/services/api/users/users.types"
import {
  cpfValidationRules,
  emailValidationRules,
  nameValidationRules,
  phoneValidationRules,
} from "@/utils/validationRules"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Alert, Image, TextInput, TouchableOpacity, View } from "react-native"
import { AppStackParamList } from "../navigators/AppNavigator"

const logoWhite = require("../../assets/images/logos/logo-light.png")
const pin = require("../../assets/images/pin.png")
const icon = require("../../assets/images/new-icons/brillant-icon.png")
const gradientBg = require("../../assets/images/bg-linear.png")

export const RegisterScreen = observer(function WelcomeScreen(_props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
    },
  })

  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  const { isLoading, error, registerUser } = useRegister()

  const onSubmit = async (data: any) => {
    const userData: UserRegistrationRequest = {
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      cpf: data.cpf,
    }

    console.log("Registering user:", userData)

    const success = await registerUser(userData)

    if (success) {
      Alert.alert("Sucesso!", "Seu código de verificação foi enviado ao telefone cadastrado!", [
        {
          text: "Ir para Login",
          onPress: () =>
            navigation.navigate("Login", {
              email: data.email,
              hasReceivedCode: true,
            }),
        },
      ])
    } else if (error) {
      Alert.alert("Erro no cadastro", error)
    }
  }

  return (
    <View className="min-h-screen flex flex-col relative">
      <Image source={gradientBg} className="h-screen w-screen contain absolute z-0" />

      <View className="py-[20px] px-8 relative">
        <Text className="text-white text-[34px] my-20 max-w-[250px] relative z-10 mt-[180px] font-bold">
          tem uma xícara de açúcar aí?
        </Text>
        <Image source={logoWhite} className="w-[130px] h-[35px] cover -mt-10" />
        <Image source={pin} className="h-[450px] w-[453px] cover absolute ms-[125px] -mt-5 z-0" />
      </View>
      <View className="w-[95%] h-[450px] bg-dark mt-auto mx-auto rounded-t-[70px] relative shadow">
        <View className="absolute left-1/2 -translate-x-1/2 rotate-6 py-3 px-7 bg-light  rounded-full -mt-10">
          <Text className=" text-5xl text-dark font-black">novo por aqui?</Text>
          <Image source={icon} className="w-[44px] h-[44px] absolute right-0 bottom-[47px] -me-2" />
        </View>
        <View className="flex flex-col pt-[60px] px-4 text-white gap-y-2">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${errors.name ? "border border-red-600/50" : "border border-white/10"} rounded-full p-4 text-white/50`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="vizinn, teu nome completo"
                placeholderTextColor="#888888"
              />
            )}
            name="name"
            rules={nameValidationRules}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor="#888888"
                placeholder="agora, teu melhor email"
                className={`${errors.email ? "border border-red-600/50" : "border border-white/10"} rounded-full p-4 text-white/50`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
            rules={emailValidationRules}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor="#888888"
                placeholder="CPF (apenas números)"
                className={`${errors.cpf ? "border border-red-600/50" : "border border-white/10"} rounded-full p-4 text-white/50`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                maxLength={11}
              />
            )}
            name="cpf"
            rules={cpfValidationRules}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor="#888888"
                placeholder="telefone com DDD (ex: 11987654321)"
                className={`${errors.phone ? "border border-red-600/50" : "border border-white/10"} rounded-full p-4 text-white/50`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                maxLength={11}
              />
            )}
            name="phone"
            rules={phoneValidationRules}
          />
          <View className="mt-2">
            {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}

            <TouchableOpacity
              className="bg-light rounded-full my-3 px-4 py-3 mx-auto flex justify-center items-center min-w-[200px]"
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#333333" size="small" />
              ) : (
                <Text className="text-dark font-bold">conhecer meus vizinns</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="" onPress={() => navigation.navigate("Login" as never)}>
              <Text className="text-white block mx-auto">
                já tem uma conta? <Text className="font-bold">faça login</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white max-w-[275px] block mx-auto text-center mt-6 text-xs">
            você concorda com os <Text className="font-bold">Termos de Uso do Aplicativo</Text> ao
            confirmar seu cadastro
          </Text>
        </View>
      </View>
    </View>
  )
})

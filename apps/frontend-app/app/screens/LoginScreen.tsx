/* eslint-disable import/no-unresolved */
import { Text } from "@/components"
import { emailValidationRules, verificationCodeRules } from "@/utils/validationRules"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Alert, Image, TextInput, TouchableOpacity, View } from "react-native"
import { useAuth } from "../hooks/useAuth"

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
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      verificationCode: "",
    },
  })

  const [codeSent, setCodeSent] = useState(false)
  const [showVerificationInput, setShowVerificationInput] = useState(false)

  const navigation = useNavigation()
  const { isLoading, error, requestVerificationCode, verifyCode, resendVerificationCode } =
    useAuth()

  const onSubmit = async (data: any) => {
    if (!codeSent) {
      const success = await requestVerificationCode(data.email)
      if (success) {
        setCodeSent(true)
        setShowVerificationInput(true)
        Alert.alert(
          "Código enviado",
          "Um código de verificação foi enviado para seu telefone cadastrado",
        )
      } else if (error) {
        Alert.alert("Erro", error)
      }
    } else {
      const success = await verifyCode(data.email, data.verificationCode)
      if (success) {
        navigation.navigate("Home" as never)
      } else if (error) {
        Alert.alert("Erro", error)
      }
    }
  }

  const handleResendCode = async () => {
    const email = getValues().email

    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail")
      return
    }

    const success = await resendVerificationCode(email)
    if (success) {
      Alert.alert("Código reenviado", "Um novo código de verificação foi enviado para seu telefone")
    } else if (error) {
      Alert.alert("Erro", error)
    }
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
      <View className="w-[95%] h-[303px] bg-dark mt-auto mx-auto rounded-t-[70px] relative shadow">
        <View className="absolute left-1/2 -translate-x-1/2 rotate-6 py-1 px-7 bg-light rounded-full -mt-8 shadow">
          <Text className=" text-[35px] text-dark font-black">já é nosso vizinn?</Text>
          <Image
            source={icon}
            className="w-[44px] h-[44px] absolute left-[35px] top-[40px] -me-2"
          />
        </View>
        <View className="flex flex-col pt-[70px] px-4 text-white gap-y-2 h-full">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${errors.email ? "border border-red-600/50" : "border border-white/10"} rounded-full p-4 text-white/50`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="email"
                placeholderTextColor="#888888"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
            name="email"
            rules={emailValidationRules}
          />

          {showVerificationInput && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${errors.verificationCode ? "border border-red-600/50" : "border border-white/10"} rounded-full p-4 text-white/50`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="código de verificação"
                  placeholderTextColor="#888888"
                  keyboardType="number-pad"
                />
              )}
              name="verificationCode"
              rules={verificationCodeRules}
            />
          )}

          {showVerificationInput && (
            <TouchableOpacity className="mt-1" onPress={handleResendCode} disabled={isLoading}>
              <Text className="text-light text-center text-sm">reenviar código</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="bg-light rounded-full mt-3 mb-1 px-4 py-3 mx-auto flex justify-center items-center min-w-[166px]"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#333333" size="small" />
            ) : (
              <Text className="text-dark font-bold">
                {showVerificationInput ? "verificar código" : "receber código SMS"}
              </Text>
            )}
          </TouchableOpacity>

          {error && <Text className="text-red-500 text-center">{error}</Text>}

          <View className="flex gap-1 mt-1">
            <View className="flex gap-2 mb-2">
              <TouchableOpacity
                className=""
                onPress={() => navigation.navigate("Register" as never)}
              >
                <Text className="text-white block mx-auto">
                  novo por aqui? <Text className="font-bold">cadastre-se</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-white max-w-[275px] block mx-auto mt-auto">
              ou faça login com <Text className="font-bold">google</Text>
            </Text>
            <View className="bg-white p-1 flex items-center justify-center rounded-full mx-auto">
              <Image source={googleIcon} className="w-[35px] h-[36px] cover" />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
})

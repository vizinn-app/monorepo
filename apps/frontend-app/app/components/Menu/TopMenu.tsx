/* eslint-disable react-native/no-inline-styles */
import settingsIcon from "@/assets/icons/settings.png"
import adam from "@/assets/images/adam.jpeg"
import { Text } from "@/components"
import { searchValidationRules } from "@/utils/validationRules"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Controller, useForm } from "react-hook-form"
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import { useState } from "react"

export const TopMenu = observer(function HomeScreen(_props) {
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      locais: "",
    },
  })
  const _navigation = useNavigation() // Using underscore prefix to avoid unused var warning
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleTakePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status !== 'granted') {
      alert('Precisamos da permissão para acessar sua câmera.')
      return
    }

    try {
      setIsUploading(true)

      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Update the profile image state
        setProfileImage(result.assets[0].uri)

        // Here you would typically upload the image to your server
        console.log("Camera image URI:", result.assets[0].uri)
      }
    } catch (error) {
      console.error(error)
      alert('Não foi possível tirar a foto.')
    } finally {
      setIsUploading(false)
    }
  }

  const handlePickImage = async () => {
    // Request permissions first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      alert('Precisamos da permissão para acessar sua galeria de fotos.')
      return
    }

    try {
      setIsUploading(true)

      // Launch the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Update the profile image state
        setProfileImage(result.assets[0].uri)

        // Here you would typically upload the image to your server
        console.log("Gallery image URI:", result.assets[0].uri)
      }
    } catch (error) {
      console.error(error)
      alert('Não foi possível selecionar a imagem.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleShowOptions = () => {
    if (isUploading) return

    // Use the Alert API to show options
    Alert.alert(
      'Foto de Perfil',
      'Escolha uma opção',
      [
        {
          text: 'Tirar Foto',
          onPress: handleTakePhoto,
        },
        {
          text: 'Escolher da Galeria',
          onPress: handlePickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        }
      ]
    )
  }

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
        <TouchableOpacity onPress={handleShowOptions} disabled={isUploading}>
          <View className="relative">
            <Image
              source={profileImage ? { uri: profileImage } : adam}
              className="w-[65px] h-[65px] rounded-full"
            />
            {isUploading && (
              <View className="absolute inset-0 items-center justify-center bg-black/30 rounded-full">
                <Text className="text-white">...</Text>
              </View>
            )}
            <View className="absolute bottom-0 right-0 bg-[#2F2F2F] rounded-full w-[20px] h-[20px] items-center justify-center">
              <Text className="text-white text-[12px]">+</Text>
            </View>
          </View>
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
          rules={searchValidationRules}
        />
        <View className="max-h-[32px] border-[#D2D2D2] h-full border-l-2" />
        <View className="text-[#888888] ps-10">
          <Image source={settingsIcon} className="h-[21px] w-[24px]" />
        </View>
      </View>
    </>
  )
})

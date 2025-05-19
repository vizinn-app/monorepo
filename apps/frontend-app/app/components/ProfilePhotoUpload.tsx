// import React, { useState } from "react"
// import { ActivityIndicator, Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native"
// import * as ImagePicker from 'expo-image-picker'
// import { Text } from "./Text"

// interface ProfilePhotoUploadProps {
//   defaultImage: any // Source for the default image
//   size?: number // Size of the image container
//   onImageSelected?: (imageUri: string) => void
//   borderRadius?: number
//   showAddIcon?: boolean
// }

// export function ProfilePhotoUpload({
//   defaultImage,
//   size = 65,
//   onImageSelected,
//   borderRadius = size / 2, // Default to circular
//   showAddIcon = true,
// }: ProfilePhotoUploadProps) {
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const [isUploading, setIsUploading] = useState(false)

//   const handlePickImage = async () => {
//     // Request permissions first
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

//     if (status !== 'granted') {
//       Alert.alert('Permissão negada', 'Precisamos da permissão para acessar sua galeria de fotos.')
//       return
//     }

//     try {
//       setIsUploading(true)

//       // Launch the image library
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.7,
//       })

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         // Update the profile image state
//         const selectedImageUri = result.assets[0].uri
//         setProfileImage(selectedImageUri)

//         // Call the callback if provided
//         if (onImageSelected) {
//           onImageSelected(selectedImageUri)
//         }
//       }
//     } catch (error) {
//       Alert.alert('Erro', 'Não foi possível selecionar a imagem.')
//       console.error(error)
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleOpenOptions = () => {
//     Alert.alert(
//       'Foto de Perfil',
//       'Escolha uma opção',
//       [
//         {
//           text: 'Tirar Foto',
//           onPress: handleTakePhoto,
//         },
//         {
//           text: 'Escolher da Galeria',
//           onPress: handlePickImage,
//         },
//         {
//           text: 'Cancelar',
//           style: 'cancel',
//         },
//       ],
//       { cancelable: true }
//     )
//   }

//   const handleTakePhoto = async () => {
//     // Request camera permissions
//     const { status } = await ImagePicker.requestCameraPermissionsAsync()

//     if (status !== 'granted') {
//       Alert.alert('Permissão negada', 'Precisamos da permissão para acessar sua câmera.')
//       return
//     }

//     try {
//       setIsUploading(true)

//       // Launch the camera
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.7,
//       })

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         // Update the profile image state
//         const selectedImageUri = result.assets[0].uri
//         setProfileImage(selectedImageUri)

//         // Call the callback if provided
//         if (onImageSelected) {
//           onImageSelected(selectedImageUri)
//         }
//       }
//     } catch (error) {
//       Alert.alert('Erro', 'Não foi possível tirar a foto.')
//       console.error(error)
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <TouchableOpacity onPress={handleOpenOptions} disabled={isUploading}>
//       <View style={{ position: 'relative', width: size, height: size }}>
//         <Image
//           source={profileImage ? { uri: profileImage } : defaultImage}
//           style={{
//             width: size,
//             height: size,
//             borderRadius: borderRadius
//           }}
//         />
//         {isUploading && (
//           <View
//             style={{
//               position: 'absolute',
//               width: size,
//               height: size,
//               borderRadius: borderRadius,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'rgba(0, 0, 0, 0.3)'
//             }}
//           >
//             <ActivityIndicator size="small" color="#FFFFFF" />
//           </View>
//         )}
//         {showAddIcon && (
//           <View style={[
//             styles.addIconContainer,
//             {
//               width: size * 0.3,
//               height: size * 0.3,
//               borderRadius: size * 0.15,
//             }
//           ]}>
//             <Text style={styles.addIconText}>+</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   addIconContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#2F2F2F',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1,
//   },
//   addIconText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   }
// })

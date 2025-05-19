// import AsyncStorage from "@react-native-async-storage/async-storage"

// /**
//  * A utility function to save the user's profile photo URI
//  * In a real application, this would upload the image to a server
//  * but for demo purposes, we're storing it locally
//  */
// export const saveProfilePhoto = async (imageUri: string): Promise<boolean> => {
//   try {
//     await AsyncStorage.setItem("USER_PROFILE_PHOTO", imageUri)
//     return true
//   } catch (error) {
//     console.error("Failed to save profile photo", error)
//     return false
//   }
// }

// /**
//  * Retrieves the user's profile photo URI from storage
//  */
// export const getProfilePhoto = async (): Promise<string | null> => {
//   try {
//     return await AsyncStorage.getItem("USER_PROFILE_PHOTO")
//   } catch (error) {
//     console.error("Failed to get profile photo", error)
//     return null
//   }
// }

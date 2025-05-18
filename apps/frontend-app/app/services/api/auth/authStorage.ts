import AsyncStorage from "@react-native-async-storage/async-storage"

// Keys for storage
const AUTH_TOKEN_KEY = "auth_token"

/**
 * Saves the authentication token to storage
 */
export const saveToken = async (token: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
    return true
  } catch (e) {
    console.error("Failed to save auth token to storage", e)
    return false
  }
}

/**
 * Retrieves the authentication token from storage
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY)
  } catch (e) {
    console.error("Failed to get auth token from storage", e)
    return null
  }
}

/**
 * Removes the authentication token from storage
 */
export const removeToken = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
    return true
  } catch (e) {
    console.error("Failed to remove auth token from storage", e)
    return false
  }
}

/**
 * Checks if a user is authenticated by seeing if a token exists
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken()
  return token !== null
}

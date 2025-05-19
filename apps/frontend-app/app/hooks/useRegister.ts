import { useCallback, useState } from "react"
import { usersApi, UsersAPI } from "../services/api/users/users"
import { UserRegistrationRequest } from "../services/api/users/users.types"
import { mapErrorToMessage } from "./useAuth"

/**
 * A hook for managing user registration
 */
export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Register a new user
   */
  const registerUser = useCallback(async (userData: UserRegistrationRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Sending register request to:", `/users/`)
      console.log("Using API URL:", usersApi.config.url)

      // Primeira tentativa com timeout normal
      let result = await usersApi.register(userData)

      // Se ocorrer um timeout, tenta novamente com um timeout maior
      if (result.kind === "timeout") {
        console.log("First attempt timed out, trying again with extended timeout...")

        // Cria uma nova instância da API com timeout maior para essa tentativa específica
        const extendedTimeoutApi = new UsersAPI({
          ...usersApi.config,
          timeout: 60000, // 60 segundos
        })

        result = await extendedTimeoutApi.register(userData)
      }

      if (result.kind !== "ok") {
        setError(mapErrorToMessage(result.kind))
        console.error("Register request failed with error kind:", result.kind)
        return false
      }

      console.log("Register request successful")
      return true
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e)
      setError("An unexpected error occurred")
      console.error("Register request failed with exception:", errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    registerUser,
  }
}

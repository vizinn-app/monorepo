import { useCallback, useState } from "react"
import Config from "../config"
import { LoginRequest, VerifyCodeRequest } from "../services/api/auth/auth.types"
import { getToken, removeToken, saveToken } from "../services/api/auth/authStorage"
import { authApi } from "./../services/api/auth/auth"

/**
 * A hook for using authentication services in React components
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Start the login process by requesting a verification code
   */
  const requestVerificationCode = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const loginData: LoginRequest = { email }
      console.log("Sending login request to:", `${Config.API_URL}/auth/login/`)
      const result = await authApi.login(loginData)

      if (result.kind !== "ok") {
        setError(mapErrorToMessage(result.kind))
        console.error("Login request failed with error kind:", result.kind)
        return false
      }

      console.log("Login request successful")
      return true
    } catch (e) {
      setError("An unexpected error occurred")
      console.error(e)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Verify the code sent to the user's phone
   */
  const verifyCode = useCallback(async (email: string, code: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const verifyData: VerifyCodeRequest = {
        email,
        verification_code: code,
      }
      console.log("Sending verify code request to:", `${Config.API_URL}/auth/verify-code/`)
      const result = await authApi.verifyCode(verifyData)

      if (result.kind !== "ok") {
        setError(mapErrorToMessage(result.kind))
        console.error("Verify code request failed with error kind:", result.kind)
        return false
      }

      console.log("Verify code request successful")
      // Save the token
      await saveToken(result.token)
      return true
    } catch (e) {
      setError("An unexpected error occurred")
      console.error(e)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Resend verification code
   */
  const resendVerificationCode = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const loginData: LoginRequest = { email }
      console.log("Sending resend code request to:", `${Config.API_URL}/auth/resend-code/`)
      const result = await authApi.resendCode(loginData)

      if (result.kind !== "ok") {
        setError(mapErrorToMessage(result.kind))
        console.error("Resend code request failed with error kind:", result.kind)
        return false
      }

      console.log("Resend code request successful")
      return true
    } catch (e) {
      setError("An unexpected error occurred")
      console.error("Resend code request failed with exception:", e)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Check if user is authenticated
   */
  const checkAuthentication = useCallback(async () => {
    const token = await getToken()

    if (token) {
      // Set the token in the API client for subsequent requests
      authApi.setAuthToken(token)
      return true
    }

    return false
  }, [])

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    await removeToken()
    authApi.clearAuthToken()
    return true
  }, [])

  return {
    isLoading,
    error,
    requestVerificationCode,
    verifyCode,
    resendVerificationCode,
    checkAuthentication,
    logout,
  }
}

/**
 * Maps API error types to user-friendly messages
 */
export function mapErrorToMessage(errorKind: string): string {
  switch (errorKind) {
    case "unauthorized":
      return "Credenciais inválidas"
    case "forbidden":
      return "Você não tem permissão para realizar esta ação"
    case "not-found":
      return "Recurso não encontrado"
    case "rejected":
      return "Requisição foi rejeitada"
    case "server":
      return "Erro no servidor, por favor tente novamente mais tarde"
    case "timeout":
      return "A operação demorou muito tempo. Isso pode acontecer durante o registro devido ao envio de SMS. Por favor, tente novamente e verifique se você está conectado a uma rede estável."
    case "cannot-connect":
      return "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente."
    case "bad-data":
      return "Dados inválidos recebidos do servidor"
    default:
      return "Ocorreu um erro desconhecido"
  }
}

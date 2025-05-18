import { authApi } from './../services/api/auth/auth';
import { useCallback, useState } from "react"
import { getToken, removeToken, saveToken } from "../services/api/auth/authStorage"
import { LoginRequest, VerifyCodeRequest } from "../services/api/auth/auth.types"

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
      const result = await authApi.login(loginData)

      if (result.kind !== "ok") {
        setError(mapErrorToMessage(result.kind))
        return false
      }

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
      const result = await authApi.verifyCode(verifyData)

      if (result.kind !== "ok") {
        setError(mapErrorToMessage(result.kind))
        return false
      }

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
      const result = await authApi.resendCode(loginData)

      if (result.kind !== "ok") {
        setError(mapErrorToMessage(result.kind))
        return false
      }

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
function mapErrorToMessage(errorKind: string): string {
  switch (errorKind) {
    case "unauthorized":
      return "Invalid credentials"
    case "forbidden":
      return "You don't have permission to perform this action"
    case "not-found":
      return "Resource not found"
    case "rejected":
      return "Request was rejected"
    case "server":
      return "Server error, please try again later"
    case "timeout":
      return "Request timed out, please check your connection"
    case "cannot-connect":
      return "Cannot connect to server, please check your connection"
    case "bad-data":
      return "Invalid data received from server"
    default:
      return "An unknown error occurred"
  }
}

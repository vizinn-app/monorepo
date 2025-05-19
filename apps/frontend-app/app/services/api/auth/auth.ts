/**
 * This Auth module handles all authentication-related API requests
 * to the backend.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem"
import {
  AuthApiConfig,
  LoginRequest,
  MessageResponse,
  TokenResponse,
  VerifyCodeRequest,
} from "./auth.types"

/**
 * Default configuration for the auth API
 */
export const DEFAULT_AUTH_API_CONFIG: AuthApiConfig = {
  url: Config.API_URL,
  timeout: 30000,
}

/**
 * Manages authentication-related requests to the backend API
 */
export class AuthAPI {
  apisauce: ApisauceInstance
  config: AuthApiConfig

  /**
   * Set up the auth API instance
   */
  constructor(config: AuthApiConfig = DEFAULT_AUTH_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  /**
   * Set the auth token for subsequent requests
   */
  setAuthToken(token: string) {
    this.apisauce.setHeader("Authorization", `Bearer ${token}`)
  }

  /**
   * Clear the auth token
   */
  clearAuthToken() {
    this.apisauce.deleteHeader("Authorization")
  }

  /**
   * Initiates the login process by sending the verification code
   */
  async login(data: LoginRequest): Promise<{ kind: "ok"; message: string } | GeneralApiProblem> {
    // Make the API call
    const response: ApiResponse<MessageResponse> = await this.apisauce.post("/auth/login/", data)

    // Handle API errors
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (__DEV__) {
        console.error("API Error (login):", response.problem, response.status, response.data)
      }
      if (problem) return problem
    }

    // Return the success message
    try {
      const message = response.data?.message ?? "Verification code sent"
      return { kind: "ok", message }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad login response: ${e.message}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Verifies the code sent to the user
   */
  async verifyCode(
    data: VerifyCodeRequest,
  ): Promise<{ kind: "ok"; token: string } | GeneralApiProblem> {
    // Make the API call
    const response: ApiResponse<TokenResponse> = await this.apisauce.post(
      "/auth/verify-code/",
      data,
    )

    // Handle API errors
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (__DEV__) {
        console.error("API Error (verify code):", response.problem, response.status, response.data)
      }
      if (problem) return problem
    }

    // Process the token response
    try {
      const token = response.data?.access_token
      if (!token) {
        return { kind: "bad-data" }
      }

      // Set the token for future authenticated requests
      this.setAuthToken(token)

      return { kind: "ok", token }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad token response: ${e.message}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Resend verification code
   */
  async resendCode(
    data: LoginRequest,
  ): Promise<{ kind: "ok"; message: string } | GeneralApiProblem> {
    // Make the API call
    const response: ApiResponse<MessageResponse> = await this.apisauce.post(
      "/auth/resend-code/",
      data,
    )

    // Handle API errors
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (__DEV__) {
        console.error("API Error (resend code):", response.problem, response.status, response.data)
      }
      if (problem) return problem
    }

    // Return the success message
    try {
      const message = response.data?.message ?? "Code resent successfully"
      return { kind: "ok", message }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad resend response: ${e.message}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the AuthAPI for convenience
export const authApi = new AuthAPI()

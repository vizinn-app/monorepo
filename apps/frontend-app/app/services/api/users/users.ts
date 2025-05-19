/**
 * This UsersAPI class handles all user-related API requests
 * to the backend server.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../../config"
import { getGeneralApiProblem } from "../apiProblem"
import {
  CreateUserResult,
  UserApiConfig,
  UserRegistrationRequest,
  UserResponse,
} from "./users.types"

/**
 * Default configuration for the users API
 */
export const DEFAULT_USERS_API_CONFIG: UserApiConfig = {
  url: Config.API_URL,
  timeout: 30000,
}

/**
 * Manages user-related requests to the backend API
 */
export class UsersAPI {
  apisauce: ApisauceInstance
  config: UserApiConfig

  /**
   * Set up the users API instance
   */
  constructor(config: UserApiConfig = DEFAULT_USERS_API_CONFIG) {
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
  } /**
   * Register a new user
   */
  async register(data: UserRegistrationRequest): Promise<CreateUserResult> {
    // Log request details for debugging
    if (__DEV__) {
      console.log("Register request with URL:", `${this.config.url}/users/`)
      console.log("Register request data:", data)
    }

    // Make the API call
    const response: ApiResponse<UserResponse> = await this.apisauce.post("/users/", data)

    // Handle API errors
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (__DEV__) {
        console.error("API Error (register):", response.problem, response.status, response.data)
      }
      if (problem) return problem
    }

    // Process the user response
    try {
      const user = response.data
      if (!user) {
        return { kind: "bad-data" }
      }

      return { kind: "ok", user }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad register response: ${e.message}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the UsersAPI for convenience
export const usersApi = new UsersAPI()

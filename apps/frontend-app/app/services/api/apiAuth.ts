import { ApisauceInstance } from "apisauce"
import { getToken } from "./auth/authStorage"

/**
 * Adds the authentication token to API requests
 * @param api The API instance to which the auth token will be added
 */
export const addAuthTokenToApi = async (api: ApisauceInstance): Promise<void> => {
  const token = await getToken()

  if (token) {
    api.setHeader("Authorization", `Bearer ${token}`)
  }
}

/**
 * Creates an API request interceptor to automatically add authentication headers
 * @param api The API instance to add the interceptor to
 */
export const setupAuthInterceptor = (api: ApisauceInstance): void => {
  api.addRequestTransform(async (request) => {
    const token = await getToken()

    if (token) {
      if (!request.headers) {
        request.headers = {}
      }
      request.headers["Authorization"] = `Bearer ${token}`
    }
  })
}

/**
 * Class to handle API endpoints that require authentication
 */
export class AuthenticatedApi {
  api: ApisauceInstance

  constructor(api: ApisauceInstance) {
    this.api = api
    setupAuthInterceptor(this.api)
  }

  /**
   * Example of an authenticated endpoint
   * You can add more methods following this pattern for other endpoints
   */
  async getProtectedResource(): Promise<any> {
    const response = await this.api.get("/protected-endpoint")
    return response.data
  }
}

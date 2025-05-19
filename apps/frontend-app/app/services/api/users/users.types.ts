import { GeneralApiProblem } from "../apiProblem"

/**
 * Types for the Users API
 */

export interface UserApiConfig {
  url: string
  timeout: number
}

/**
 * User registration request model
 */
export interface UserRegistrationRequest {
  full_name: string
  cpf: string
  phone: string
  email: string
}

/**
 * User response model from the API
 */
export interface UserResponse {
  id: number
  full_name: string
  cpf: string
  phone: string
  email: string
}

/**
 * GET /users response
 */
export interface UserListResult {
  kind: "ok"
  users: UserResponse[]
}

/**
 * Result from registering a new user
 */
export type CreateUserResult = { kind: "ok"; user: UserResponse } | GeneralApiProblem

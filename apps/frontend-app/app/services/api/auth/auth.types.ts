/**
 * Authentication API types
 */

export interface LoginRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  verification_code: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface MessageResponse {
  message: string;
}

export interface AuthApiConfig {
  url: string;
  timeout: number;
}

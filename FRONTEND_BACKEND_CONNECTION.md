# Frontend-Backend Connection

This document explains how the Vizinn frontend app connects to the backend API.

## Configuration

### Development Environment
- The frontend uses `http://localhost:8000` as the API URL in development
- Connection configuration is in `apps/frontend-app/app/config/config.dev.ts`

### Production Environment
- The frontend uses `https://api.vizinn.com.br` as the API URL in production
- Connection configuration is in `apps/frontend-app/app/config/config.prod.ts`

## API Endpoints

### Authentication

The frontend uses the following authentication endpoints:

- **Login/Request Verification Code**: `POST /auth/login`
  - Request: `{ email: string }`
  - Response: `{ message: string }`

- **Verify Code**: `POST /auth/verify-code`
  - Request: `{ email: string, verification_code: string }`
  - Response: `{ access_token: string, token_type: string }`

- **Resend Verification Code**: `POST /auth/resend-code`
  - Request: `{ email: string }`
  - Response: `{ message: string }`

## Authentication Flow

1. User enters email on login screen
2. Frontend calls `/auth/login` with email
3. Backend sends verification code to user's phone
4. User enters verification code
5. Frontend calls `/auth/verify-code` with email and code
6. Backend validates code and returns JWT token
7. Frontend stores token for authenticated requests

## Troubleshooting

If you encounter connection issues:

1. Ensure the backend server is running on port 8000
2. Check network connectivity between devices
3. Verify the API URL configuration matches the backend server address
4. Use the test-connection.sh script to diagnose API availability
5. Check browser console or React Native logs for detailed error messages

## CORS Configuration

The backend has CORS configured to accept requests from the frontend application. In production, the allowed origins should be restricted to specific domains.

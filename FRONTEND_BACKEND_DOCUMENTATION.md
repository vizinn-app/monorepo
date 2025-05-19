# Frontend-Backend Connection and Problem Resolution

This document describes how the Vizinn frontend application connects to the backend API and details the corrections applied to resolve connectivity issues.

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

- **Login/Request Verification Code**: `POST /auth/login/`
  - Request: `{ email: string }`
  - Response: `{ message: string }`

- **Verify Code**: `POST /auth/verify-code/`
  - Request: `{ email: string, verification_code: string }`
  - Response: `{ access_token: string, token_type: string }`

- **Resend Verification Code**: `POST /auth/resend-code/`
  - Request: `{ email: string }`
  - Response: `{ message: string }`

## Authentication Flow

1. User enters email on login screen
2. Frontend calls `/auth/login/` with email
3. Backend sends verification code to user's phone
4. User enters verification code
5. Frontend calls `/auth/verify-code/` with email and code
6. Backend validates code and returns JWT token
7. Frontend stores token for authenticated requests

## Issues Identified and Resolved

1. **PostgreSQL Database Connection**
   - Replaced problematic remote connection with a local connection
   - Configured connection string: `postgresql://localhost/vizinn`
   - Created database tables using SQLAlchemy

2. **API Endpoint Corrections**
   - Added trailing slashes to all endpoints for consistency with FastAPI
   - Corrected endpoints:
     - `/auth/login/`
     - `/auth/verify-code/`
     - `/auth/resend-code/`
     - `/users/`

3. **CORS Configuration**
   - Confirmed that CORS headers are being sent correctly
   - Verified that preflight OPTIONS requests are responding properly

4. **auth.ts File Correction**
   - Restored the correct version of the file after corruption
   - Verified that all methods have complete implementations

5. **Error Handling Improvements**
   - Implemented more user-friendly error messages for timeout situations
   - Implemented retry mechanism for timeouts during registration

## Configuration for Different Environments

1. **For Android emulator development:**
   ```typescript
   API_URL: "http://10.0.2.2:8000"
   ```

2. **For iOS simulator development:**
   ```typescript
   API_URL: "http://localhost:8000"
   ```

3. **For physical device testing:**
   ```typescript
   API_URL: "http://192.168.0.3:8000"  // Replace with your machine's IP on the network
   ```

## Troubleshooting

If you encounter connection issues:

1. Verify that the backend server is running on port 8000
2. Check network connectivity between devices
3. Confirm that the API URL configuration matches the backend server address
4. Use the `test-connection.sh` script to diagnose API availability
5. Check the browser console or React Native logs for detailed error messages

### Special Note on Timeouts

If you encounter timeout errors, especially during user registration:

1. The default API timeout has been increased from 10 seconds to 30 seconds
2. The registration process involves sending an SMS which can take time
3. The `useRegister` hook now attempts a second try with a longer timeout of 60 seconds
4. Use a stable internet connection when testing registration

## Team Recommendations

1. **Always use trailing slashes in FastAPI endpoints**
   - FastAPI automatically redirects endpoints without trailing slashes to versions with slashes, causing 307 redirects.

2. **Local PostgreSQL**
   - Make sure PostgreSQL is running before starting the backend
   - Check that the `vizinn` database exists before starting the server

## CORS Configuration

The backend has CORS configured to accept requests from the frontend application. In production, the allowed origins should be restricted to specific domains.

## Next Steps

1. **Complete Testing**
   - Test the full registration, verification, and login flow
   - Verify that error messages are displayed correctly in case of failure

2. **Production Deployment**
   - Update database configurations for the production environment
   - Configure Twilio for real SMS sending in production

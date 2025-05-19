# Vizinn Frontend Application

This is the mobile application for Vizinn, built with React Native and Expo following the Ignite boilerplate.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run start
```

To run the app on your local simulator or physical device:

```bash
# Build for iOS simulator
npm run build:ios:sim

# Build for iOS device (development)
npm run build:ios:dev

# Build for iOS device (production)
npm run build:ios:prod

# Build for Android
npm run build:android
```

### Connection with Backend

For this application to work properly, it needs to connect to the Vizinn backend API. The connection details are configured in:

- `app/config/config.dev.ts` - Development environment
- `app/config/config.prod.ts` - Production environment

For more details about the frontend-backend connection, see the [FRONTEND_BACKEND_DOCUMENTATION.md](../../FRONTEND_BACKEND_DOCUMENTATION.md) in the root of the project.

### Configuration for Different Environments

When testing on different devices:

1. **Android Emulator**: Use `API_URL: "http://10.0.2.2:8000"`
2. **iOS Simulator**: Use `API_URL: "http://localhost:8000"`
3. **Physical Device**: Use your local IP, e.g., `API_URL: "http://192.168.0.3:8000"`

### `./assets` directory

### Assets Directory

This directory organizes all application assets:

```tree
assets
├── icons
└── images
```

**Icons**: For UI elements like buttons and navigation.
**Images**: For background images, logos, and other graphics.

### Authentication Flow

The application implements a verification code-based authentication system:

1. User enters their email
2. System sends a verification code to the user's phone
3. User enters the code to authenticate
4. JWT token is stored for subsequent authenticated requests

### Timeout Handling

For registration and authentication processes that might take longer due to SMS sending:
- Default timeout: 30 seconds
- Extended timeout for retries: 60 seconds

## Running Maestro end-to-end tests

Follow our [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe.

## Testing

### Manual Testing

To verify connectivity with the backend:
```bash
cd ../
./test-connection.sh
```

This script will check all API endpoints and CORS configuration.

## Troubleshooting

If you encounter connection issues:

1. Verify the backend server is running
2. Check network connectivity
3. Ensure API URL configuration matches your environment
4. Check for CORS issues using the `test-connection.sh` script

## Recent Updates (May 18, 2025)

- Fixed frontend-backend connectivity issues
- Resolved CORS configuration problems
- Fixed endpoint URL formats (added trailing slashes)
- Increased API timeout for registration process
- Implemented retry mechanism for API timeouts
- Added detailed error messages

## Next Steps

### Ignite Cookbook

[Ignite Cookbook](https://ignitecookbook.com/) is an easy way for developers to browse and share code snippets (or “recipes”) that actually work.

### Upgrade Ignite boilerplate

Read our [Upgrade Guide](https://ignitecookbook.com/docs/recipes/UpdatingIgnite) to learn how to upgrade your Ignite project.

## Community

⭐️ Help us out by [starring on GitHub](https://github.com/infinitered/ignite), filing bug reports in [issues](https://github.com/infinitered/ignite/issues) or [ask questions](https://github.com/infinitered/ignite/discussions).

💬 Join us on [Slack](https://join.slack.com/t/infiniteredcommunity/shared_invite/zt-1f137np4h-zPTq_CbaRFUOR_glUFs2UA) to discuss.

📰 Make our Editor-in-chief happy by [reading the React Native Newsletter](https://reactnativenewsletter.com/).

# Vizinn Monorepo

# Vizinn – Hyperlocal marketplace for condominiums and nearby regions

## 🏡 About the Project

**Vizinn** is an innovative platform that connects condominium residents and users in specific regions for buying, selling, and offering services in a practical and secure way. Our goal is to strengthen the local economy and create a reliable environment for transactions between neighbors and nearby communities.

## 🚀 Initial Focus

- Users can define their area of interest, allowing transactions within their condominium or in strategic locations such as universities, shopping centers, and specific neighborhoods.

## 📌 Main Features

- ✅ **Exclusive Marketplace** – Only verified residents or users in nearby regions can post listings and make purchases.
- 🌟 **Featured Listings** – Users can pay to highlight their listings and increase visibility.
- 📍 **Smart Location Filters** – Search for products and services within your condominium or specific areas.
- 🔄 **Exchange and Donation Area** – Encouraging circular economy within communities.
- 🏢 **Building Manager Panel** – Announcements, condominium rules, and event organization.
- ⭐ **Ratings and Reputation** – Feedback system to increase trust between users.
- 🔒 **Security and Moderation** – Reporting inappropriate listings and identity validation.
- 💳 **Integrated Payment Option** – Facilitating secure transactions within the app.
- 📢 **Specific Requests** – Users can publish specific demands, such as "I want lunch at UFRN."

## 📌 MVP Essential Features

### ✅ 1. Registration and Login
🔹 **Objective:** Ensure that only residents or users in the region have access to the platform.

📌 **Features:**
- Registration via email and password or login with Google/Facebook.
- Validation via SMS/email code to ensure identity.
- Residence confirmation via condominium code (optional).
- Basic user profile (name, photo, location).

🔧 **Suggested technologies:** Firebase Authentication, OAuth, Twilio (SMS).

### ✅ 2. Hyperlocal Marketplace
🔹 **Objective:** Allow residents to buy and sell products/services among themselves.

📌 **Features:**
- Create listings with title, description, price, and photos.
- Category selection (e.g., Electronics, Services, Furniture).
- Feed of listings organized by location and category.
- Option to mark an item as "Sold."

🔧 **Suggested technologies:** Firestore, PostgreSQL/MongoDB, Cloudinary.

### ✅ 3. Smart Location Filters
🔹 **Objective:** Allow users to find products and services near them.

📌 **Features:**
- Manual definition of the area of interest.
- Distance filtering (e.g., up to 2km, up to 5km).
- Search only within the user's condominium.

🔧 **Suggested technologies:** Google Maps API, GeoFire.

### ✅ 4. Internal Chat between Users
🔹 **Objective:** Facilitate communication between buyers and sellers directly in the app.

📌 **Features:**
- Private messages between users.
- Push notifications for new messages.
- Read/unread message indication.

🔧 **Suggested technologies:** Firestore (real-time), Firebase Cloud Messaging.

### ✅ 5. Moderation and Security
🔹 **Objective:** Create a safe and reliable environment for users.

📌 **Features:**
- **Reporting System:** Report suspicious listings or users.
- **Basic Rules:** Terms of use visible and accepted during registration.
- **User Blocking:** Active moderation.

🔧 **Suggested technologies:** Firebase Moderation, manual moderation.

## 📢 Subscription Plan in MVP

### ✅ 1. Subscription Model

#### **Free User:**
- Can post up to **3 simultaneous listings**.
- Each listing can contain a maximum of **2 images**.
- Normal access to marketplace and chat.

#### **Premium User (Paid):**
- **Unlimited listings**.
- Can add **more than 2 images** per listing.
- Ability to **highlight listings for free** (X times per month).
- **Priority support** and future exclusive features.

### ✅ 2. Subscription Implementation

📌 **Features:**
- Subscription screen with benefit details.
- Integrated payment system (**Stripe, Mercado Pago, or App Store/Google Play**).
- Plan control in the user's profile.
- Alert when the free user reaches the limit of listings or images.

🔧 **Suggested technologies:**
- **Stripe / Mercado Pago** (recurring payments).
- **Firebase Firestore** for subscription status.
- **Cloud Functions** for permission control.

### ✅ 3. User Experience
- **When trying to create a 4th listing**, a pop-up offers the premium upgrade.
- **When trying to add more than 2 images**, a message alerts about the limitation.
- **"My Listings" page** showing the count of active listings.

## 🛠 Technologies Used

### **Front-End (TypeScript)**
- ⚛ **React Native** – Framework for building native mobile apps.
- 🚀 **Ignite** – Boilerplate for accelerated development.
- 🎨 **NativeWind (TailwindCSS)** – Efficient and optimized styling for React Native.
- 🔗 **Axios** – Efficient HTTP requests.
- 📲 **React Navigation** – Flexible navigation system.

### **Back-End (Python)**
- ⚡ **FastAPI** – Modern and high-performance framework for APIs.
- 🗄 **Prisma** – ORM for SQL databases.
- 🔐 **JWT** – Secure authentication.
- 🏦 **PostgreSQL** – Scalable and reliable database.

### **Other Technologies**
- 🔔 WebSockets for real-time updates.
- 🚀 CI/CD for automated deployment.

## 👾  Discord

If you wish to support this initiative or be part of the project, contact us:

🔗  **[Link](https://discord.gg/GkfDbTY6xu)**

## Monorepo Structure

This monorepo contains the following packages:

- `frontend-app`: React Native/Expo application
- `backend`: Python API with FastAPI
- `packages/`: Folder containing shared libraries
  - `shared-ui`: UI utilities shared between frontend projects

## 🚀 Contributing

We welcome contributions to the Vizinn project! Follow these steps to contribute:

1. **Fork the repository** to your own GitHub account
2. **Choose an issue to work on** from our issues list or create a new one
3. **Create a branch** for your feature or bug fix
4. **Make your changes** and commit them with clear, descriptive messages
5. **Open a pull request** to this repository
6. Once your PR is accepted, you will be given the "contributor" title on our Discord server!

## Requirements

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Python >= 3.13
- Poetry (for managing backend dependencies)

## Installation

```bash
# Install monorepo dependencies
pnpm install

# Install backend dependencies (Python)
cd backend
poetry install
```

## Available Commands

### Development

```bash
# Start React Native app
pnpm dev:app



# Start backend API
pnpm dev:backend

# Start all services (except backend which requires Poetry)
pnpm dev
```

### Build

```bash
# Build React Native app
pnpm build:app


```

### Linting and Testing

```bash
# Lint React Native app
pnpm lint:app

# Test React Native app
pnpm test:app
```

## Adding New Dependencies

To add dependencies to a specific package:

```bash
# For the React Native app
pnpm --filter frontend-app add <package-name>
```

To add development dependencies:

```bash
pnpm --filter <package-name> add -D <dependency-name>
```

## Using Shared Packages

To use shared packages in a frontend project:

```bash
# Add shared-ui package to frontend-app
pnpm --filter frontend-app add "shared-ui@workspace:*"
```

## Creating New Shared Packages

Use the available script to easily create new shared packages:

```bash
./create-shared-package.sh package-name "Package description"
```

## Managing the Backend

The backend uses Poetry for Python dependency management:

```bash
# Inside the backend folder
poetry add <package-name>

# Run the FastAPI server
poetry run uvicorn backend.app:app --reload
```

## 🚀 Vizinn App – Transforming Neighborhoods, Connecting People!

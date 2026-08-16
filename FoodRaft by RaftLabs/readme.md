# FoodRaft - Food Ordering Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for food ordering and delivery management. FoodRaft enables users to browse restaurant menus, add items to their cart, place orders, and track their delivery status in real-time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Frontend Routes](#frontend-routes)
- [Key Middleware & Services](#key-middleware--services)
- [Development Notes](#development-notes)

## Features

### User Features

- **User Authentication**: Register, login, and logout with JWT and session management
- **Browse Menu**: View all available food items with descriptions, prices, and images
- **Item Details**: View detailed information about individual menu items
- **Shopping Cart**: Add/remove items from cart, manage quantities
- **Order Placement**: Create orders with delivery details and address information
- **Order Tracking**: View order history and track order status in real-time
- **User Profile**: Manage personal information and profile settings
- **Account Settings**: Update account preferences

### Admin Features

- Order status management and updates
- Menu item management (structure in place, routes commented out)
- Automated cron jobs for scheduled tasks

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + Express Sessions
- **Password Hashing**: Argon2
- **Task Scheduling**: node-cron
- **Validation**: Zod schema validation
- **Session Storage**: MongoDB (connect-mongo)
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv

### Frontend

- **Framework**: React 19.2.8
- **State Management**: Redux Toolkit + React-Redux
- **Routing**: React Router v7
- **Styling**: Tailwind CSS 4.3.3 + Tailwind CSS Vite Plugin
- **Build Tool**: Vite
- **Animations**: Motion library
- **Linting**: Oxlint
- **Language**: ES Modules (JavaScript)

## Project Structure

```
FoodRaft/
├── Backend/                          # Node.js Express API server
│   ├── src/
│   │   ├── app.js                   # Main application entry point
│   │   ├── config/
│   │   │   └── env.js              # Environment configuration with Zod validation
│   │   ├── loaders/
│   │   │   ├── index.js            # Loader orchestrator
│   │   │   ├── express.js          # Express middleware & route setup
│   │   │   ├── mongoose.js         # MongoDB connection
│   │   │   └── cron.js             # Scheduled tasks
│   │   ├── middlewares/
│   │   │   ├── authenticate.js     # JWT authentication middleware
│   │   │   └── errorHandler.js     # Global error handling
│   │   ├── module/foodraft/
│   │   │   ├── controllers/        # Request handlers
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── menu.controller.js
│   │   │   │   ├── cart.controller.js
│   │   │   │   └── order.controller.js
│   │   │   ├── models/             # MongoDB schemas
│   │   │   │   ├── user.model.js
│   │   │   │   ├── menu.model.js
│   │   │   │   ├── cart.model.js
│   │   │   │   └── order.model.js
│   │   │   ├── routes/             # API route definitions
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── menu.routes.js
│   │   │   │   ├── cart.routes.js
│   │   │   │   └── order.routes.js
│   │   │   ├── services/           # Business logic
│   │   │   │   ├── auth.service.js
│   │   │   │   ├── menu.service.js
│   │   │   │   ├── cart.service.js
│   │   │   │   └── order.service.js
│   │   │   ├── validators/         # Input validation schemas
│   │   │   │   ├── auth.validators.js
│   │   │   │   ├── cart.validators.js
│   │   │   │   └── order.validator.js
│   │   │   └── utils/
│   │   │       └── generateUniqueIds.js
│   │   └── shared/
│   │       ├── errors/             # Custom error classes
│   │       │   ├── appError.js
│   │       │   ├── bad-request-error.js
│   │       │   ├── not-found-error.js
│   │       │   └── unauthorized-error.js
│   │       └── utils/
│   │           └── asyncWrapper.js # Async error handling wrapper
│   ├── auth.http                   # HTTP client test file for auth endpoints
│   ├── menu.http                   # HTTP client test file for menu endpoints
│   ├── cart.http                   # HTTP client test file for cart endpoints
│   ├── order.http                  # HTTP client test file for order endpoints
│   ├── seed.js                     # Database seed script
│   └── package.json
│
└── Frontend/
    └── FoodRaft/
        ├── src/
        │   ├── main.jsx            # Application entry point
        │   ├── App.jsx             # Main app component with routing
        │   ├── index.css           # Global styles
        │   ├── App.css
        │   ├── api/
        │   │   └── api.jsx         # API client configuration
        │   ├── assets/             # Static assets
        │   ├── components/
        │   │   ├── animations/
        │   │   │   └── mouseMovement.jsx
        │   │   ├── layout/
        │   │   │   ├── Drawer.jsx
        │   │   │   ├── Loader.jsx
        │   │   │   └── RootLayout.jsx     # Main layout wrapper
        │   │   ├── routes/
        │   │   │   └── RouteGuard.jsx     # Protected & public route wrappers
        │   │   └── ui/              # Reusable UI components
        │   │       ├── Button.jsx
        │   │       ├── Card.jsx
        │   │       ├── CardRow.jsx
        │   │       ├── InputBox.jsx
        │   │       └── ScrollToTop.jsx
        │   ├── features/            # Redux slices (state management)
        │   │   ├── auth/
        │   │   │   └── auth.js
        │   │   ├── cart/
        │   │   │   └── cart.js
        │   │   ├── menu/
        │   │   │   └── menu.js
        │   │   └── order/
        │   │       └── order.js
        │   ├── hooks/               # Custom React hooks
        │   ├── pages/               # Page components
        │   │   ├── NotFound.jsx
        │   │   ├── auth/
        │   │   │   └── Login.jsx
        │   │   └── user/
        │   │       ├── Cart.jsx
        │   │       ├── Menu.jsx
        │   │       ├── Order.jsx
        │   │       ├── Profile.jsx
        │   │       ├── Settings.jsx
        │   │       └── ViewItem.jsx
        │   ├── store/
        │   │   └── store.jsx        # Redux store configuration
        │   └── utils/
        │       └── mapStatus.js     # Status mapping utilities
        ├── index.html
        ├── vite.config.js
        ├── tailwind.config.js (implied)
        └── package.json
```

## Prerequisites

### System Requirements

- **Node.js**: v16 or higher
- **npm** or **yarn**: Package manager
- **MongoDB**: Local or cloud instance (MongoDB Atlas recommended)

### Accounts & Services

- MongoDB database (local or Atlas)
- Email service (optional, if implementing email notifications)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "FoodRaft by RaftLabs"
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
NODE_ENV=development
PORT=5000
APP_BASE_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/foodraft
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here
```

### 3. Frontend Setup

```bash
cd Frontend/FoodRaft
npm install
```

Create a `.env` file in the Frontend/FoodRaft directory (if needed):

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Initialize Database (Optional)

```bash
cd Backend
node seed.js
```

## Environment Variables

### Backend (.env)

| Variable         | Description                   | Example                              |
| ---------------- | ----------------------------- | ------------------------------------ |
| `NODE_ENV`       | Application environment       | `development`, `production`, `test`  |
| `PORT`           | Server port                   | `5000`                               |
| `APP_BASE_URL`   | Frontend URL for CORS         | `http://localhost:5173`              |
| `MONGO_URI`      | MongoDB connection string     | `mongodb://localhost:27017/foodraft` |
| `JWT_SECRET`     | Secret key for JWT signing    | Generate a strong random string      |
| `SESSION_SECRET` | Secret for session encryption | Generate a strong random string      |

### Frontend

- Environment variables can be prefixed with `VITE_` to be exposed to the client
- Typically stored in `.env.local` or `.env.development`

## Running the Application

### Start the Backend Server

```bash
cd Backend
npm start
```

The server will start on `http://localhost:5000`

Check server health: `http://localhost:5000/health`

### Start the Frontend Development Server

In a new terminal:

```bash
cd Frontend/FoodRaft
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build (Frontend)

```bash
cd Frontend/FoodRaft
npm run build
npm run preview
```

### Linting (Frontend)

```bash
cd Frontend/FoodRaft
npm run lint
```

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Authentication Routes (`/auth`)

| Method | Endpoint         | Description           | Auth Required |
| ------ | ---------------- | --------------------- | ------------- |
| POST   | `/auth/register` | Register a new user   | No            |
| POST   | `/auth/login`    | Login user            | No            |
| POST   | `/auth/logout`   | Logout user           | Yes           |
| GET    | `/auth/me`       | Get current user info | Yes           |

**Request/Response Examples:**

**Register:**

```json
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}
```

**Login:**

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Menu Routes (`/menu`)

| Method | Endpoint            | Description              | Auth Required |
| ------ | ------------------- | ------------------------ | ------------- |
| GET    | `/menu`             | Fetch all menu items     | Yes           |
| GET    | `/menu/:menuItemId` | Fetch specific menu item | Yes           |

**Response Example:**

```json
{
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "price": 12.99,
  "imageUrl": "https://...",
  "category": "Pizza",
  "isAvailable": true,
  "preperationTime": 15
}
```

### Cart Routes (`/cart`)

| Method | Endpoint    | Description           | Auth Required |
| ------ | ----------- | --------------------- | ------------- |
| GET    | `/cart`     | Get user's cart       | Yes           |
| POST   | `/cart`     | Add item to cart      | Yes           |
| DELETE | `/cart`     | Remove item from cart | Yes           |
| DELETE | `/cart/all` | Clear entire cart     | Yes           |

**Request Example (Add to Cart):**

```json
POST /api/cart
{
  "productId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Margherita Pizza",
  "quantity": 2,
  "price": 12.99,
  "isAvailable": true
}
```

### Order Routes (`/order`)

| Method | Endpoint               | Description              | Auth Required |
| ------ | ---------------------- | ------------------------ | ------------- |
| GET    | `/orders`              | Get user's orders        | Yes           |
| GET    | `/status-notification` | Get order status updates | Yes           |
| GET    | `/getBill`             | Get bill details         | Yes           |
| POST   | `/order`               | Create new order         | Yes           |
| PATCH  | `/update-order-status` | Update order status      | No (Admin)    |
| DELETE | `/cancel-order`        | Cancel order             | Yes           |

**Request Example (Create Order):**

```json
POST /api/order
{
  "delivery": {
    "name": "John Doe",
    "phone": "+1234567890",
    "address": {
      "line1": "123 Main St",
      "line2": "Apt 4",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001"
    }
  },
  "price": {
    "subTotal": 25.98,
    "deliveryFee": 5.00,
    "tax": 2.50,
    "total": 33.48
  }
}
```

### Health Check

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| GET    | `/health` | Server health check |
| HEAD   | `/health` | Server health check |

## Database Models

### User Model

```javascript
{
  username: String (unique, min 3 chars),
  email: String (unique, valid email),
  password: String (min 6 chars, hashed with Argon2),
  phone: String (unique, valid phone number),
  role: String (enum: 'user', 'admin', default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Menu Item Model

```javascript
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  isAvailable: Boolean (default: true),
  preperationTime: Number (minutes),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Cart Model

```javascript
{
  userId: ObjectId (ref: User),
  productId: String,
  name: String,
  quantity: Number (min: 1),
  price: Number,
  isAvailable: Boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Order Model

```javascript
{
  userId: ObjectId (ref: User),
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
      isAvailable: Boolean
    }
  ],
  delivery: {
    name: String,
    phone: String,
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postalCode: String
    }
  },
  price: {
    subTotal: Number,
    deliveryFee: Number,
    tax: Number,
    total: Number
  },
  orderStatus: String (enum: 'pending', 'confirmed', 'preparing', 'on-way', 'delivered', 'cancelled'),
  paymentStatus: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Frontend Routes

### Public Routes

- `/` → Login page
- `/login` → Login page

### Protected Routes (Require Authentication)

- `/menu` → Browse all menu items
- `/menu/:id` → View specific menu item details
- `/cart` → Shopping cart page
- `/order` → Order history and tracking
- `/profile` → User profile management
- `/settings` → Account settings
- `*` → 404 Not Found page

## Key Middleware & Services

### Authentication Middleware

- **File**: `src/middlewares/authenticate.js`
- **Purpose**: Verifies JWT tokens and protects routes
- **Applied to**: All protected API endpoints

### Error Handler

- **File**: `src/middlewares/errorHandler.js`
- **Purpose**: Global error handling and response formatting
- **Custom Error Classes**: AppError, BadRequestError, NotFoundError, UnauthorizedError

### Async Wrapper

- **File**: `src/shared/utils/asyncWrapper.js`
- **Purpose**: Wraps async route handlers to catch errors

### Session Management

- **Type**: Express-Session with MongoDB store
- **Duration**: 7 days
- **Secure**: Cookies are httpOnly and secure in production

### CORS Configuration

- **Allowed Origins**: Frontend URL (`http://localhost:5173`) and `APP_BASE_URL`
- **Credentials**: Enabled for cookie-based auth

### Cron Jobs

- **File**: `src/loaders/cron.js`
- **Purpose**: Scheduled tasks for order status updates and notifications

## Development Notes

### Current Status

- ✅ Authentication system (Register, Login, Logout)
- ✅ Menu browsing and item details
- ✅ Shopping cart functionality
- ✅ Order placement and tracking
- ✅ User profile and settings UI
- 🔄 Admin features (routes commented out, structure ready)
- ⚠️ Password hashing (note in user model indicates implementation issue)
- 🔄 Email notifications (structure ready)

### Known Issues & TODOs

1. **Password Hashing**: User model has comment indicating password hashing pre-save hook needs fixing
2. **Admin Routes**: Menu CRUD operations have commented-out routes in `menu.routes.js`
3. **Payment Integration**: Price model structure is in place but payment processing not implemented
4. **Status Updates**: Cron job structure exists but scheduling logic needs implementation
5. **Type Safety**: `src/types/` directory exists but TypeScript/JSDoc types not yet implemented

### Testing

- Backend: HTTP client test files provided (`.http` files can be used with REST Client VSCode extension)
- Frontend: Test commands available but no test files currently created

### Performance Considerations

- MongoDB sessions are stored with 7-day TTL
- Session auto-cleanup is enabled
- React 19 compiler is integrated for optimization

### Security Features

- JWT-based authentication
- Password hashing with Argon2
- CORS protection
- HttpOnly and Secure cookies
- Session validation
- Input validation with Zod

## Contributing

When contributing to FoodRaft:

1. Follow the existing project structure
2. Add validation schemas for new endpoints
3. Implement proper error handling with custom error classes
4. Add JSDoc comments for complex functions
5. Test endpoints using provided `.http` files

## License

ISC License

---

**Last Updated**: 2026-08-16
**Project Status**: Active Development

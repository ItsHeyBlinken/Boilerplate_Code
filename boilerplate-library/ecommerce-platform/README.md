# E-commerce Platform Boilerplate

A comprehensive full-stack e-commerce platform built with React, Express.js, MongoDB, and TypeScript. This boilerplate provides a complete foundation for building modern e-commerce applications with features like product management, shopping cart, order processing, payment integration, and admin dashboard.

## 🚀 Features

### Core E-commerce Features
- **Product Management**: Full CRUD operations with variants, attributes, and inventory tracking
- **Shopping Cart**: Persistent cart with session management
- **Order Processing**: Complete order lifecycle from cart to fulfillment
- **Payment Integration**: Stripe payment processing
- **User Management**: Customer, admin, and seller roles
- **Review System**: Product reviews and ratings
- **Search & Filtering**: Advanced product search and filtering
- **Inventory Management**: Stock tracking and low stock alerts

### Technical Features
- **Full-Stack TypeScript**: Type-safe development across frontend and backend
- **Modern React**: Hooks, Context API, and modern patterns
- **Express.js API**: RESTful API with comprehensive middleware
- **MongoDB**: Flexible document database with Mongoose ODM
- **Authentication**: JWT-based authentication with role-based access
- **File Upload**: Image upload and processing with Sharp
- **Email Integration**: Nodemailer for transactional emails
- **Caching**: Redis for session storage and caching
- **Validation**: Comprehensive input validation with Joi
- **Testing**: Jest and Supertest for API testing
- **Linting**: ESLint with TypeScript support
- **Hot Reload**: Development with hot reloading

## 📁 Project Structure

```
ecommerce-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── store/         # State management (Zustand)
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── styles/        # Global styles and Tailwind config
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic services
│   │   ├── utils/         # Utility functions
│   │   ├── config/        # Configuration files
│   │   └── index.ts       # Server entry point
│   └── package.json
├── package.json           # Root package.json with scripts
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Stripe Elements** - Payment UI components
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Multer** - File uploads
- **Sharp** - Image processing
- **Nodemailer** - Email sending
- **Redis** - Caching and sessions
- **Joi** - Input validation
- **Winston** - Logging

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Redis (optional, for caching)
- Stripe account (for payments)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd boilerplate-library/ecommerce-platform
   ```

2. **Install dependencies:**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables:**
   ```bash
   # Copy example files
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   
   # Edit the .env files with your configuration
   ```

4. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start both the client (http://localhost:5173) and server (http://localhost:3000) concurrently.

### Environment Variables

#### Server (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce-platform
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
REDIS_URL=redis://localhost:6379
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

#### Client (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 📝 Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build the client for production
- `npm start` - Start the production server
- `npm run install-all` - Install dependencies for both client and server
- `npm run lint` - Run ESLint on both client and server
- `npm run test` - Run tests for both client and server

### Server
- `npm run server` - Start server in development mode
- `npm run build` - Build server for production
- `npm run start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Client
- `npm run client` - Start client in development mode
- `npm run build` - Build client for production
- `npm run preview` - Preview production build

## 🗄️ Database Models

### User
- Authentication and profile management
- Role-based access (Customer, Admin, Seller)
- Address management
- Shopping cart and wishlist
- Order history

### Product
- Comprehensive product information
- Variants and attributes
- Inventory tracking
- SEO optimization
- Digital/physical product support

### Category
- Hierarchical category structure
- SEO-friendly slugs
- Category images and descriptions

### Order
- Complete order lifecycle
- Payment tracking
- Shipping information
- Order status management

### Review
- Product reviews and ratings
- Customer feedback system
- Moderation capabilities

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Email verification
- Password reset functionality

## 💳 Payment Integration

- Stripe payment processing
- Multiple payment methods
- Webhook handling
- Payment intent management
- Refund processing

## 📧 Email System

- Transactional emails
- Order confirmations
- Password reset emails
- Newsletter subscriptions
- Email templates

## 🧪 Testing

- Jest for unit testing
- Supertest for API testing
- React Testing Library for component testing
- Test coverage reporting

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Support
```bash
# Build Docker image
docker build -t ecommerce-platform .

# Run with Docker Compose
docker-compose up -d
```

## 📚 API Documentation

The API follows RESTful conventions:

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `POST /api/payments/create-intent` - Create payment intent

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the example code

## 🔄 Updates

This boilerplate is regularly updated with:
- Latest dependencies
- Security patches
- New features
- Performance improvements
- Best practices

---

**Happy coding!** 🎉
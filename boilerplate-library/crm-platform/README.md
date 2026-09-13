# CRM Platform Boilerplate

A comprehensive Customer Relationship Management (CRM) platform built with React, Express.js, MongoDB, and TypeScript. This boilerplate provides a complete foundation for building modern CRM applications with features like contact management, lead tracking, sales pipeline, task management, and analytics.


## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm run install-all` (or install client + server separately)
3. Copy server/client `.env.example` files and set MongoDB + JWT values
4. Start MongoDB locally (or point `MONGODB_URI` at your instance)
5. Run the root `npm run dev` (or README scripts) to boot client + server
6. Customize CRM models and UI for your workflow
7. Note: this template still uses MongoDB; a PostgreSQL migration is planned later

Do not commit real API keys or passwords. Treat `.env` as local-only.

## 🚀 Features

### Core CRM Features
- **Contact Management**: Complete contact database with communication history
- **Lead Management**: Lead tracking, scoring, and conversion pipeline
- **Sales Pipeline**: Visual sales funnel with stage management
- **Deal Management**: Opportunity tracking with revenue forecasting
- **Task Management**: Task creation, assignment, and tracking
- **Activity Tracking**: Comprehensive activity logging and timeline
- **Reporting & Analytics**: Sales reports, performance metrics, and dashboards
- **Team Collaboration**: User roles, permissions, and team management

### Technical Features
- **Full-Stack TypeScript**: Type-safe development across frontend and backend
- **Modern React**: Hooks, Context API, and modern patterns
- **Express.js API**: RESTful API with comprehensive middleware
- **MongoDB**: Flexible document database with Mongoose ODM
- **Authentication**: JWT-based authentication with role-based access
- **File Upload**: Document and attachment management
- **Email Integration**: Automated email notifications and templates
- **Real-time Updates**: WebSocket support for live collaboration
- **Data Validation**: Comprehensive input validation with Joi
- **Testing**: Jest and Supertest for API testing
- **Linting**: ESLint with TypeScript support
- **Hot Reload**: Development with hot reloading

## 📁 Project Structure

```
crm-platform/
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
│   │   ├── services/     # Business logic services
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
- **Recharts** - Data visualization
- **React Table** - Data tables
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
- **Multer** - File uploads
- **Sharp** - Image processing
- **Nodemailer** - Email sending
- **Socket.io** - Real-time communication
- **Joi** - Input validation
- **Winston** - Logging

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Email service (for notifications)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd boilerplate-library/crm-platform
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
MONGODB_URI=mongodb://localhost:27017/crm-platform
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

#### Client (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=CRM Platform
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
- User authentication and profile management
- Role-based access (Admin, Manager, Sales Rep, User)
- Team and department assignment
- Activity tracking and preferences

### Contact
- Complete contact information
- Communication history
- Lead source tracking
- Custom fields and tags

### Lead
- Lead information and scoring
- Lead source and status tracking
- Conversion pipeline management
- Lead assignment and follow-up

### Deal/Opportunity
- Sales opportunity management
- Revenue forecasting
- Stage tracking and progression
- Deal team assignment

### Task
- Task creation and assignment
- Due dates and priorities
- Task status tracking
- Activity logging

### Activity
- Comprehensive activity logging
- Communication tracking
- Meeting and call logs
- Document attachments

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin, Manager, Sales Rep, User)
- Password hashing with bcrypt
- Email verification
- Password reset functionality

## 📊 Analytics & Reporting

- Sales performance dashboards
- Lead conversion metrics
- Revenue forecasting
- Team performance reports
- Custom report builder

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
docker build -t crm-platform .

# Run with Docker Compose
docker-compose up -d
```

## 📚 API Documentation

The API follows RESTful conventions:

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity

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

**Happy CRM building!** 🎉
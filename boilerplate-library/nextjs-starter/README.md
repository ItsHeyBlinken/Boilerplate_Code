# 🚀 Next.js Starter Boilerplate

A modern, production-ready Next.js 14 application with App Router, NextAuth.js authentication, Prisma database integration, and TypeScript. Perfect for building full-stack web applications with authentication and database management.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Authentication](#authentication)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Customization](#customization)
- [Sample Use Cases](#sample-use-cases)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **⚡ Next.js 14**: Latest Next.js with App Router
- **🔐 NextAuth.js**: Complete authentication system
- **🗄️ Prisma**: Type-safe database ORM
- **📘 TypeScript**: Full type safety
- **🎨 Tailwind CSS**: Utility-first styling
- **🔧 PostgreSQL**: Robust database support
- **📱 Responsive**: Mobile-first design
- **♿ Accessible**: WCAG compliant components
- **🌙 Dark Mode**: Theme switching support
- **🔒 Role-based Access**: User roles and permissions
- **📊 Dashboard**: Admin dashboard with analytics
- **🚀 Production Ready**: Optimized for deployment

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** (v14+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Copy the boilerplate to your project directory
cp -r ./nextjs-starter ../my-nextjs-app
cd ../my-nextjs-app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

### 3. Database Setup

```bash
# Set up your PostgreSQL database
# Update DATABASE_URL in .env.local

# Push the schema to your database
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed the database with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5. Open in Browser

Visit `http://localhost:3000` to see your application.

## 📁 Project Structure

```
nextjs-starter/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                 # Database seeding
├── src/
│   ├── app/                    # App Router pages
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication API
│   │   ├── auth/              # Auth pages
│   │   │   ├── signin/        # Sign in page
│   │   │   └── signup/        # Sign up page
│   │   ├── dashboard/         # Dashboard page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── providers.tsx      # Context providers
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   └── dashboard/        # Dashboard components
│   └── lib/                  # Utility libraries
│       ├── auth.ts           # NextAuth configuration
│       ├── prisma.ts         # Prisma client
│       └── utils.ts         # Utility functions
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | ^14.0.3 | React framework with App Router |
| **React** | ^18.2.0 | UI library |
| **TypeScript** | ^5.3.2 | Type safety |
| **NextAuth.js** | ^4.24.5 | Authentication |
| **Prisma** | ^5.7.0 | Database ORM |
| **PostgreSQL** | - | Database |
| **Tailwind CSS** | ^3.3.6 | Styling |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **Zod** | ^3.22.4 | Schema validation |

## 🔐 Authentication

### Supported Providers

- **Credentials**: Email/password authentication
- **Google OAuth**: Google sign-in
- **GitHub OAuth**: GitHub sign-in

### User Roles

- **USER**: Regular user access
- **ADMIN**: Administrative access

### Authentication Flow

1. **Sign Up**: Users can create accounts with email/password
2. **Sign In**: Multiple authentication methods supported
3. **Session Management**: JWT-based sessions
4. **Protected Routes**: Server-side route protection
5. **Role-based Access**: Different access levels

### Adding New Providers

```typescript
// src/lib/auth.ts
import DiscordProvider from 'next-auth/providers/discord'

export const authOptions: NextAuthOptions = {
  providers: [
    // ... existing providers
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
}
```

## 🗄️ Database Setup

### Prisma Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: User accounts and profiles
- **Account**: OAuth account connections
- **Session**: User sessions
- **Post**: Blog posts/content
- **VerificationToken**: Email verification

### Database Commands

```bash
# Push schema changes
npm run db:push

# Create and run migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Seed database
npm run db:seed

# Reset database
npx prisma migrate reset
```

### Adding New Models

```prisma
// prisma/schema.prisma
model Category {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nextjs_starter"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (Optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"

# App Configuration
NEXT_PUBLIC_APP_NAME="Next.js Starter"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🛣️ API Routes

### Authentication Routes

- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Example API Route

```typescript
// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })

  return NextResponse.json(posts)
}
```

## 🎨 Customization

### Adding New Pages

1. Create a new page in `src/app/`:

```typescript
// src/app/posts/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function PostsPage() {
  const session = await getServerSession(authOptions)
  
  return (
    <div>
      <h1>Posts</h1>
      {/* Your content */}
    </div>
  )
}
```

### Custom Components

```typescript
// src/components/ui/custom-button.tsx
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CustomButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function CustomButton({ variant = 'primary', children }: CustomButtonProps) {
  return (
    <Button
      className={cn(
        variant === 'primary' && 'bg-blue-600 hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-600 hover:bg-gray-700'
      )}
    >
      {children}
    </Button>
  )
}
```

### Styling

The application uses Tailwind CSS with custom design tokens:

```css
/* src/app/globals.css */
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... other tokens */
}
```

## 🎯 Sample Use Cases

### 1. **Blog Platform**
- Add post management features
- Implement categories and tags
- Add comment system
- Create RSS feeds

### 2. **E-commerce Store**
- Add product management
- Implement shopping cart
- Add payment integration
- Create order management

### 3. **SaaS Application**
- Add subscription management
- Implement feature toggles
- Add billing system
- Create user onboarding

### 4. **Content Management System**
- Add rich text editor
- Implement media management
- Add content scheduling
- Create SEO tools

### 5. **Social Media Platform**
- Add user profiles
- Implement following system
- Add content creation tools
- Create notification system

### 6. **Analytics Dashboard**
- Add data visualization
- Implement real-time updates
- Add custom reports
- Create data export

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server |
| **Build** | `npm run build` | Build for production |
| **Start** | `npm run start` | Start production server |
| **Lint** | `npm run lint` | Run ESLint |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |
| **DB Push** | `npm run db:push` | Push schema to database |
| **DB Migrate** | `npm run db:migrate` | Create and run migrations |
| **DB Generate** | `npm run db:generate` | Generate Prisma client |
| **DB Seed** | `npm run db:seed` | Seed database |

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to VPS

1. **Set up your server**:
   ```bash
   # Install Node.js and PostgreSQL
   sudo apt update
   sudo apt install nodejs npm postgresql
   ```

2. **Configure PostgreSQL**:
   ```bash
   sudo -u postgres createdb your_database_name
   sudo -u postgres createuser your_username
   ```

3. **Deploy your application**:
   ```bash
   # Upload your code
   scp -r . user@your-server:/var/www/your-app
   
   # Install dependencies
   cd /var/www/your-app
   npm install
   
   # Set up environment variables
   cp .env.example .env.local
   # Edit .env.local with production values
   
   # Set up database
   npm run db:push
   npm run db:seed
   
   # Build and start
   npm run build
   npm run start
   ```

4. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Environment Variables for Production

```bash
# Production .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/production_db"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
NODE_ENV="production"
```

## 🔧 Troubleshooting

### Common Issues

**Q: Database connection failed**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U username -d database_name
```

**Q: NextAuth.js not working**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure OAuth provider credentials are correct

**Q: Prisma client not found**
```bash
# Generate Prisma client
npm run db:generate

# Or regenerate
npx prisma generate
```

**Q: Build fails**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Q: TypeScript errors**
```bash
# Run type checking
npm run type-check

# Check tsconfig.json
```

### Performance Tips

1. **Database Optimization**:
   - Add database indexes
   - Use connection pooling
   - Optimize queries

2. **Next.js Optimization**:
   - Use dynamic imports
   - Implement ISR (Incremental Static Regeneration)
   - Optimize images

3. **Caching**:
   - Implement Redis caching
   - Use Next.js caching strategies
   - Add CDN for static assets

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 78+
- ✅ Safari 14+
- ✅ Edge 88+

## 🔍 SEO Optimization

The boilerplate includes:

- Server-side rendering (SSR)
- Static site generation (SSG)
- Meta tags and Open Graph
- Structured data ready
- Fast loading times
- Mobile-friendly design

## 🧪 Testing Setup

To add testing:

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Add test script to package.json
"test": "jest"
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you need help:

1. Check the troubleshooting section above
2. Look at the sample use cases for inspiration
3. Open an issue on GitHub
4. Check the code comments for guidance

---

**Happy Coding! 🎉**

This boilerplate provides a solid foundation for building modern Next.js applications with authentication and database integration. Customize it to match your project requirements and start building amazing web experiences!
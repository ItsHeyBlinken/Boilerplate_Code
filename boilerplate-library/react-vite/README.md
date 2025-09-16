# ⚛️ React Vite Boilerplate

A modern, production-ready React application built with Vite, TypeScript, Tailwind CSS, and Zustand. Perfect for building fast, scalable web applications with excellent developer experience.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Customization](#customization)
- [Sample Use Cases](#sample-use-cases)
- [Available Scripts](#available-scripts)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **⚡ Vite**: Lightning-fast build tool and dev server
- **⚛️ React 18**: Latest React with concurrent features
- **📘 TypeScript**: Full type safety and better DX
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🗃️ Zustand**: Lightweight state management
- **🧭 React Router**: Declarative routing
- **📱 Responsive**: Mobile-first design
- **♿ Accessible**: WCAG compliant components
- **🔧 ESLint**: Code linting and formatting
- **🎯 Hot Module Replacement**: Instant updates during development

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 3. Open in Browser

The application will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
react-vite/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   └── NotFound.tsx
│   ├── store/             # Zustand stores
│   │   ├── useStore.ts
│   │   └── useCounterStore.ts
│   ├── utils/             # Utility functions
│   │   ├── cn.ts
│   │   └── constants.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── README.md             # This file
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.2.0 | UI library |
| **TypeScript** | ^5.2.2 | Type safety |
| **Vite** | ^4.5.0 | Build tool |
| **Tailwind CSS** | ^3.3.5 | Styling |
| **Zustand** | ^4.4.7 | State management |
| **React Router** | ^6.20.1 | Routing |
| **Lucide React** | ^0.294.0 | Icons |
| **ESLint** | ^8.53.0 | Code linting |

## 🎨 Customization

### Colors

Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        // ... add your colors
      }
    }
  }
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Header.tsx` and `src/components/Sidebar.tsx`

```tsx
// src/pages/NewPage.tsx
export function NewPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">New Page</h1>
    </div>
  )
}

// src/App.tsx
import { NewPage } from './pages/NewPage'

<Routes>
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

### State Management

Add new stores in `src/store/`:

```tsx
// src/store/useNewStore.ts
import { create } from 'zustand'

interface NewState {
  data: string[]
  addData: (item: string) => void
  removeData: (index: number) => void
}

export const useNewStore = create<NewState>((set) => ({
  data: [],
  addData: (item) => set((state) => ({ 
    data: [...state.data, item] 
  })),
  removeData: (index) => set((state) => ({
    data: state.data.filter((_, i) => i !== index)
  }))
}))
```

## 🎯 Sample Use Cases

### 1. **Admin Dashboard**
- Replace dashboard content with your metrics
- Add data visualization charts
- Implement user management features
- Add role-based access control

### 2. **E-commerce Store**
- Add product catalog pages
- Implement shopping cart functionality
- Add checkout flow
- Integrate payment processing

### 3. **SaaS Application**
- Add subscription management
- Implement feature toggles
- Add billing and invoicing
- Create user onboarding flow

### 4. **Content Management System**
- Add rich text editor
- Implement file uploads
- Create content scheduling
- Add SEO management tools

### 5. **Social Media Platform**
- Add user profiles and feeds
- Implement real-time messaging
- Add content creation tools
- Create notification system

### 6. **Analytics Dashboard**
- Add data visualization components
- Implement real-time updates
- Create custom report builder
- Add data export functionality

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server |
| **Build** | `npm run build` | Build for production |
| **Preview** | `npm run preview` | Preview production build |
| **Lint** | `npm run lint` | Run ESLint |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |

## 🗃️ State Management

This boilerplate uses **Zustand** for state management. It's lightweight, TypeScript-friendly, and doesn't require providers.

### Main Store (`useStore.ts`)

```tsx
import { useStore } from './store/useStore'

function MyComponent() {
  const { user, isAuthenticated, setUser } = useStore()
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  )
}
```

### Counter Store (`useCounterStore.ts`)

```tsx
import { useCounterStore } from './store/useCounterStore'

function Counter() {
  const { count, increment, decrement } = useCounterStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

## 🧭 Routing

Uses React Router v6 with declarative routing:

```tsx
// Add new routes in App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Navigation

```tsx
import { Link, useNavigate } from 'react-router-dom'

// Declarative navigation
<Link to="/dashboard">Go to Dashboard</Link>

// Programmatic navigation
const navigate = useNavigate()
navigate('/dashboard')
```

## 🎨 Styling

### Tailwind CSS Classes

The boilerplate includes custom utility classes:

```tsx
// Button variants
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-danger">Danger Button</button>

// Card components
<div className="card">
  <div className="card-header">Header</div>
  <div className="card-body">Body</div>
  <div className="card-footer">Footer</div>
</div>

// Form inputs
<input className="input" placeholder="Enter text..." />
```

### Custom Components

```tsx
// Using the cn utility for conditional classes
import { cn } from './utils/cn'

function Button({ variant, className, ...props }) {
  return (
    <button
      className={cn(
        'btn',
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        className
      )}
      {...props}
    />
  )
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized assets.

### Deploy to VPS

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Upload to your server**:
   ```bash
   scp -r dist/* user@your-server:/var/www/html/
   ```

3. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

### Environment Variables

Create `.env` files for different environments:

```bash
# .env.local
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=My React App

# .env.production
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME=My React App
```

## 🔧 Troubleshooting

### Common Issues

**Q: Port 3000 is already in use**
```bash
# Kill process on port 3000
npx kill-port 3000
# or use a different port
npm run dev -- --port 3001
```

**Q: TypeScript errors**
```bash
# Run type checking
npm run type-check
# Check tsconfig.json configuration
```

**Q: Tailwind styles not applying**
- Ensure Tailwind is imported in `src/index.css`
- Check `tailwind.config.js` content paths
- Restart the dev server

**Q: Build fails**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Q: Hot reload not working**
- Check if file is saved
- Restart the dev server
- Clear browser cache

### Performance Tips

1. **Code Splitting**: Use React.lazy() for route-based splitting
2. **Bundle Analysis**: Use `npm run build -- --analyze` to analyze bundle size
3. **Image Optimization**: Use WebP format and proper sizing
4. **Lazy Loading**: Implement lazy loading for images and components

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 78+
- ✅ Safari 14+
- ✅ Edge 88+

## 🔍 SEO Optimization

The boilerplate includes:

- Semantic HTML5 elements
- Meta tags in `index.html`
- Open Graph tags
- Structured data ready
- Fast loading times
- Mobile-friendly design

## 🧪 Testing Setup

To add testing:

```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Add test script to package.json
"test": "vitest"
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

This boilerplate provides a solid foundation for building modern React applications. Customize it to match your project requirements and start building amazing web experiences!
# 🖖 Vue.js Vite Boilerplate

A modern, production-ready Vue.js 3 application built with Vite, TypeScript, Pinia, and Tailwind CSS. Perfect for building fast, scalable frontend applications.

## 📋 Table of Contents

- [Features](#features)
- [Why Vue.js?](#why-vuejs)
- [Use Cases](#use-cases)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **🖖 Vue 3**: Latest Vue with Composition API
- **⚡ Vite**: Lightning-fast build tool and dev server
- **📘 TypeScript**: Full type safety
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🗃️ Pinia**: Modern state management
- **🧭 Vue Router**: Client-side routing
- **📡 Axios**: HTTP client for API calls
- **♿ Accessible**: WCAG compliant components
- **📱 Responsive**: Mobile-first design
- **🔧 ESLint**: Code linting and formatting

## 🎯 Why Vue.js?

### Perfect For:
- **Progressive Framework**: Can be adopted incrementally
- **Easy Learning Curve**: Gentle learning curve for beginners
- **Flexible**: Can be used for small widgets or full SPAs
- **Performance**: Fast rendering with virtual DOM
- **Developer Experience**: Great tooling and documentation
- **Ecosystem**: Rich ecosystem of plugins and libraries

### Key Advantages:
- **Composition API**: Better code organization and reusability
- **Reactivity**: Automatic UI updates
- **Component-Based**: Reusable, composable components
- **Single File Components**: HTML, CSS, JS in one file
- **TypeScript Support**: Full type safety available

## 🎯 Use Cases

### 1. **Single Page Applications (SPAs)**
- Dashboards and admin panels
- Web applications
- Interactive user interfaces
- Real-time applications

### 2. **Progressive Web Apps (PWAs)**
- Mobile-first applications
- Offline-capable apps
- App-like experiences in browser

### 3. **Component Libraries**
- Reusable UI components
- Design systems
- Shared component libraries

### 4. **E-commerce Applications**
- Product catalogs
- Shopping carts
- Checkout flows
- User accounts

### 5. **Content Management**
- Blog platforms
- Documentation sites
- Content editors
- Media galleries

### 6. **Data Visualization**
- Charts and graphs
- Analytics dashboards
- Reporting tools
- Real-time data displays

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd boilerplate-library/vue-vite
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
vue-vite/
├── src/
│   ├── assets/              # Static assets
│   ├── components/           # Reusable Vue components
│   │   ├── HelloWorld.vue
│   │   └── ...
│   ├── views/                # Page components
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   └── ...
│   ├── stores/               # Pinia stores
│   │   ├── user.ts
│   │   └── ...
│   ├── router/               # Vue Router configuration
│   │   └── index.ts
│   ├── services/             # API services
│   │   └── api.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   └── ...
│   ├── App.vue               # Root component
│   └── main.ts               # Application entry point
├── public/                   # Public static files
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vue** | ^3.3.11 | UI framework |
| **TypeScript** | ^5.3.2 | Type safety |
| **Vite** | ^5.0.5 | Build tool |
| **Pinia** | ^2.1.7 | State management |
| **Vue Router** | ^4.2.5 | Routing |
| **Tailwind CSS** | ^3.3.5 | Styling |
| **Axios** | ^1.6.2 | HTTP client |

## 🗃️ State Management

### Pinia Store Example

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email: string, password: string) {
      // Login logic
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
  getters: {
    userName: (state) => state.user?.name || 'Guest',
  },
})
```

### Usage in Components

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
```

## 🧭 Routing

### Router Configuration

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
  ],
})
```

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework for rapid UI development:

```vue
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-blue-600">Hello Vue!</h1>
  </div>
</template>
```

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server |
| **Build** | `npm run build` | Build for production |
| **Preview** | `npm run preview` | Preview production build |
| **Lint** | `npm run lint` | Run ESLint |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized assets.

### Deploy to VPS

1. Build the application
2. Upload `dist` folder to server
3. Configure Nginx to serve static files

## 🔧 Troubleshooting

### Common Issues

**Q: Port already in use**
```bash
# Use a different port
npm run dev -- --port 3000
```

**Q: TypeScript errors**
```bash
# Run type checking
npm run type-check
```

**Q: Tailwind styles not applying**
- Ensure Tailwind is imported in `src/main.ts`
- Check `tailwind.config.js` content paths
- Restart the dev server

## 📚 Learning Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License

---

**Happy Coding with Vue.js! 🖖**

This boilerplate provides a solid foundation for building modern Vue.js applications with TypeScript, Pinia, and Tailwind CSS.


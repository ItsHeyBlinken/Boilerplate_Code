# 🏗️ Monorepo Turborepo Boilerplate

A monorepo setup with Turborepo, managing multiple packages and applications. Perfect for teams working on multiple related projects with shared code.

## 📋 Table of Contents

- [Features](#features)
- [Why Monorepo?](#why-monorepo)
- [Use Cases](#use-cases)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Turborepo Concepts](#turborepo-concepts)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **🏗️ Monorepo**: Multiple packages in one repository
- **⚡ Turborepo**: High-performance build system
- **📦 Workspaces**: npm/yarn workspaces support
- **🔄 Shared Code**: Reusable packages and utilities
- **🚀 Fast Builds**: Caching and parallel execution
- **📘 TypeScript**: Type-safe across packages
- **🧪 Testing**: Unified testing across packages
- **📝 Linting**: Shared linting configuration
- **🎨 Formatting**: Consistent code formatting
- **🔧 Easy Management**: Single command for all packages

## 🎯 Why Monorepo?

### Perfect For:
- **Multiple Applications**: Web, mobile, desktop apps
- **Shared Packages**: Common utilities and components
- **Team Collaboration**: Easier code sharing
- **Version Management**: Single version for related packages
- **Refactoring**: Easier cross-package refactoring
- **Testing**: Test all packages together

### Key Advantages:
- **Code Sharing**: Reuse code across projects
- **Consistent Versions**: Same dependencies across packages
- **Atomic Changes**: Change multiple packages in one commit
- **Easier Testing**: Test all packages together
- **Better DX**: Single repository, unified tooling
- **Faster CI/CD**: Optimized builds with caching

## 🎯 Use Cases

### 1. **Multi-Application Projects**
- Web app + mobile app + admin panel
- Frontend + backend + shared types
- Multiple microservices
- Client and server applications

### 2. **Component Libraries**
- Shared UI components
- Design systems
- Utility libraries
- Type definitions

### 3. **Full-Stack Applications**
- Frontend and backend
- Shared types and utilities
- API client libraries
- Database schemas

### 4. **Team Projects**
- Multiple teams, one repo
- Shared packages
- Consistent tooling
- Unified workflows

### 5. **Package Publishing**
- Publishing multiple npm packages
- Version management
- Dependency management
- Release coordination

### 6. **Large Codebases**
- Enterprise applications
- Complex systems
- Multiple services
- Shared infrastructure

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v7+ for workspaces) or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd boilerplate-library/monorepo-turborepo
npm install
```

### 2. Build All Packages

```bash
npm run build
```

### 3. Start Development

```bash
npm run dev
```

### 4. Run Tasks

```bash
# Lint all packages
npm run lint

# Test all packages
npm run test

# Clean all packages
npm run clean
```

## 📁 Project Structure

```
monorepo-turborepo/
├── apps/                     # Applications
│   ├── web/                  # Web application
│   ├── api/                  # API server
│   └── admin/                # Admin panel
├── packages/                 # Shared packages
│   ├── ui/                   # UI components
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript types
│   └── config/               # Shared configuration
├── turbo.json                # Turborepo configuration
├── package.json              # Root package.json
└── .gitignore               # Git ignore rules
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Turborepo** | ^1.11.2 | Build system |
| **TypeScript** | ^5.3.2 | Type safety |
| **npm Workspaces** | - | Package management |
| **Prettier** | ^3.1.0 | Code formatting |

## 📚 Turborepo Concepts

### Pipeline Configuration

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

### Package Dependencies

```json
// apps/web/package.json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/utils": "workspace:*"
  }
}
```

### Task Execution

Turborepo runs tasks in parallel with caching:

```bash
# Runs build for all packages in parallel
npm run build

# Only builds changed packages (with cache)
npm run build
```

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Build** | `npm run build` | Build all packages |
| **Dev** | `npm run dev` | Start all dev servers |
| **Lint** | `npm run lint` | Lint all packages |
| **Test** | `npm run test` | Test all packages |
| **Clean** | `npm run clean` | Clean all build outputs |
| **Format** | `npm run format` | Format all code |

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Individual Apps

Each app in `apps/` can be deployed independently:

```bash
cd apps/web
npm run build
# Deploy dist/ folder
```

## 🔧 Troubleshooting

### Common Issues

**Q: Workspace dependencies not found**
- Run `npm install` from root
- Check workspace configuration
- Verify package names match

**Q: Build cache issues**
- Clear cache: `turbo clean`
- Rebuild: `npm run build`

**Q: Type errors across packages**
- Ensure packages are built
- Check TypeScript references
- Verify package exports

## 📚 Learning Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License

---

**Happy Coding with Monorepos! 🏗️**

This boilerplate provides a solid foundation for managing multiple packages and applications in a single repository with Turborepo.


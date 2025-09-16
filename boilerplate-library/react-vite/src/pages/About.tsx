import { Code, Heart, Shield, Zap } from 'lucide-react'

export function About() {
  const technologies = [
    { name: 'React 18', description: 'Latest version with concurrent features' },
    { name: 'TypeScript', description: 'Type safety and better developer experience' },
    { name: 'Vite', description: 'Lightning fast build tool and dev server' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Zustand', description: 'Lightweight state management' },
    { name: 'React Router', description: 'Declarative routing for React' },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimized for speed with Vite\'s lightning-fast HMR and build times.',
    },
    {
      icon: Shield,
      title: 'Type Safety',
      description: 'Full TypeScript support for better code quality and developer experience.',
    },
    {
      icon: Code,
      title: 'Developer Experience',
      description: 'Modern tooling with ESLint, Prettier, and hot module replacement.',
    },
    {
      icon: Heart,
      title: 'Maintainable',
      description: 'Clean architecture with organized components and state management.',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About This Boilerplate
        </h1>
        <p className="text-xl text-gray-600">
          A modern, production-ready React application template
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-16">
        <div className="card">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is this?
            </h2>
            <p className="text-gray-600 mb-4">
              This is a comprehensive React boilerplate built with modern web technologies. 
              It provides a solid foundation for building scalable web applications with 
              best practices and developer experience in mind.
            </p>
            <p className="text-gray-600">
              Whether you're building a simple landing page or a complex dashboard, 
              this boilerplate gives you everything you need to get started quickly 
              and efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Technologies Used
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-16">
        <div className="card">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Getting Started
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Install Dependencies</h3>
                  <p className="text-gray-600">Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code> to install all required packages.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Start Development Server</h3>
                  <p className="text-gray-600">Run <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code> to start the development server.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Customize</h3>
                  <p className="text-gray-600">Modify the components, pages, and styling to match your project requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Structure */}
      <section className="mb-16">
        <div className="card">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Project Structure
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <pre className="text-gray-700">
{`src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Layout.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Dashboard.tsx
│   └── Profile.tsx
├── store/              # Zustand stores
│   ├── useStore.ts
│   └── useCounterStore.ts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section>
        <div className="card">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contributing
            </h2>
            <p className="text-gray-600 mb-6">
              This boilerplate is open source and contributions are welcome! 
              Feel free to submit issues, feature requests, or pull requests.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <a
                href="https://github.com/issues"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Report Issues
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
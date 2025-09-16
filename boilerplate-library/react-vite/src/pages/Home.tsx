import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star, Users, Zap } from 'lucide-react'
import { useCounterStore } from '../store/useCounterStore'

export function Home() {
  const { count, increment, decrement, reset } = useCounterStore()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email subscription
    console.log('Email submitted:', email)
    setEmail('')
  }

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Vite for instant hot module replacement and fast builds.',
    },
    {
      icon: Star,
      title: 'Modern Stack',
      description: 'React 18, TypeScript, Tailwind CSS, and Zustand for state management.',
    },
    {
      icon: Users,
      title: 'Developer Friendly',
      description: 'Well-structured code with TypeScript for better development experience.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to{' '}
          <span className="text-gradient">React Vite</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A modern React application built with Vite, TypeScript, Tailwind CSS, 
          and Zustand. Perfect for building fast, scalable web applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link to="/about" className="btn-secondary text-lg px-8 py-3">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose This Boilerplate?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to build modern React applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card animate-fade-in">
                <div className="card-body text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Counter Demo Section */}
      <section className="py-16 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            State Management Demo
          </h2>
          <p className="text-xl text-gray-600">
            See Zustand state management in action
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="card">
            <div className="card-body text-center">
              <div className="text-6xl font-bold text-primary-600 mb-6">
                {count}
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={decrement}
                  className="btn-secondary"
                >
                  -
                </button>
                <button
                  onClick={reset}
                  className="btn-secondary"
                >
                  Reset
                </button>
                <button
                  onClick={increment}
                  className="btn-primary"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600">
            Get the latest updates and tips delivered to your inbox
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input flex-1"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Start your next project with this modern React boilerplate
        </p>
        <Link to="/dashboard" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
          Start Building
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  )
}
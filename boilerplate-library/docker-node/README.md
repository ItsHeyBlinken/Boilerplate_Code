# 🐳 Dockerized Node App Boilerplate

A production-ready Node.js application with comprehensive Docker configuration, multi-stage builds, Docker Compose setup, and deployment-ready configuration. Features MongoDB, Redis, Nginx reverse proxy, monitoring with Prometheus and Grafana, and modern development practices.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Docker Configuration](#docker-configuration)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Production Deployment](#production-deployment)
- [Monitoring](#monitoring)
- [Customization](#customization)
- [Sample Use Cases](#sample-use-cases)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

### Docker Configuration
- **🐳 Multi-stage Builds**: Optimized production images
- **📦 Container Orchestration**: Docker Compose for development and production
- **🔒 Security**: Non-root user, minimal attack surface
- **⚡ Performance**: Optimized layer caching and image size
- **🔄 Hot Reload**: Development environment with volume mounting

### Production Ready
- **🌐 Nginx Reverse Proxy**: Load balancing and SSL termination
- **🗄️ MongoDB**: Document database with persistence
- **📊 Redis**: Caching and session storage
- **📈 Monitoring**: Prometheus and Grafana integration
- **🔐 Security**: SSL/TLS, security headers, rate limiting
- **📊 Logging**: Centralized logging with Winston

### Development Features
- **⚡ Express.js**: Fast, scalable web framework
- **📘 TypeScript**: Full type safety and better DX
- **🔐 JWT Authentication**: Secure token-based authentication
- **📝 Input Validation**: Joi schema validation
- **🛡️ Security**: Helmet, CORS, rate limiting
- **🧪 Testing**: Jest testing framework setup

### DevOps Features
- **📊 Health Checks**: Container health monitoring
- **🔄 Auto-restart**: Container restart policies
- **📈 Resource Limits**: Memory and CPU constraints
- **🔍 Logging**: Structured logging and log aggregation
- **📊 Metrics**: Application and infrastructure metrics

## 🛠️ Prerequisites

- **Docker** (v20+ recommended)
- **Docker Compose** (v2+ recommended)
- **Git**
- **Basic knowledge of Docker and containerization**

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Copy the boilerplate to your project directory
cp -r ./docker-node ../my-docker-app
cd ../my-docker-app

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 2. Development Environment

```bash
# Start development environment
npm run docker:dev

# Or using Docker Compose directly
docker-compose -f docker-compose.dev.yml up
```

### 3. Production Environment

```bash
# Build and start production environment
npm run docker:prod

# Or using Docker Compose directly
docker-compose -f docker-compose.prod.yml up
```

### 4. Access the Application

- **Application**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **Prometheus**: http://localhost:9090 (production only)
- **Grafana**: http://localhost:3001 (production only)

## 📁 Project Structure

```
docker-node/
├── src/                      # Application source code
│   ├── config/              # Configuration files
│   │   ├── database.ts       # MongoDB connection
│   │   └── redis.ts          # Redis connection
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Express middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── services/             # Business logic services
│   ├── utils/                # Utility functions
│   └── index.ts              # Application entry point
├── nginx/                    # Nginx configuration
│   ├── nginx.conf            # Development config
│   ├── nginx.prod.conf       # Production config
│   └── ssl/                  # SSL certificates (production)
├── monitoring/               # Monitoring configuration
│   └── prometheus.yml        # Prometheus config
├── mongodb/                  # MongoDB configuration
│   └── mongod.conf           # MongoDB config
├── Dockerfile                # Production Docker image
├── Dockerfile.dev            # Development Docker image
├── docker-compose.dev.yml    # Development environment
├── docker-compose.prod.yml   # Production environment
├── .dockerignore             # Docker ignore file
├── .env.example              # Environment variables template
├── healthcheck.js            # Health check script
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Technologies Used

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18-alpine | JavaScript runtime |
| **Express.js** | ^4.18.2 | Web framework |
| **TypeScript** | ^5.3.2 | Type safety |
| **MongoDB** | 7.0 | Document database |
| **Redis** | 7.2-alpine | Caching and sessions |

### Docker & Infrastructure
| Technology | Version | Purpose |
|------------|---------|---------|
| **Docker** | Latest | Containerization |
| **Docker Compose** | Latest | Container orchestration |
| **Nginx** | Alpine | Reverse proxy and load balancer |
| **Prometheus** | Latest | Metrics collection |
| **Grafana** | Latest | Metrics visualization |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **JWT** | ^9.0.2 | Authentication |
| **Joi** | ^17.11.0 | Validation |
| **Winston** | ^3.11.0 | Logging |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **Jest** | ^29.7.0 | Testing |

## 🐳 Docker Configuration

### Multi-stage Production Build

The production Dockerfile uses multi-stage builds for optimization:

1. **Base Stage**: Node.js Alpine image
2. **Dependencies Stage**: Install production dependencies only
3. **Builder Stage**: Build the TypeScript application
4. **Runner Stage**: Create minimal production image

### Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| **Image Size** | Larger (includes dev dependencies) | Smaller (production only) |
| **Build Time** | Faster (no compilation) | Slower (full build) |
| **Hot Reload** | Yes (volume mounting) | No |
| **Security** | Basic | Enhanced (non-root user) |
| **Monitoring** | Basic | Full (Prometheus + Grafana) |

### Container Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │   Node.js App  │    │    MongoDB      │
│   (Port 80/443) │────│   (Port 3000)  │────│   (Port 27017) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Prometheus   │    │     Redis       │    │     Grafana     │
│   (Port 9090)   │    │   (Port 6379)   │    │   (Port 3001)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database Configuration
MONGODB_URI=mongodb://mongodb:27017/docker_node_prod
MONGODB_USER=admin
MONGODB_PASSWORD=secure_password

# Redis Configuration
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=secure_redis_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# CORS Configuration
CORS_ORIGIN=https://your-domain.com
CORS_CREDENTIALS=true

# Session Configuration
SESSION_SECRET=your-session-secret-change-this-in-production
SESSION_COOKIE_MAX_AGE=86400000

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Frontend URL
FRONTEND_URL=https://your-domain.com

# SSL Configuration (for production)
SSL_CERT_PATH=/etc/nginx/ssl/cert.pem
SSL_KEY_PATH=/etc/nginx/ssl/key.pem

# Monitoring
PROMETHEUS_ENABLED=true
GRAFANA_ENABLED=true
```

## 🔄 Development Workflow

### Local Development

1. **Start Development Environment**:
   ```bash
   npm run docker:dev
   ```

2. **View Logs**:
   ```bash
   npm run docker:logs
   ```

3. **Stop Environment**:
   ```bash
   npm run docker:down
   ```

### Development Features

- **Hot Reload**: Code changes automatically restart the container
- **Volume Mounting**: Source code is mounted for instant updates
- **Database Persistence**: MongoDB data persists between restarts
- **Redis Caching**: Session and cache data persists
- **Nginx Proxy**: Load balancing and SSL termination

## 🚀 Production Deployment

### 1. Prepare Production Environment

```bash
# Build production image
npm run docker:build

# Start production environment
npm run docker:prod
```

### 2. SSL Certificate Setup

For production, you'll need SSL certificates:

```bash
# Create SSL directory
mkdir -p nginx/ssl

# Generate self-signed certificate (for testing)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem

# For production, use Let's Encrypt or your CA
```

### 3. Domain Configuration

Update the Nginx configuration with your domain:

```nginx
# nginx/nginx.prod.conf
server_name your-domain.com www.your-domain.com;
```

### 4. Production Checklist

- [ ] Update environment variables
- [ ] Configure SSL certificates
- [ ] Set up domain DNS
- [ ] Configure firewall rules
- [ ] Set up monitoring alerts
- [ ] Configure backup strategy
- [ ] Test health checks
- [ ] Verify security headers

## 📊 Monitoring

### Prometheus Metrics

The application exposes metrics for:

- **HTTP Requests**: Request count, duration, status codes
- **Database**: Connection pool, query performance
- **Redis**: Cache hit/miss ratios, memory usage
- **System**: CPU, memory, disk usage

### Grafana Dashboards

Pre-configured dashboards for:

- **Application Performance**: Response times, error rates
- **Infrastructure**: CPU, memory, disk usage
- **Database**: Query performance, connection metrics
- **Business Metrics**: User activity, feature usage

### Health Checks

- **Application Health**: `/health` endpoint
- **Database Health**: MongoDB connection status
- **Redis Health**: Redis connection status
- **Container Health**: Docker health checks

## 🎨 Customization

### Adding New Services

1. **Update docker-compose.yml**:
   ```yaml
   services:
     new-service:
       image: new-service:latest
       ports:
         - "8080:8080"
       networks:
         - app-network
   ```

2. **Update Nginx Configuration**:
   ```nginx
   location /new-service/ {
       proxy_pass http://new-service:8080;
   }
   ```

### Custom Monitoring

1. **Add Custom Metrics**:
   ```typescript
   // src/utils/metrics.ts
   import { register, Counter } from 'prom-client'
   
   const customCounter = new Counter({
     name: 'custom_metric_total',
     help: 'Custom metric description',
   })
   
   register.registerMetric(customCounter)
   ```

2. **Update Prometheus Configuration**:
   ```yaml
   # monitoring/prometheus.yml
   scrape_configs:
     - job_name: 'custom-metrics'
       static_configs:
         - targets: ['app:3000']
   ```

### Environment-specific Configuration

Create environment-specific files:

- `docker-compose.staging.yml` - Staging environment
- `docker-compose.test.yml` - Testing environment
- `nginx/nginx.staging.conf` - Staging Nginx config

## 🎯 Sample Use Cases

### 1. **Microservices Architecture**
- Deploy multiple Node.js services
- Service discovery and communication
- Centralized logging and monitoring
- Load balancing across services

### 2. **E-commerce Platform**
- Product catalog service
- User management service
- Payment processing service
- Order management service

### 3. **SaaS Application**
- Multi-tenant architecture
- Subscription management
- Usage tracking and billing
- Customer portal

### 4. **API Gateway**
- Centralized API management
- Rate limiting and authentication
- Request/response transformation
- Analytics and monitoring

### 5. **Content Management System**
- Content creation and management
- Media storage and processing
- User roles and permissions
- Publishing workflow

### 6. **Real-time Application**
- WebSocket connections
- Real-time notifications
- Live data synchronization
- Chat and collaboration features

## 📜 Available Scripts

### Docker Commands
| Script | Command | Description |
|--------|---------|-------------|
| **Docker Build** | `npm run docker:build` | Build production Docker image |
| **Docker Run** | `npm run docker:run` | Run container locally |
| **Docker Dev** | `npm run docker:dev` | Start development environment |
| **Docker Prod** | `npm run docker:prod` | Start production environment |
| **Docker Down** | `npm run docker:down` | Stop all containers |
| **Docker Logs** | `npm run docker:logs` | View container logs |
| **Docker Clean** | `npm run docker:clean` | Clean up Docker resources |

### Development Commands
| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start development server |
| **Build** | `npm run build` | Build TypeScript to JavaScript |
| **Start** | `npm start` | Start production server |
| **Lint** | `npm run lint` | Run ESLint |
| **Test** | `npm test` | Run tests |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |

## 🔧 Troubleshooting

### Common Issues

**Q: Container won't start**
```bash
# Check container logs
docker-compose logs app

# Check if ports are available
netstat -tulpn | grep :3000
```

**Q: Database connection failed**
```bash
# Check MongoDB container
docker-compose logs mongodb

# Verify connection string
echo $MONGODB_URI
```

**Q: Nginx proxy errors**
```bash
# Check Nginx logs
docker-compose logs nginx

# Test upstream connection
docker-compose exec nginx ping app
```

**Q: SSL certificate issues**
```bash
# Check certificate validity
openssl x509 -in nginx/ssl/cert.pem -text -noout

# Verify certificate chain
openssl verify -CAfile nginx/ssl/cert.pem nginx/ssl/cert.pem
```

**Q: Memory issues**
```bash
# Check container memory usage
docker stats

# Adjust memory limits in docker-compose.yml
deploy:
  resources:
    limits:
      memory: 1G
```

### Performance Optimization

1. **Image Optimization**:
   - Use multi-stage builds
   - Minimize layers
   - Use Alpine images
   - Remove unnecessary files

2. **Container Optimization**:
   - Set resource limits
   - Use health checks
   - Implement proper logging
   - Configure restart policies

3. **Network Optimization**:
   - Use custom networks
   - Optimize Nginx configuration
   - Enable HTTP/2
   - Configure proper timeouts

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 78+
- ✅ Safari 14+
- ✅ Edge 88+

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
5. Refer to [Docker Documentation](https://docs.docker.com/)

---

**Happy Containerizing! 🐳**

This Dockerized Node app boilerplate provides a solid foundation for building production-ready containerized applications. Customize it to match your project requirements and deploy with confidence!
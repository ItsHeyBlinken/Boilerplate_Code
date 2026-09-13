# ⚡ Serverless Functions Boilerplate

A collection of serverless function templates for AWS Lambda, Vercel, and Netlify. Perfect for building scalable, cost-effective serverless APIs and microservices.


## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm install`
3. Copy `.env.example` → `.env` if present and set any secrets your handlers need
4. Pick a target platform (Vercel, Netlify, or AWS) and follow that folder’s deploy notes
5. Test handlers locally with the platform CLI or README scripts
6. Deploy and configure environment variables in the host dashboard

Do not commit real API keys or passwords. Treat `.env` as local-only.

## 📋 Table of Contents

- [Features](#features)
- [Why Serverless?](#why-serverless)
- [Use Cases](#use-cases)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Platform Support](#platform-support)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **⚡ Serverless**: No server management
- **💰 Cost-Effective**: Pay only for what you use
- **🚀 Scalable**: Auto-scales with traffic
- **📘 TypeScript**: Full type safety
- **🌐 Multi-Platform**: AWS Lambda, Vercel, Netlify
- **🔐 Secure**: Built-in security best practices
- **📊 Monitoring**: Ready for logging and monitoring
- **🔄 Stateless**: Stateless function design
- **⚡ Fast**: Cold start optimization
- **🔧 Easy Deploy**: One-command deployment

## 🎯 Why Serverless?

### Perfect For:
- **APIs**: RESTful APIs and GraphQL endpoints
- **Microservices**: Small, focused services
- **Event Processing**: Webhooks, scheduled tasks
- **Cost Optimization**: Pay per request
- **Auto-Scaling**: Handles traffic spikes
- **No Infrastructure**: No server management

### Key Advantages:
- **Cost-Effective**: Pay only for execution time
- **Auto-Scaling**: Handles any traffic volume
- **No Maintenance**: No server management
- **Fast Deployment**: Deploy in seconds
- **Global**: Deploy to edge locations
- **Event-Driven**: Triggered by events

## 🎯 Use Cases

### 1. **API Endpoints**
- RESTful APIs
- GraphQL endpoints
- Webhook handlers
- Authentication APIs

### 2. **Event Processing**
- Webhook processing
- Scheduled tasks (cron jobs)
- Queue processing
- File processing

### 3. **Microservices**
- Small, focused services
- Service-to-service communication
- API gateways
- Backend for frontend (BFF)

### 4. **Cost-Sensitive Applications**
- Low-traffic applications
- Sporadic usage patterns
- Startups and MVPs
- Cost optimization

### 5. **Edge Functions**
- CDN edge functions
- Request transformation
- A/B testing
- Personalization

### 6. **Scheduled Tasks**
- Data synchronization
- Report generation
- Cleanup tasks
- Monitoring and alerts

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn** or **pnpm**
- **Vercel CLI** (for Vercel deployment)
- **AWS CLI** (for AWS Lambda deployment)
- **Netlify CLI** (for Netlify deployment)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd boilerplate-library/serverless-functions
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Development Server (Vercel)

```bash
npm run dev
```

### 4. Deploy

```bash
# Deploy to Vercel
npm run deploy

# Deploy to production
npm run deploy:prod
```

## 📁 Project Structure

```
serverless-functions/
├── api/                      # API routes (Vercel/Netlify)
│   ├── hello.ts              # Example function
│   ├── users/
│   │   └── [id].ts          # Dynamic route
│   └── ...
├── functions/                # AWS Lambda functions
│   ├── hello/
│   │   ├── index.ts
│   │   └── handler.ts
│   └── ...
├── vercel.json               # Vercel configuration
├── netlify.toml              # Netlify configuration
├── serverless.yml            # AWS Serverless Framework config
├── .env.example              # Environment variables template
└── package.json              # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | ^5.3.2 | Type safety |
| **Vercel** | ^33.0.1 | Serverless platform |
| **AWS Lambda** | - | Serverless compute |
| **Netlify** | - | Serverless platform |

## 🌐 Platform Support

### Vercel Functions

```typescript
// api/hello.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.status(200).json({ message: 'Hello from Vercel!' });
}
```

### AWS Lambda

```typescript
// functions/hello/handler.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' }),
  };
};
```

### Netlify Functions

```typescript
// netlify/functions/hello.ts
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' }),
  };
};
```

## 🔧 Environment Variables

Create a `.env` file:

```bash
# API Keys
API_KEY=your-api-key

# Database
DATABASE_URL=your-database-url

# External Services
STRIPE_SECRET_KEY=your-stripe-key
```

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start local dev server |
| **Build** | `npm run build` | Build TypeScript |
| **Deploy** | `npm run deploy` | Deploy to Vercel |
| **Deploy Prod** | `npm run deploy:prod` | Deploy to production |
| **Test** | `npm test` | Run tests |
| **Lint** | `npm run lint` | Run ESLint |

## 🚀 Deployment

### Vercel

```bash
npm run deploy
```

### AWS Lambda

```bash
serverless deploy
```

### Netlify

```bash
netlify deploy
```

## 🔧 Troubleshooting

### Common Issues

**Q: Cold start delays**
- Optimize bundle size
- Use connection pooling
- Minimize dependencies

**Q: Timeout errors**
- Increase timeout limit
- Optimize function code
- Use async processing

**Q: Environment variables not available**
- Check platform-specific config
- Verify variable names
- Ensure deployment includes env vars

## 📚 Learning Resources

- [Vercel Functions Docs](https://vercel.com/docs/functions)
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License

---

**Happy Coding with Serverless! ⚡**

This boilerplate provides templates for building serverless functions across multiple platforms, enabling cost-effective and scalable APIs.


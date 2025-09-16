# 💳 Stripe Integration Boilerplate

A comprehensive Stripe payment integration with Express.js, MongoDB, and TypeScript. Features complete payment processing, subscription management, webhook handling, and modern development practices. Perfect for building e-commerce platforms, SaaS applications, and any application requiring payment processing.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Stripe Integration](#stripe-integration)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Payment Flows](#payment-flows)
- [Subscription Management](#subscription-management)
- [Webhook Handling](#webhook-handling)
- [Environment Variables](#environment-variables)
- [Customization](#customization)
- [Sample Use Cases](#sample-use-cases)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

### Payment Processing
- **💳 One-time Payments**: Complete payment intent flow
- **🔄 Subscription Payments**: Recurring billing management
- **💸 Refunds**: Automated and manual refund processing
- **📊 Payment History**: Complete transaction tracking
- **🔒 Security**: PCI-compliant payment handling

### Stripe Integration
- **🎯 Payment Intents**: Modern payment processing
- **👥 Customer Management**: Stripe customer creation and management
- **📋 Product Management**: Stripe product and price creation
- **🔄 Webhooks**: Real-time event handling
- **📱 Multiple Payment Methods**: Cards, digital wallets, bank transfers
- **🌍 Multi-currency**: Support for multiple currencies

### Backend Features
- **⚡ Express.js**: Fast, scalable web framework
- **📘 TypeScript**: Full type safety and better DX
- **🗄️ MongoDB**: NoSQL database with Mongoose ODM
- **🔐 JWT Authentication**: Secure token-based authentication
- **📝 Input Validation**: Joi schema validation
- **🛡️ Security**: Helmet, CORS, rate limiting
- **📊 Logging**: Winston logging system
- **🔄 Error Handling**: Comprehensive error management

### Development Features
- **🧪 Testing**: Jest testing framework setup
- **📚 API Documentation**: Built-in endpoint documentation
- **🔧 Environment Configuration**: Flexible environment setup
- **📝 Type Safety**: Full TypeScript integration
- **🔄 Hot Reload**: Development server with nodemon

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (v6+ recommended)
- **Stripe Account** (Test and Live keys)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Copy the boilerplate to your project directory
cp -r ./stripe-integration ../my-stripe-app
cd ../my-stripe-app

# Install dependencies
npm install
```

### 2. Stripe Setup

1. **Create Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **Get API Keys**: From Stripe Dashboard → Developers → API keys
3. **Set up Webhooks**: Configure webhook endpoints in Stripe Dashboard

### 3. Environment Setup

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Database Setup

```bash
# Make sure MongoDB is running
sudo systemctl start mongodb

# The application will create the database automatically
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Test Stripe Integration

```bash
# Health check
curl http://localhost:3001/health

# API documentation
curl http://localhost:3001/api-docs

# Test webhook (in another terminal)
npm run stripe:listen
```

## 📁 Project Structure

```
stripe-integration/
├── src/
│   ├── config/               # Configuration files
│   │   ├── database.ts       # MongoDB connection
│   │   └── stripe.ts         # Stripe configuration
│   ├── controllers/          # Route controllers
│   │   ├── AuthController.ts
│   │   ├── UserController.ts
│   │   ├── ProductController.ts
│   │   ├── PaymentController.ts
│   │   ├── SubscriptionController.ts
│   │   └── WebhookController.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts           # Authentication middleware
│   │   ├── errorHandler.ts    # Error handling
│   │   ├── notFoundHandler.ts
│   │   └── validation.ts     # Input validation
│   ├── models/               # MongoDB models
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Payment.ts
│   │   └── Subscription.ts
│   ├── routes/               # API routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── products.ts
│   │   ├── payments.ts
│   │   ├── subscriptions.ts
│   │   ├── webhooks.ts
│   │   └── health.ts
│   ├── services/             # Business logic services
│   │   ├── PaymentService.ts
│   │   ├── SubscriptionService.ts
│   │   └── WebhookService.ts
│   ├── utils/                # Utility functions
│   │   ├── logger.ts
│   │   ├── jwt.ts
│   │   └── password.ts
│   └── index.ts              # Application entry point
├── .env.example              # Environment variables template
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime |
| **Express.js** | ^4.18.2 | Web framework |
| **TypeScript** | ^5.3.2 | Type safety |
| **MongoDB** | - | NoSQL database |
| **Mongoose** | ^8.0.3 | MongoDB ODM |
| **Stripe** | ^14.7.0 | Payment processing |
| **JWT** | ^9.0.2 | Authentication |
| **Joi** | ^17.11.0 | Validation |
| **Winston** | ^3.11.0 | Logging |
| **bcryptjs** | ^2.4.3 | Password hashing |

## 💳 Stripe Integration

### Stripe Configuration

The application includes comprehensive Stripe integration with:

- **Payment Intents**: Modern payment processing
- **Customers**: Customer management and billing
- **Products & Prices**: Product catalog management
- **Subscriptions**: Recurring billing
- **Webhooks**: Real-time event handling
- **Refunds**: Payment reversal processing

### Supported Payment Methods

- **Credit/Debit Cards**: Visa, Mastercard, American Express
- **Digital Wallets**: Apple Pay, Google Pay, PayPal
- **Bank Transfers**: ACH, SEPA, Wire transfers
- **Buy Now, Pay Later**: Klarna, Afterpay (where available)

### Webhook Events Handled

- `payment_intent.succeeded` - Payment completed
- `payment_intent.payment_failed` - Payment failed
- `customer.subscription.created` - Subscription created
- `customer.subscription.updated` - Subscription updated
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Subscription payment succeeded
- `invoice.payment_failed` - Subscription payment failed
- `charge.dispute.created` - Chargeback/dispute created

## 🗄️ Database Models

### User Model
```typescript
interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  stripeCustomerId?: string
  // ... other fields
}
```

### Product Model
```typescript
interface IProduct {
  name: string
  description: string
  price: number
  currency: string
  stripeProductId?: string
  stripePriceId?: string
  images: string[]
  category: string
  isActive: boolean
  isDigital: boolean
  // ... other fields
}
```

### Payment Model
```typescript
interface IPayment {
  user: ObjectId
  product?: ObjectId
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'refunded'
  stripePaymentIntentId: string
  stripeChargeId?: string
  paymentMethod: string
  // ... other fields
}
```

### Subscription Model
```typescript
interface ISubscription {
  user: ObjectId
  stripeSubscriptionId: string
  stripeCustomerId: string
  stripePriceId: string
  status: 'incomplete' | 'trialing' | 'active' | 'past_due' | 'canceled'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  // ... other fields
}
```

## 🛣️ API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/logout` | Logout user | Yes |
| GET | `/api/v1/auth/me` | Get current user profile | Yes |

### Product Endpoints
| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/v1/products` | Get all products | No | - |
| GET | `/api/v1/products/:id` | Get product by ID | No | - |
| POST | `/api/v1/products` | Create new product | Yes | Admin |
| PUT | `/api/v1/products/:id` | Update product | Yes | Admin |
| DELETE | `/api/v1/products/:id` | Delete product | Yes | Admin |

### Payment Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/payments/create-payment-intent` | Create payment intent | Yes |
| POST | `/api/v1/payments/confirm-payment` | Confirm payment | Yes |
| GET | `/api/v1/payments/history` | Get payment history | Yes |
| POST | `/api/v1/payments/refund` | Create refund | Yes |

### Subscription Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/subscriptions/create` | Create subscription | Yes |
| GET | `/api/v1/subscriptions` | Get user subscriptions | Yes |
| PUT | `/api/v1/subscriptions/:id/cancel` | Cancel subscription | Yes |
| POST | `/api/v1/subscriptions/:id/resume` | Resume subscription | Yes |
| GET | `/api/v1/subscriptions/plans` | Get subscription plans | No |

### Webhook Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/webhooks/stripe` | Stripe webhook endpoint |

## 💰 Payment Flows

### One-time Payment Flow

1. **Create Payment Intent**:
   ```bash
   POST /api/v1/payments/create-payment-intent
   {
     "productId": "product_id",
     "amount": 29.99,
     "currency": "usd"
   }
   ```

2. **Client-side Payment**:
   ```javascript
   const { clientSecret } = await createPaymentIntent(data)
   
   const { error } = await stripe.confirmPayment({
     elements,
     confirmParams: {
       return_url: 'https://your-site.com/payment/success',
     },
   })
   ```

3. **Webhook Confirmation**:
   - Stripe sends `payment_intent.succeeded` webhook
   - Server updates payment status
   - User receives confirmation

### Subscription Payment Flow

1. **Create Subscription**:
   ```bash
   POST /api/v1/subscriptions/create
   {
     "priceId": "price_stripe_id",
     "paymentMethodId": "pm_stripe_id"
   }
   ```

2. **Subscription Management**:
   - Automatic recurring billing
   - Webhook notifications for status changes
   - Customer portal for self-service

## 🔄 Subscription Management

### Subscription Lifecycle

1. **Creation**: User subscribes to a plan
2. **Active**: Regular billing and service access
3. **Past Due**: Payment failed, grace period
4. **Cancelled**: Subscription ended
5. **Resumed**: Reactivated subscription

### Subscription Features

- **Trial Periods**: Free trial support
- **Proration**: Automatic prorated billing
- **Upgrades/Downgrades**: Plan changes
- **Cancellation**: Immediate or end-of-period
- **Customer Portal**: Self-service management

## 🔗 Webhook Handling

### Webhook Security

- **Signature Verification**: Stripe signature validation
- **Idempotency**: Duplicate event handling
- **Error Handling**: Failed webhook retry logic

### Webhook Processing

```typescript
// Example webhook handler
app.post('/api/v1/webhooks/stripe', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature']
  const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      handlePaymentSuccess(event.data.object)
      break
    case 'customer.subscription.updated':
      handleSubscriptionUpdate(event.data.object)
      break
    // ... other event types
  }
  
  res.json({received: true})
})
```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/stripe_integration_db

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# Frontend URL (for redirects)
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

## 🎨 Customization

### Adding New Payment Methods

1. **Update Stripe Configuration**:
   ```typescript
   // src/config/stripe.ts
   export const createPaymentIntent = async (amount: number, paymentMethodTypes: string[]) => {
     return stripe.paymentIntents.create({
       amount: Math.round(amount * 100),
       currency: 'usd',
       payment_method_types: paymentMethodTypes,
       // ... other options
     })
   }
   ```

2. **Update Frontend**:
   ```javascript
   // Add new payment method to Stripe Elements
   const elements = stripe.elements({
     clientSecret,
     appearance: {
       theme: 'stripe',
     },
   })
   ```

### Adding New Subscription Plans

1. **Create Stripe Products**:
   ```bash
   # Using Stripe CLI
   stripe products create --name "Pro Plan" --description "Professional features"
   stripe prices create --product prod_xxx --unit-amount 2999 --currency usd --recurring interval=month
   ```

2. **Update Database**:
   ```typescript
   // Add new subscription plan to database
   const plan = await SubscriptionPlan.create({
     name: 'Pro Plan',
     stripePriceId: 'price_xxx',
     amount: 29.99,
     interval: 'month',
     features: ['Feature 1', 'Feature 2']
   })
   ```

### Custom Webhook Events

1. **Add Event Handler**:
   ```typescript
   // src/services/WebhookService.ts
   export const handleCustomEvent = async (event: Stripe.Event) => {
     switch (event.type) {
       case 'custom.event.type':
         await processCustomEvent(event.data.object)
         break
     }
   }
   ```

2. **Register Webhook**:
   ```bash
   # In Stripe Dashboard
   # Add new webhook endpoint with custom event types
   ```

## 🎯 Sample Use Cases

### 1. **E-commerce Platform**
- Product catalog with Stripe products
- Shopping cart and checkout flow
- Order management and fulfillment
- Refund and return processing

### 2. **SaaS Application**
- Subscription-based pricing tiers
- Usage-based billing
- Customer portal for self-service
- Analytics and reporting

### 3. **Digital Marketplace**
- Digital product sales
- Instant delivery after payment
- Seller commission management
- Multi-vendor support

### 4. **Membership Site**
- Recurring membership fees
- Access control based on subscription
- Member management and communication
- Content gating

### 5. **Online Course Platform**
- Course sales and enrollment
- Subscription-based access
- Progress tracking and certificates
- Instructor payouts

### 6. **Donation Platform**
- One-time and recurring donations
- Campaign management
- Donor management
- Tax receipt generation

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server with nodemon |
| **Build** | `npm run build` | Compile TypeScript to JavaScript |
| **Start** | `npm start` | Start production server |
| **Lint** | `npm run lint` | Run ESLint |
| **Lint Fix** | `npm run lint:fix` | Fix ESLint errors |
| **Test** | `npm test` | Run tests |
| **Test Watch** | `npm run test:watch` | Run tests in watch mode |
| **Test Coverage** | `npm run test:coverage` | Run tests with coverage |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |
| **Stripe Listen** | `npm run stripe:listen` | Listen to Stripe webhooks locally |

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

```typescript
// tests/payment.test.ts
import request from 'supertest'
import app from '../src/index'

describe('Payment Endpoints', () => {
  test('POST /api/v1/payments/create-payment-intent should create payment intent', async () => {
    const response = await request(app)
      .post('/api/v1/payments/create-payment-intent')
      .set('Authorization', 'Bearer valid-token')
      .send({
        productId: 'product_id',
        amount: 29.99,
        currency: 'usd'
      })

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.data.clientSecret).toBeDefined()
  })
})
```

### Stripe Testing

Use Stripe test cards for testing:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- **Requires Authentication**: `4000 0027 6000 3184`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to VPS

1. **Set up your server**:
   ```bash
   # Install Node.js and MongoDB
   sudo apt update
   sudo apt install nodejs npm mongodb
   ```

2. **Configure Stripe Webhooks**:
   - Add production webhook endpoint in Stripe Dashboard
   - Use production API keys
   - Test webhook delivery

3. **Deploy your application**:
   ```bash
   # Upload your code
   scp -r . user@your-server:/var/www/your-stripe-app
   
   # Install dependencies
   cd /var/www/your-stripe-app
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with production values
   
   # Build and start
   npm run build
   npm start
   ```

4. **Configure PM2** (Process Manager):
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name "stripe-app"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Environment Variables for Production

```bash
# Production .env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://localhost:27017/production_db
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret
CORS_ORIGIN=https://your-domain.com
FRONTEND_URL=https://your-domain.com
```

## 🔧 Troubleshooting

### Common Issues

**Q: Stripe webhook not receiving events**
```bash
# Check webhook endpoint URL
# Verify webhook secret
# Test with Stripe CLI
stripe listen --forward-to localhost:3001/api/v1/webhooks/stripe
```

**Q: Payment intent creation fails**
- Verify Stripe API keys are correct
- Check amount is in correct format (cents)
- Ensure currency is supported

**Q: Webhook signature verification fails**
- Verify webhook secret matches Stripe Dashboard
- Check request body is raw (not parsed JSON)
- Ensure correct webhook endpoint URL

**Q: Database connection failed**
```bash
# Check MongoDB is running
sudo systemctl status mongodb

# Check connection
mongo --host localhost --port 27017
```

**Q: CORS errors**
- Verify `CORS_ORIGIN` matches frontend URL
- Check that frontend is making requests to correct API URL

### Stripe Dashboard Issues

1. **Test vs Live Mode**: Ensure using correct API keys
2. **Webhook Endpoints**: Verify endpoints are active and receiving events
3. **API Version**: Check API version compatibility
4. **Rate Limits**: Monitor API usage and limits

### Performance Tips

1. **Database Optimization**:
   - Add MongoDB indexes
   - Use connection pooling
   - Optimize queries

2. **Stripe Optimization**:
   - Use webhooks instead of polling
   - Implement proper error handling
   - Cache frequently accessed data

3. **Security**:
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs
   - Secure webhook endpoints

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
5. Refer to [Stripe Documentation](https://stripe.com/docs)

---

**Happy Coding! 🎉**

This Stripe integration boilerplate provides a solid foundation for building payment-enabled applications. Customize it to match your project requirements and start processing payments like a pro!
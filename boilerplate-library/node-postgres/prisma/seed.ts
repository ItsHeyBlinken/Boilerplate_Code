import { PrismaClient, Role, PostStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const hashedAdminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedAdminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      bio: 'System administrator',
    },
  })

  // Create moderator user
  const hashedModeratorPassword = await bcrypt.hash('moderator123', 12)
  
  const moderator = await prisma.user.upsert({
    where: { email: 'moderator@example.com' },
    update: {},
    create: {
      email: 'moderator@example.com',
      password: hashedModeratorPassword,
      firstName: 'Moderator',
      lastName: 'User',
      role: Role.MODERATOR,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      bio: 'Content moderator',
    },
  })

  // Create regular users
  const hashedUserPassword = await bcrypt.hash('user123', 12)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      password: hashedUserPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: Role.USER,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      bio: 'Software developer passionate about web technologies',
      website: 'https://johndoe.dev',
      location: 'San Francisco, CA',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      password: hashedUserPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: Role.USER,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      bio: 'UI/UX designer with a love for beautiful interfaces',
      location: 'New York, NY',
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: 'Technology',
        slug: 'technology',
        description: 'Articles about technology, programming, and software development',
        color: '#3B82F6',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'design' },
      update: {},
      create: {
        name: 'Design',
        slug: 'design',
        description: 'UI/UX design, graphic design, and visual arts',
        color: '#F59E0B',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business' },
      update: {},
      create: {
        name: 'Business',
        slug: 'business',
        description: 'Business strategies, entrepreneurship, and management',
        color: '#10B981',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'lifestyle' },
      update: {},
      create: {
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Personal development, health, and lifestyle tips',
        color: '#8B5CF6',
      },
    }),
  ])

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'javascript' },
      update: {},
      create: {
        name: 'JavaScript',
        slug: 'javascript',
        description: 'JavaScript programming language',
        color: '#F7DF1E',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'react' },
      update: {},
      create: {
        name: 'React',
        slug: 'react',
        description: 'React JavaScript library',
        color: '#61DAFB',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: {
        name: 'TypeScript',
        slug: 'typescript',
        description: 'TypeScript programming language',
        color: '#3178C6',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'nodejs' },
      update: {},
      create: {
        name: 'Node.js',
        slug: 'nodejs',
        description: 'Node.js runtime environment',
        color: '#339933',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'ui-design' },
      update: {},
      create: {
        name: 'UI Design',
        slug: 'ui-design',
        description: 'User interface design',
        color: '#FF6B6B',
      },
    }),
  ])

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'Getting Started with Node.js and Prisma',
        content: `# Getting Started with Node.js and Prisma

Node.js is a powerful JavaScript runtime that allows you to build scalable server-side applications. When combined with Prisma, a modern database toolkit, you can create robust applications with type-safe database access.

## What is Prisma?

Prisma is a next-generation ORM that makes database access easy and type-safe. It provides:

- **Type-safe database client**: Auto-generated based on your schema
- **Database migrations**: Version control for your database schema
- **Query optimization**: Efficient database queries
- **Multi-database support**: Works with PostgreSQL, MySQL, SQLite, and more

## Setting Up Your First Project

1. **Install Prisma CLI**:
   \`\`\`bash
   npm install prisma @prisma/client
   \`\`\`

2. **Initialize Prisma**:
   \`\`\`bash
   npx prisma init
   \`\`\`

3. **Define your schema** in \`prisma/schema.prisma\`

4. **Generate the client**:
   \`\`\`bash
   npx prisma generate
   \`\`\`

## Example Schema

\`\`\`prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
\`\`\`

This is just the beginning of your journey with Node.js and Prisma. Happy coding!`,
        slug: 'getting-started-nodejs-prisma',
        excerpt: 'Learn how to build modern Node.js applications with Prisma ORM for type-safe database access.',
        status: PostStatus.PUBLISHED,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categories: {
          create: [
            { categoryId: categories[0].id }, // Technology
          ],
        },
        tags: {
          create: [
            { tagId: tags[0].id }, // JavaScript
            { tagId: tags[3].id }, // Node.js
          ],
        },
      },
    }),
    prisma.post.create({
      data: {
        title: 'Building Modern React Applications',
        content: `# Building Modern React Applications

React has revolutionized the way we build user interfaces. With its component-based architecture and powerful ecosystem, you can create dynamic and interactive web applications.

## Key React Concepts

### Components
Components are the building blocks of React applications. They are reusable pieces of UI that can accept props and manage their own state.

### Hooks
Hooks allow you to use state and other React features in functional components. Some popular hooks include:

- \`useState\`: Manage component state
- \`useEffect\`: Handle side effects
- \`useContext\`: Access context values
- \`useReducer\`: Manage complex state logic

### Virtual DOM
React uses a virtual DOM to optimize rendering performance. It creates a virtual representation of the DOM in memory and only updates the real DOM when necessary.

## Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for type safety**
3. **Implement proper error boundaries**
4. **Optimize performance with React.memo**
5. **Use proper state management patterns**

## Modern React Features

- **Concurrent Mode**: Better user experience with interruptible rendering
- **Suspense**: Declarative loading states
- **Server Components**: Render components on the server
- **Automatic Batching**: Improved performance

React continues to evolve, making it easier to build complex applications while maintaining good performance and developer experience.`,
        slug: 'building-modern-react-applications',
        excerpt: 'Explore the key concepts and best practices for building modern React applications.',
        status: PostStatus.PUBLISHED,
        isPublished: true,
        publishedAt: new Date(),
        authorId: user1.id,
        categories: {
          create: [
            { categoryId: categories[0].id }, // Technology
          ],
        },
        tags: {
          create: [
            { tagId: tags[0].id }, // JavaScript
            { tagId: tags[1].id }, // React
            { tagId: tags[2].id }, // TypeScript
          ],
        },
      },
    }),
    prisma.post.create({
      data: {
        title: 'The Art of UI Design',
        content: `# The Art of UI Design

User Interface (UI) design is the process of creating interfaces that are both functional and aesthetically pleasing. It's about understanding user needs and creating solutions that are intuitive and engaging.

## Principles of Good UI Design

### 1. Clarity
Your interface should be clear and easy to understand. Users should immediately know what they can do and how to do it.

### 2. Consistency
Consistent design patterns help users learn your interface faster. Use the same colors, fonts, and interaction patterns throughout your application.

### 3. Feedback
Provide immediate feedback for user actions. This can be through visual changes, animations, or messages.

### 4. Efficiency
Design for efficiency by reducing the number of steps required to complete common tasks.

## Design Systems

A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.

### Benefits of Design Systems:
- **Consistency**: Ensures a cohesive user experience
- **Efficiency**: Speeds up development time
- **Scalability**: Easy to maintain and update
- **Collaboration**: Better communication between teams

## Color Theory

Colors play a crucial role in UI design. They can:
- Convey emotions and feelings
- Guide user attention
- Create visual hierarchy
- Establish brand identity

### Color Psychology:
- **Blue**: Trust, stability, professionalism
- **Green**: Growth, harmony, nature
- **Red**: Energy, urgency, passion
- **Yellow**: Optimism, creativity, warmth

## Typography

Typography is the art and technique of arranging type to make written language legible, readable, and appealing.

### Key Typography Principles:
- **Hierarchy**: Use different sizes and weights to create visual hierarchy
- **Readability**: Choose fonts that are easy to read
- **Contrast**: Ensure sufficient contrast between text and background
- **Spacing**: Use proper line height and letter spacing

Great UI design is about creating experiences that users love. It requires a deep understanding of user needs, design principles, and technical constraints.`,
        slug: 'the-art-of-ui-design',
        excerpt: 'Learn the fundamental principles of UI design and how to create interfaces that users love.',
        status: PostStatus.PUBLISHED,
        isPublished: true,
        publishedAt: new Date(),
        authorId: user2.id,
        categories: {
          create: [
            { categoryId: categories[1].id }, // Design
          ],
        },
        tags: {
          create: [
            { tagId: tags[4].id }, // UI Design
          ],
        },
      },
    }),
    prisma.post.create({
      data: {
        title: 'Draft: Advanced TypeScript Patterns',
        content: `# Advanced TypeScript Patterns

This is a draft post about advanced TypeScript patterns. It will cover topics like:

- Generic constraints
- Conditional types
- Mapped types
- Template literal types
- Advanced utility types

More content coming soon...`,
        slug: 'draft-advanced-typescript-patterns',
        excerpt: 'A draft post about advanced TypeScript patterns and techniques.',
        status: PostStatus.DRAFT,
        isPublished: false,
        authorId: user1.id,
        categories: {
          create: [
            { categoryId: categories[0].id }, // Technology
          ],
        },
        tags: {
          create: [
            { tagId: tags[2].id }, // TypeScript
          ],
        },
      },
    }),
  ])

  // Create some sample comments
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Great article! This really helped me understand the basics of Prisma.',
        authorId: user1.id,
        postId: posts[0].id,
        isApproved: true,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Thanks for sharing this. Looking forward to more posts about Node.js!',
        authorId: user2.id,
        postId: posts[0].id,
        isApproved: true,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Excellent explanation of React concepts. Very helpful for beginners.',
        authorId: admin.id,
        postId: posts[1].id,
        isApproved: true,
      },
    }),
  ])

  // Create some sample likes
  await Promise.all([
    prisma.like.create({
      data: {
        userId: user1.id,
        postId: posts[0].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: user2.id,
        postId: posts[0].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: admin.id,
        postId: posts[1].id,
      },
    }),
  ])

  // Create some sample follows
  await Promise.all([
    prisma.follow.create({
      data: {
        followerId: user1.id,
        followingId: user2.id,
      },
    }),
    prisma.follow.create({
      data: {
        followerId: user2.id,
        followingId: user1.id,
      },
    }),
  ])

  console.log('✅ Database seeding completed!')
  console.log(`👤 Created users: ${admin.email}, ${moderator.email}, ${user1.email}, ${user2.email}`)
  console.log(`📝 Created ${posts.length} posts`)
  console.log(`🏷️ Created ${categories.length} categories and ${tags.length} tags`)
  console.log(`💬 Created sample comments and likes`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
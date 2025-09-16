# 🚀 Boilerplate Library PRD  

## 📌 Goal  
Create a **library of boilerplate code** for different project types to:  
- Save time when starting new projects  
- Learn common patterns and best practices  
- Provide consistent, GitHub-ready starting points  

---

## 📂 Boilerplates to Build  
1. **Static HTML/CSS/JS** → Landing pages, quick prototypes  
2. **React (Vite)** → Client-side app with routing + state placeholder  
3. **Next.js Starter** → Full-stack React with API routes + auth placeholder  
4. **Express.js API** → REST API with JWT auth, error handling, PostgreSQL  
5. **Node.js + PostgreSQL (Prisma)** → Database starter with migrations  
6. **MERN Starter** → MongoDB + Express + React + Node CRUD app  
7. **Stripe Integration** → Payment flow with checkout + webhook handler  
8. **Dockerized Node App** → Deployment-ready template  

---

## 📂 Standard Folder Structure  

Every boilerplate should follow a consistent pattern (adjust per stack):  

project-root/
│
├── src/ # Main source code
│ ├── routes/ # API or app routes
│ ├── controllers/ # Logic for routes
│ ├── models/ # Database models (if used)
│ ├── config/ # Config files (DB, auth, env)
│ ├── utils/ # Helper functions
│ ├── middlewares/ # Express/Next middlewares
│ └── index.js # App entry point
│
├── public/ # Static files
├── tests/ # Unit/integration tests
├── .env.example # Example environment variables
├── package.json # Dependencies
├── README.md # Setup instructions
└── Dockerfile # (If Dockerized)

---

## ⚡ Storage Setup  

- Create a GitHub repo called **`boilerplate-library`**  
- Each boilerplate in its own folder:  
  - `/html-css-js`  
  - `/react-vite`  
  - `/nextjs-starter`  
  - `/express-api`  
  - `/node-postgres`  
  - `/mern-starter`  
  - `/stripe-integration`  
  - `/docker-node`  
- Add a **top-level README** describing all included boilerplates.  

---

## 🔧 Usage Workflow  

When starting a new project:  
1. Clone **`boilerplate-library`**  
2. Copy the folder of the boilerplate you need  
3. Rename it to your project’s name  
4. Run setup steps from the `README.md`  
5. Start coding unique features  

---

## 💡 Example Use Cases  

- **Landing page project** → Start from `/html-css-js`  
- **Simple dashboard app** → Start from `/react-vite`  
- **Full-stack app with DB** → Start from `/nextjs-starter` or `/node-postgres`  
- **E-commerce checkout** → Start from `/stripe-integration`  
- **Deployable backend API** → Start from `/docker-node`  

---

## ✅ Progress Checklist  

- [ ] **Static HTML/CSS/JS**  
- [ ] **React (Vite)**  
- [ ] **Next.js Starter**  
- [ ] **Express.js API**  
- [ ] **Node.js + PostgreSQL (Prisma)**  
- [ ] **MERN Starter**  
- [ ] **Stripe Integration**  
- [ ] **Dockerized Node App**  


✅ This PRD gives you a **repeatable system**:  
- Cursor builds → You refine → Store in library → Reuse later  
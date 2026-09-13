# Realtime Socket.io (Lean Starter)

PostgreSQL + Prisma + Express + Socket.io + React chat starter: auth, rooms, persisted messages, and in-memory presence.

## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm run install-all`
3. Copy `server/.env.example` → `server/.env` and `client/.env.example` → `client/.env`
4. Set `DATABASE_URL` to your PostgreSQL instance
5. From `server/`, apply Prisma (`npx prisma migrate dev` or `db push`)
6. Run `npm run dev` from the project root
7. Open the client URL, register, create a room, and chat

Do not commit real API keys or passwords. Treat `.env` as local-only.

## Features

- JWT register / login / me (HTTP)
- Rooms list + create
- Message history per room (HTTP)
- Socket.io: `join_room`, `leave_room`, `chat_message` (persist then broadcast)
- In-memory online count via `room_presence`
- React + Vite + Tailwind + Zustand + socket.io-client

## Stack

| Layer | Tech |
|-------|------|
| Server | Express, Socket.io, Prisma, PostgreSQL |
| Client | Vite, React, Zustand, Tailwind |
| Auth | JWT (Bearer for HTTP + handshake.auth for sockets) |

## Out of scope (lean v1)

- Redis adapter / multi-instance scale-out
- Direct messages
- File uploads
- Typing indicators polish

## License

MIT

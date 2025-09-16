/**
 * Socket.io Real-time Communication Service
 * 
 * This module handles real-time communication for the CRM platform
 * using Socket.io for live updates and collaboration features.
 * 
 * Features:
 * - Real-time notifications
 * - Live activity updates
 * - Team collaboration features
 * - Deal and lead updates
 * - Task assignment notifications
 * - User presence tracking
 * - Room-based communication
 * - Event logging and monitoring
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import { Server as SocketIOServer, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { logger } from '../utils/logger'

interface AuthenticatedSocket extends Socket {
  user?: any
}

interface SocketRooms {
  [userId: string]: string[]
}

const connectedUsers: Map<string, string> = new Map() // userId -> socketId
const userRooms: SocketRooms = {}

export const socketHandler = (io: SocketIOServer) => {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1]
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'))
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      const user = await User.findById(decoded.id).select('-password')

      if (!user || !user.isActive) {
        return next(new Error('Authentication error: Invalid user'))
      }

      socket.user = user
      next()
    } catch (error) {
      logger.error('Socket authentication error:', error)
      next(new Error('Authentication error: Invalid token'))
    }
  })

  io.on('connection', (socket: AuthenticatedSocket) => {
    const userId = socket.user._id.toString()
    const userName = socket.user.getFullName()

    logger.info(`User ${userName} (${userId}) connected via socket`)

    // Store user connection
    connectedUsers.set(userId, socket.id)

    // Join user to their personal room
    socket.join(`user_${userId}`)

    // Join user to team room if they have a team
    if (socket.user.team) {
      socket.join(`team_${socket.user.team}`)
    }

    // Join user to department room if they have a department
    if (socket.user.department) {
      socket.join(`department_${socket.user.department}`)
    }

    // Broadcast user online status
    socket.broadcast.emit('user:online', {
      userId,
      userName,
      timestamp: new Date(),
    })

    // Handle joining specific rooms
    socket.on('join:room', (roomId: string) => {
      socket.join(roomId)
      logger.info(`User ${userName} joined room: ${roomId}`)
    })

    // Handle leaving specific rooms
    socket.on('leave:room', (roomId: string) => {
      socket.leave(roomId)
      logger.info(`User ${userName} left room: ${roomId}`)
    })

    // Handle activity updates
    socket.on('activity:create', (activityData: any) => {
      // Broadcast to relevant users
      socket.broadcast.emit('activity:new', {
        ...activityData,
        createdBy: {
          id: userId,
          name: userName,
        },
        timestamp: new Date(),
      })
    })

    // Handle deal updates
    socket.on('deal:update', (dealData: any) => {
      // Broadcast to team members and stakeholders
      socket.broadcast.emit('deal:updated', {
        ...dealData,
        updatedBy: {
          id: userId,
          name: userName,
        },
        timestamp: new Date(),
      })
    })

    // Handle lead updates
    socket.on('lead:update', (leadData: any) => {
      socket.broadcast.emit('lead:updated', {
        ...leadData,
        updatedBy: {
          id: userId,
          name: userName,
        },
        timestamp: new Date(),
      })
    })

    // Handle task assignments
    socket.on('task:assign', (taskData: any) => {
      const assigneeId = taskData.assignedTo
      if (assigneeId) {
        io.to(`user_${assigneeId}`).emit('task:assigned', {
          ...taskData,
          assignedBy: {
            id: userId,
            name: userName,
          },
          timestamp: new Date(),
        })
      }
    })

    // Handle contact updates
    socket.on('contact:update', (contactData: any) => {
      socket.broadcast.emit('contact:updated', {
        ...contactData,
        updatedBy: {
          id: userId,
          name: userName,
        },
        timestamp: new Date(),
      })
    })

    // Handle user typing indicators
    socket.on('typing:start', (data: any) => {
      socket.broadcast.to(data.roomId).emit('typing:start', {
        userId,
        userName,
        roomId: data.roomId,
      })
    })

    socket.on('typing:stop', (data: any) => {
      socket.broadcast.to(data.roomId).emit('typing:stop', {
        userId,
        userName,
        roomId: data.roomId,
      })
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      logger.info(`User ${userName} (${userId}) disconnected`)
      
      // Remove user from connected users
      connectedUsers.delete(userId)
      
      // Broadcast user offline status
      socket.broadcast.emit('user:offline', {
        userId,
        userName,
        timestamp: new Date(),
      })
    })

    // Handle errors
    socket.on('error', (error: Error) => {
      logger.error(`Socket error for user ${userName}:`, error)
    })
  })

  // Utility functions for server-side events
  const socketService = {
    // Send notification to specific user
    notifyUser: (userId: string, event: string, data: any) => {
      const socketId = connectedUsers.get(userId)
      if (socketId) {
        io.to(socketId).emit(event, data)
      }
    },

    // Send notification to team
    notifyTeam: (teamId: string, event: string, data: any) => {
      io.to(`team_${teamId}`).emit(event, data)
    },

    // Send notification to department
    notifyDepartment: (department: string, event: string, data: any) => {
      io.to(`department_${department}`).emit(event, data)
    },

    // Broadcast to all connected users
    broadcast: (event: string, data: any) => {
      io.emit(event, data)
    },

    // Get connected users count
    getConnectedUsersCount: () => {
      return connectedUsers.size
    },

    // Get connected users list
    getConnectedUsers: () => {
      return Array.from(connectedUsers.keys())
    },
  }

  return socketService
}
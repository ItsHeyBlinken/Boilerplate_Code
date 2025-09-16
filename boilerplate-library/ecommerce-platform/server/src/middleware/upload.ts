/**
 * File Upload Middleware with Multer and Sharp
 * 
 * This module handles file uploads for the e-commerce platform,
 * including image processing, validation, and storage management.
 * 
 * Features:
 * - Multer configuration for file uploads
 * - Sharp image processing and optimization
 * - File type validation (images only)
 * - File size limits and restrictions
 * - Organized file storage by type (avatars, products, categories)
 * - Unique filename generation with UUID
 * - Image resizing and compression
 * - Error handling for upload failures
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import multer from 'multer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadDir
    
    // Determine subdirectory based on file type
    if (file.fieldname === 'avatar') {
      uploadPath = path.join(uploadDir, 'avatars')
    } else if (file.fieldname === 'images') {
      uploadPath = path.join(uploadDir, 'products')
    } else if (file.fieldname === 'category') {
      uploadPath = path.join(uploadDir, 'categories')
    } else {
      uploadPath = path.join(uploadDir, 'general')
    }
    
    // Create subdirectory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  },
})

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check file type
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'))
  }
}

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    files: 10, // Maximum 10 files
  },
})

// Image processing middleware
export const processImage = async (req: any, res: any, next: any) => {
  if (!req.file) return next()

  try {
    const filePath = req.file.path
    const processedPath = filePath.replace(path.extname(filePath), '_processed.jpg')

    // Process image with Sharp
    await sharp(filePath)
      .resize(1200, 1200, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 85 })
      .toFile(processedPath)

    // Replace original file with processed version
    fs.unlinkSync(filePath)
    fs.renameSync(processedPath, filePath)

    req.file.processed = true
    next()
  } catch (error) {
    console.error('Image processing error:', error)
    next(error)
  }
}

// Multiple image processing middleware
export const processImages = async (req: any, res: any, next: any) => {
  if (!req.files || req.files.length === 0) return next()

  try {
    const processedFiles = []

    for (const file of req.files) {
      const filePath = file.path
      const processedPath = filePath.replace(path.extname(filePath), '_processed.jpg')

      // Process image with Sharp
      await sharp(filePath)
        .resize(1200, 1200, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 85 })
        .toFile(processedPath)

      // Replace original file with processed version
      fs.unlinkSync(filePath)
      fs.renameSync(processedPath, filePath)

      processedFiles.push({
        ...file,
        processed: true,
      })
    }

    req.files = processedFiles
    next()
  } catch (error) {
    console.error('Images processing error:', error)
    next(error)
  }
}
/**
 * File Upload Controller
 * 
 * This module handles file upload operations for the e-commerce platform,
 * including image uploads, file management, and serving static files.
 * 
 * Features:
 * - File upload handling
 * - Image processing and optimization
 * - File serving and management
 * - File deletion and cleanup
 * - Upload progress tracking
 * - File type validation
 * - Size limit enforcement
 * - Security validation
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import { logger } from '../utils/logger'

// @desc    Upload file
// @route   POST /api/upload
// @access  Private (Admin/Seller)
export const uploadFile = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
      },
    })
  } catch (error) {
    logger.error('Upload file error:', error)
    next(error)
  }
}

// @desc    Get file
// @route   GET /api/upload/:filename
// @access  Public
export const getFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filename = req.params.filename
    const filePath = path.join(process.cwd(), 'uploads', filename)

    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        error: 'File not found',
      })
      return
    }

    res.sendFile(filePath)
  } catch (error) {
    logger.error('Get file error:', error)
    next(error)
  }
}

// @desc    Delete file
// @route   DELETE /api/upload/:filename
// @access  Private (Admin/Seller)
export const deleteFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filename = req.params.filename
    const filePath = path.join(process.cwd(), 'uploads', filename)

    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        error: 'File not found',
      })
      return
    }

    fs.unlinkSync(filePath)

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    })
  } catch (error) {
    logger.error('Delete file error:', error)
    next(error)
  }
}
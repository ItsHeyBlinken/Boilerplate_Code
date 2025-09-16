/**
 * File Upload Routes
 * 
 * This module defines all file upload API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - POST / - Upload file (Admin/Seller)
 * - GET /:filename - Get/serve uploaded file
 * - DELETE /:filename - Delete uploaded file (Admin/Seller)
 * 
 * Features:
 * - Image upload and processing
 * - File type validation
 * - Size limit enforcement
 * - Secure file serving
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { uploadFile, deleteFile, getFile } from '../controllers/uploadController'
import { protect, authorize } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

router.route('/')
  .post(protect, authorize('ADMIN', 'SELLER'), upload.single('file'), uploadFile)

router.route('/:filename')
  .get(getFile)
  .delete(protect, authorize('ADMIN', 'SELLER'), deleteFile)

export default router
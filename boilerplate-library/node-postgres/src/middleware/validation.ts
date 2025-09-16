import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body)
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ')
      res.status(400).json({
        success: false,
        error: 'Validation error',
        message: errorMessage,
      })
      return
    }
    
    next()
  }
}

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query)
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ')
      res.status(400).json({
        success: false,
        error: 'Query validation error',
        message: errorMessage,
      })
      return
    }
    
    next()
  }
}

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params)
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ')
      res.status(400).json({
        success: false,
        error: 'Parameter validation error',
        message: errorMessage,
      })
      return
    }
    
    next()
  }
}
import { Response } from 'express';

export class ErrorHandler {
  static handle(error: unknown, res: Response, operation: string = 'operation'): void {
    console.error(`Error in ${operation}:`, error);
    
    if (error instanceof Error) {
      if (error.message.includes('API')) {
        res.status(503).json({
          error: 'External API temporarily unavailable',
          message: 'Please try again later'
        });
        return;
      }
      
      if (error.message.includes('validation')) {
        res.status(400).json({
          error: 'Validation error',
          message: error.message
        });
        return;
      }

      if (error.message.includes('not found')) {
        res.status(404).json({
          error: 'Resource not found',
          message: error.message
        });
        return;
      }
    }
    
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong'
    });
  }
}

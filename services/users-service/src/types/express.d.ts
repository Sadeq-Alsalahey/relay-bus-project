import 'express'

declare global {
  namespace Express {
    interface User {
      id: number
      role: 'ADMIN' | 'USER'
    }

    interface Request {
      user: User
    }
  }
}

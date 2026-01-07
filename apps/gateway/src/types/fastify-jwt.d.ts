import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: number
      role: 'ADMIN' | 'USER'
    }
    user: {
      sub: number
      role: 'ADMIN' | 'USER'
    }
  }
}

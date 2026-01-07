import { FastifyRequest, FastifyReply } from 'fastify'

type Role = 'ADMIN' | 'USER'

export function requireRole(roles: Role[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify()

      const { role } = req.user as { role: Role }

      if (!roles.includes(role)) {
        return reply.code(403).send({ message: 'Forbidden' })
      }
    } catch (err) {
      return reply.code(401).send({ message: 'Unauthorized' })
    }
  }
}

import { FastifyInstance } from 'fastify'
import { requireRole } from '../middlewares/roles.js'

export default async function proxyRoutes(
  fastify: FastifyInstance
) {
  fastify.register(require('@fastify/http-proxy'), {
    upstream: 'http://users-service:4001',
    prefix: '/v1/users',
    preHandler: requireRole(['ADMIN']),
  })
}

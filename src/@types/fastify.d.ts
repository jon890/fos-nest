import { User } from 'src/user/user.model';

declare module 'fastify' {
  export interface FastifyRequest {
    user: User;
  }
}

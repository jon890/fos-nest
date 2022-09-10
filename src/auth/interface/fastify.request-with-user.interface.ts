import { FastifyRequest } from 'fastify';

export type LoginUser = {
  email: string;
  nickname: string;
};
export interface FastifyRequestWithUser extends FastifyRequest {
  user: LoginUser;
}

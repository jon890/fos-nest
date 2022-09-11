import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  findById(id: bigint) {
    return this.userRepository.findById(id);
  }
}

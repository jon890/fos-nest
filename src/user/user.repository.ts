import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

export type CreateUserParam = {
  email: string;
  password: string;
  nickname?: string;
};

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  findById(id: bigint): Promise<User | null> {
    return this.userModel.findByPk(id.toString());
  }

  create({ email, password, nickname }: CreateUserParam) {
    return this.userModel.create({
      email,
      password,
      ...(nickname && { nickname }), // optional
    });
  }
}

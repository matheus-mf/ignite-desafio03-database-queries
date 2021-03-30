import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    return this.repository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.games", "game")
    .where("user.id = :user_id", { user_id })
    .getOne();
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.find(); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.find(); // Complete usando raw query
  }
}

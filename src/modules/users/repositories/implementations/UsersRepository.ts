import { getRepository, Repository } from 'typeorm';

import { IFindUserByFullNameDTO, IFindUserWithGamesDTO } from '../../dtos';
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
    return this.repository.findOne({
      where: { id: user_id },
      relations: [ 'games' ],
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.find({
      order: {
        first_name: 'ASC',
      },
    });
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[]> {
    return this.repository.createQueryBuilder('user').where(
      'user.first_name = INITCAP(:first_name) AND user.last_name = INITCAP(:last_name)',
      { first_name, last_name },
    ).getMany();
  }
}

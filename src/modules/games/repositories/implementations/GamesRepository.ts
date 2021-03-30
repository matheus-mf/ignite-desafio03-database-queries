import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository.find()
      // Complete usando query builder
  }

  countAllGames(): Promise<[ { count: string } ]> {
    return Promise.resolve([ { count: '' } ]);
  }

  findUsersByGameId(id: string): Promise<User[]> {
    return Promise.resolve([]);
  }
}

import { getRepository, Raw, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository.find({
      where: {
        title: Raw(() => `title ILIKE '%${ param }%'`),
      },
    });
  }

  async countAllGames(): Promise<[ { count: string } ]> {
    const count = await this.repository.count();
    return [ { count: String(count) } ];
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return Promise.resolve([]);
  }
}

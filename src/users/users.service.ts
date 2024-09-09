import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}
  async create(createDto: CreateUserDto) {
    const user = this.usersRepository.create(createDto);
    await this.usersRepository.save(user);

    //indexing the user in elastic
    await this.elasticsearchService.index({
      index: 'users',
      id: user._id,
      body: {
        name: user.name,
        email: user.email,
        created_at: user.created_at.toLocaleString(),
        updated_at: user.updated_at.toLocaleString(),
      },
    });

    return user;
  }

  async searchUser(query: string) {
    //search user by name in elastic
    const results = await this.elasticsearchService.search({
      index: 'users',
      body: { query: { match: { name: query } } },
    });

    return results.hits.hits.map((hit: any) => hit._source);
  }
}

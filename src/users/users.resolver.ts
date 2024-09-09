import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createDto') createDto: CreateUserDto) {
    return await this.usersService.create(createDto);
  }

  @Query(() => [User])
  async searchUser(@Args('query') query: string) {
    return await this.usersService.searchUser(query);
  }
}

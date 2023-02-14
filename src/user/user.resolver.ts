import { Inject, UseGuards } from '@nestjs/common'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql'

import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UpdateUserInput } from './dto/update-user.input'
import { FindOneUserInput } from './dto/findone-user.input'
import { Services } from '../utils/constants'
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { UserPayload } from 'src/auth/dto/payload-user.dto'
import { FollowUserArgs } from './dto/follow-user.input'

@Resolver(User)
export class UserResolver {
  constructor(
    @Inject(Services.USER) private readonly userService: UserService
  ) {}

  @Query(() => User, {
    name: 'FindOneUser',
    description: 'Get a user by args',
    nullable: true
  })
  async findOne(@Args('input') input: FindOneUserInput) {
    return await this.userService.findOne(input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, {
    name: 'UpdateUser',
    description: 'Update a user',
    nullable: true
  })
  async update(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() user: UserPayload
  ) {
    return await this.userService.update(user.id, input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, {
    name: 'RemoveUser',
    description: 'Remove a user',
    nullable: true
  })
  async remove(@CurrentUser() user: UserPayload) {
    return await this.userService.remove(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, {
    name: 'FollowUser',
    description: 'Follow a user',
    nullable: true
  })
  async follow(@Args() args: FollowUserArgs, @CurrentUser() user: UserPayload) {
    return await this.userService.follow(user.id, args.id)
  }

  @ResolveField(() => [User], {
    name: 'following',
    description: 'Get a user following',
    nullable: true
  })
  async following(@Parent() user: User) {
    return await this.userService.following(user.id)
  }

  @ResolveField(() => [User], {
    name: 'followers',
    description: 'Get a user followers',
    nullable: true
  })
  async followers(@Parent() user: User) {
    return await this.userService.followers(user.id)
  }
}

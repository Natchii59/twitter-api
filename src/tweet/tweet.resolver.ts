import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'

import { TweetService } from './tweet.service'
import { Tweet } from './entities/tweet.entity'
import { CreateTweetInput } from './dto/create-tweet.input'
import { CurrentUser, JwtAuthGuard } from '../auth/guards/jwt.guard'
import { UserPayload } from '../auth/dto/payload-user.dto'
import { FindOneTweetArgs } from './dto/findone-tweet.input'
import { DeleteTweetArgs } from './dto/delete-tweet.input'
import { User } from '../user/entities/user.entity'
import { Services } from '../utils/constants'
import { UserService } from '../user/user.service'
import { LikeTweetArgs } from './dto/like-tweet.input'

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(
    @Inject(Services.TWEET) private readonly tweetService: TweetService,
    @Inject(Services.USER) private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Tweet, {
    name: 'CreateTweet',
    description: 'Create a new tweet'
  })
  async create(
    @Args('input') input: CreateTweetInput,
    @CurrentUser() user: UserPayload
  ) {
    return await this.tweetService.create(input, user.id)
  }

  @Query(() => [Tweet], {
    name: 'FindAllTweet',
    description: 'Find all tweets'
  })
  async findAll() {
    return await this.tweetService.findAll()
  }

  @Query(() => Tweet, {
    name: 'FindOneTweet',
    description: 'Find one tweet'
  })
  findOne(@Args() args: FindOneTweetArgs) {
    return this.tweetService.findOne(args.id)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Tweet, {
    name: 'DeleteTweet',
    description: 'Delete a tweet'
  })
  async removeTweet(
    @Args() args: DeleteTweetArgs,
    @CurrentUser() user: UserPayload
  ) {
    return this.tweetService.remove(args.id, user.id)
  }

  @ResolveField(() => User, {
    name: 'user',
    description: 'Get the user who created the tweet'
  })
  async user(@Parent() tweet: Tweet) {
    return await this.userService.findOne({ id: tweet.userId })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Tweet, {
    name: 'LikeTweet',
    description: 'Like a tweet'
  })
  async likeTweet(
    @Args() args: LikeTweetArgs,
    @CurrentUser() user: UserPayload
  ) {
    return await this.tweetService.like(args.id, user.id)
  }
}

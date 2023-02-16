import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID
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
import {
  PaginationTweet,
  PaginationTweetArgs
} from './dto/pagination-tweet.dto'
import { RetweetTweetArgs } from './dto/retweet-tweet.input'

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
  ): Promise<Tweet> {
    return await this.tweetService.create(input, user.id)
  }

  @Query(() => PaginationTweet, {
    name: 'PaginationTweet',
    description: 'Find all tweets with pagination'
  })
  async pagination(
    @Args() args: PaginationTweetArgs
  ): Promise<PaginationTweet> {
    return await this.tweetService.pagination(args)
  }

  @Query(() => Tweet, {
    name: 'FindOneTweet',
    description: 'Find one tweet',
    nullable: true
  })
  findOne(@Args() args: FindOneTweetArgs): Promise<Tweet | null> {
    return this.tweetService.findOne(args.id)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ID, {
    name: 'DeleteTweet',
    description: 'Delete a tweet',
    nullable: true
  })
  async deleteTweet(
    @Args() args: DeleteTweetArgs,
    @CurrentUser() user: UserPayload
  ): Promise<Tweet['id'] | null> {
    return this.tweetService.delete(args.id, user.id)
  }

  @ResolveField(() => User, {
    name: 'user',
    description: 'Get the user who created the tweet',
    nullable: true
  })
  async user(@Parent() tweet: Tweet): Promise<User | null> {
    return await this.userService.findOne({ id: tweet.userId })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Tweet, {
    name: 'LikeTweet',
    description: 'Like a tweet',
    nullable: true
  })
  async likeTweet(
    @Args() args: LikeTweetArgs,
    @CurrentUser() user: UserPayload
  ): Promise<Tweet | null> {
    return await this.tweetService.like(args.id, user.id)
  }

  @ResolveField(() => [User], {
    name: 'likes',
    description: 'Get the users who liked the tweet',
    nullable: true
  })
  async likes(@Parent() tweet: Tweet): Promise<User[] | null> {
    return await this.tweetService.likes(tweet.id)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Tweet, {
    name: 'Retweet',
    description: 'Retweet a tweet',
    nullable: true
  })
  async retweet(
    @Args() args: RetweetTweetArgs,
    @CurrentUser() user: UserPayload
  ): Promise<Tweet | null> {
    return await this.tweetService.retweet(args.id, user.id)
  }

  @ResolveField(() => [User], {
    name: 'retweets',
    description: 'Get the users who retweeted the tweet',
    nullable: true
  })
  async retweets(@Parent() tweet: Tweet): Promise<User[] | null> {
    return await this.tweetService.retweets(tweet.id)
  }
}

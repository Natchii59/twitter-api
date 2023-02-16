import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, ILike, Repository } from 'typeorm'

import { CreateTweetInput } from './dto/create-tweet.input'
import { Tweet } from './entities/tweet.entity'
import { User } from '../user/entities/user.entity'
import {
  PaginationTweet,
  PaginationTweetArgs
} from './dto/pagination-tweet.dto'
import { SortDirection } from '../pagination/pagination.dto'

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(input: CreateTweetInput, userId: User['id']): Promise<Tweet> {
    const tweet = this.tweetRepository.create({
      ...input,
      user: { id: userId }
    })

    return await this.tweetRepository.save(tweet)
  }

  async pagination(args: PaginationTweetArgs): Promise<PaginationTweet> {
    const options: FindManyOptions<Tweet> = {
      skip: args.skip,
      take: args.take
    }

    if (args.where) {
      options.where = {}

      Object.entries(args.where).forEach(([key, value]) => {
        if (key === 'username') {
          options.where = [
            { user: { username: value } },
            { retweetedBy: { username: value } }
          ]
        } else {
          if (typeof value === 'string')
            options.where[key] = ILike(`%${value}%`)
          else options.where[key] = value
        }
      })
    }

    if (args.sortBy) {
      options.order = {}

      Object.entries(args.sortBy).forEach(([key, value]) => {
        options.order[key] = value === SortDirection.ASC ? 'ASC' : 'DESC'
      })
    }

    const [nodes, totalCount] = await this.tweetRepository.findAndCount(options)

    return {
      nodes,
      totalCount
    }
  }

  async findOne(id: Tweet['id']): Promise<Tweet | null> {
    return await this.tweetRepository.findOneBy({ id })
  }

  async delete(
    id: Tweet['id'],
    userId: User['id']
  ): Promise<Tweet['id'] | null> {
    const tweet = await this.findOne(id)

    if (tweet.userId !== userId) return null

    const result = await this.tweetRepository.delete(id)

    if (result.affected === 0) return null

    return id
  }

  async like(id: Tweet['id'], userId: User['id']): Promise<Tweet | null> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['likedBy']
    })

    const user = await this.userRepository.findOneBy({ id: userId })

    if (!tweet || !user) return null

    if (tweet.likedBy.find((user) => user.id === userId)) {
      tweet.likedBy = tweet.likedBy.filter((user) => user.id !== userId)
    } else {
      tweet.likedBy.push(user)
    }

    return await this.tweetRepository.save(tweet)
  }

  async likes(id: Tweet['id']): Promise<User[] | null> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['likedBy']
    })

    if (!tweet) return null

    return tweet.likedBy
  }

  async retweet(id: Tweet['id'], userId: User['id']): Promise<Tweet | null> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['retweetedBy']
    })

    const user = await this.userRepository.findOneBy({ id: userId })

    if (!tweet || !user) return null

    if (tweet.retweetedBy.find((user) => user.id === userId)) {
      tweet.retweetedBy = tweet.retweetedBy.filter((user) => user.id !== userId)
    } else {
      tweet.retweetedBy.push(user)
    }

    return await this.tweetRepository.save(tweet)
  }

  async retweets(id: Tweet['id']): Promise<User[] | null> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['retweetedBy']
    })

    if (!tweet) return null

    return tweet.retweetedBy
  }
}

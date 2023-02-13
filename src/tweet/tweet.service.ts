import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateTweetInput } from './dto/create-tweet.input'
import { Tweet } from './entities/tweet.entity'
import { User } from '../user/entities/user.entity'

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

  async findAll(): Promise<Tweet[]> {
    return await this.tweetRepository.find()
  }

  async findOne(id: Tweet['id']): Promise<Tweet> {
    return await this.tweetRepository.findOneBy({ id })
  }

  async remove(
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

    if (!tweet) throw new BadRequestException('Tweet not found')

    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!user) throw new BadRequestException('User not found')

    if (tweet.likedBy.find((user) => user.id === userId)) {
      tweet.likedBy = tweet.likedBy.filter((user) => user.id !== userId)
    } else {
      tweet.likedBy.push(user)
    }

    return await this.tweetRepository.save(tweet)
  }
}

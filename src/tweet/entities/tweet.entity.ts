import { ObjectType, Field } from '@nestjs/graphql'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId
} from 'typeorm'

import { User } from '../../user/entities/user.entity'
import { Node } from '../../database/entities/node.entity'

@Entity()
@ObjectType()
export class Tweet extends Node {
  @Column()
  @Field(() => String, { description: 'Text of the tweet' })
  text: string

  @ManyToOne(() => User, (user) => user.tweets, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User

  @RelationId((tweet: Tweet) => tweet.user)
  userId: User['id']

  @ManyToMany(() => User, (user) => user.likedTweets)
  @JoinTable({
    name: 'tweets_likes',
    joinColumn: {
      name: 'tweet_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  likedBy: User[]

  @RelationId((tweet: Tweet) => tweet.likedBy)
  likedByIds: User['id'][]

  @ManyToMany(() => User, (user) => user.retweetedTweets)
  @JoinTable({
    name: 'tweets_retweets',
    joinColumn: {
      name: 'tweet_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  retweetedBy: User[]

  @RelationId((tweet: Tweet) => tweet.retweetedBy)
  retweetedByIds: User['id'][]
}

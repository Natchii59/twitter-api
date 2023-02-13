import { ObjectType, Field, Int } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm'

import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id of the tweet' })
  id: number

  @Column()
  @Field(() => String, { description: 'Text of the tweet' })
  text: string

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date, { description: 'Date of creation' })
  createdAt: Date

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
      name: 'tweet',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'id'
    }
  })
  likedBy: User[]
}

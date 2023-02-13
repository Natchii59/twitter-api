import { ObjectType, Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Tweet } from '../../tweet/entities/tweet.entity'

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'ID of user' })
  id: string

  @Column({ unique: true })
  @Field(() => String, { description: 'Username of user' })
  username: string

  @Column({ unique: true })
  @Field(() => String, { description: 'Email of user' })
  email: string

  @Column()
  @Field(() => String, { description: 'Name of user' })
  name: string

  @Column()
  @Field(() => Date, { description: 'Birthday of user' })
  birthday: Date

  @Column()
  password: string

  @Column({ name: 'resfresh_token', nullable: true })
  refreshToken?: string

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date, { description: 'Date of user creation' })
  createdAt: Date

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[]

  @ManyToMany(() => Tweet, (tweet) => tweet.likedBy, {
    onDelete: 'CASCADE'
  })
  likedTweets: Tweet[]
}

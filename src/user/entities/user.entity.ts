import { ObjectType, Field } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'

import { Tweet } from '../../tweet/entities/tweet.entity'
import { Node } from '../../database/entities/node.entity'

@Entity()
@ObjectType()
export class User extends Node {
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

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[]

  @ManyToMany(() => Tweet, (tweet) => tweet.likedBy, {
    onDelete: 'CASCADE'
  })
  likedTweets: Tweet[]
}

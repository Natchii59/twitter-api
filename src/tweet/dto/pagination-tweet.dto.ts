import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import {
  Pagination,
  PaginationArgs,
  PaginationWhere
} from '../../pagination/pagination.dto'
import { Tweet } from '../entities/tweet.entity'
import { User } from '../../user/entities/user.entity'

@InputType()
export class PaginationTweetWhere extends PaginationWhere {
  @Field(() => String, { nullable: true, description: 'Filter by content' })
  text?: Tweet['text']

  @Field(() => String, { nullable: true, description: 'Filter by user id' })
  userId?: User['id']

  @Field(() => String, { nullable: true, description: 'Filter by username' })
  username?: User['username']
}

@ArgsType()
export class PaginationTweetArgs extends PaginationArgs {
  @Field(() => PaginationTweetWhere, { nullable: true })
  @Type(() => PaginationTweetWhere)
  @ValidateNested()
  where?: PaginationTweetWhere
}

@ObjectType()
export class PaginationTweet extends Pagination {
  @Field(() => [Tweet])
  nodes: Tweet[]
}

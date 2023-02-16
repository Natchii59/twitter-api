import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsUUID, MaxLength, ValidateIf, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import {
  Pagination,
  PaginationArgs,
  PaginationWhere
} from '../../pagination/pagination.dto'
import { Tweet } from '../entities/tweet.entity'
import { User } from '../../user/entities/user.entity'

@InputType()
export class PaginationTweetWhere extends PaginationWhere {
  @Field(() => String, { description: 'Filter by content', nullable: true })
  @MaxLength(280, {
    message: 'La longueur du tweet ne doit pas dépasser 280 caractères.'
  })
  @ValidateIf((_o, v) => v !== undefined)
  text?: Tweet['text']

  @Field(() => ID, { description: 'Filter by user id', nullable: true })
  @IsUUID('all', { message: "L'identifiant de l'utilisateur est invalide." })
  @ValidateIf((_o, v) => v !== undefined)
  userId?: User['id']

  @Field(() => String, { description: 'Filter by username', nullable: true })
  @ValidateIf((_o, v) => v !== undefined)
  username?: User['username']
}

@ArgsType()
export class PaginationTweetArgs extends PaginationArgs {
  @Field(() => PaginationTweetWhere, { nullable: true })
  @ValidateNested()
  @Type(() => PaginationTweetWhere)
  where?: PaginationTweetWhere
}

@ObjectType()
export class PaginationTweet extends Pagination {
  @Field(() => [Tweet])
  nodes: Tweet[]
}

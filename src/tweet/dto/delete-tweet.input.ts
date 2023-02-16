import { ArgsType, Field, ID } from '@nestjs/graphql'
import { Tweet } from '../entities/tweet.entity'
import { IsUUID } from 'class-validator'

@ArgsType()
export class DeleteTweetArgs {
  @Field(() => ID, { description: 'Id of tweet' })
  @IsUUID('all', { message: "L'identifiant du Tweet est invalide." })
  id: Tweet['id']
}

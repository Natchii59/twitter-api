import { ArgsType, Field, ID } from '@nestjs/graphql'
import { Tweet } from '../entities/tweet.entity'

@ArgsType()
export class DeleteTweetArgs {
  @Field(() => ID, { description: 'Id of tweet' })
  id: Tweet['id']
}

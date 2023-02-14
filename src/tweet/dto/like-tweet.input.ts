import { Field, ArgsType, ID } from '@nestjs/graphql'

import { Tweet } from '../entities/tweet.entity'

@ArgsType()
export class LikeTweetArgs {
  @Field(() => ID, { description: 'Id of tweet' })
  id: Tweet['id']
}

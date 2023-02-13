import { Field, Int, ArgsType } from '@nestjs/graphql'

import { Tweet } from '../entities/tweet.entity'

@ArgsType()
export class FindOneTweetArgs {
  @Field(() => Int, { description: 'Id of tweet' })
  id: Tweet['id']
}

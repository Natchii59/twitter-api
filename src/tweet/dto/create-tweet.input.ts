import { InputType, Field } from '@nestjs/graphql'
import { Tweet } from '../entities/tweet.entity'

@InputType()
export class CreateTweetInput {
  @Field(() => String, { description: 'Text of the tweet' })
  text: Tweet['text']
}

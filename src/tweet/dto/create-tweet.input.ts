import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateTweetInput {
  @Field(() => String, { description: 'Text of the tweet' })
  text: string
}

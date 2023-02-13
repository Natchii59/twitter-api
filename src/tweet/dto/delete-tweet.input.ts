import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class DeleteTweetArgs {
  @Field(() => Int, { description: 'Id of tweet' })
  id: number
}

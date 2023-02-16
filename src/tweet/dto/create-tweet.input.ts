import { InputType, Field } from '@nestjs/graphql'
import { Tweet } from '../entities/tweet.entity'
import { MaxLength } from 'class-validator'

@InputType()
export class CreateTweetInput {
  @Field(() => String, { description: 'Text of the tweet' })
  @MaxLength(280, {
    message: 'La longueur du tweet ne doit pas dépasser 280 caractères.'
  })
  text: Tweet['text']
}

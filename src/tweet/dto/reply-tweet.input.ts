import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID, MaxLength } from 'class-validator'
import { Tweet } from '../entities/tweet.entity'

@InputType()
export class ReplyTweetInput {
  @Field(() => ID, { description: 'ID of the tweet to reply' })
  @IsUUID('all', { message: "L'identifiant du Tweet est invalide." })
  id: Tweet['id']

  @Field(() => String, { description: 'Text of the tweet' })
  @MaxLength(280, {
    message: 'La longueur du tweet ne doit pas dépasser 280 caractères.'
  })
  text: Tweet['text']
}

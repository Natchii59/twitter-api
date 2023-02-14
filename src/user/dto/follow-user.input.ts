import { Field, ArgsType, ID } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

import { User } from '../entities/user.entity'

@ArgsType()
export class FollowUserArgs {
  @Field(() => ID, { description: 'Id of user' })
  @IsUUID('all', { message: "L'identifiant de l'utilisateur est invalide." })
  id: User['id']
}

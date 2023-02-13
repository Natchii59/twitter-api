import { InputType, Field } from '@nestjs/graphql'
import { User } from '../entities/user.entity'
import { IsEmail, IsUUID, Matches, ValidateIf } from 'class-validator'
import { Transform } from 'class-transformer'

@InputType()
export class FindOneUserInput {
  @Field(() => String, { description: 'Username of user', nullable: true })
  @IsUUID('all', { message: "L'identifiant de l'utilisateur est invalide." })
  @ValidateIf((_o, v) => v !== undefined)
  id?: User['id']

  @Field(() => String, { description: 'Username of user', nullable: true })
  @Matches(/^[a-zA-Z0-9_]{3,}$/, {
    message:
      "Le nom d'utilisateur doit contenir au moins 3 caractères et ne peut contenir que des lettres, des chiffres et des tirets bas."
  })
  @Transform(({ value }) => value.toLowerCase())
  username?: User['username']

  @Field(() => String, { description: 'Email of user', nullable: true })
  @IsEmail({}, { message: "L'adresse mail est invalide." })
  @ValidateIf((_o, v) => v !== undefined)
  @Transform(({ value }) => value.toLowerCase())
  email?: User['email']
}

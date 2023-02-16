import { Field, InputType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'
import {
  IsDate,
  IsEmail,
  Matches,
  MaxLength,
  ValidateIf
} from 'class-validator'
import { Transform } from 'class-transformer'

@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'Username of user', nullable: true })
  @Matches(/^[a-zA-Z0-9_]{3,}$/, {
    message:
      "Le nom d'utilisateur doit contenir au moins 3 caractères et ne peut contenir que des lettres, des chiffres et des tirets bas."
  })
  @ValidateIf((_o, v) => v !== undefined)
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  username?: User['username']

  @Field(() => String, { description: 'Email of user', nullable: true })
  @IsEmail({}, { message: "L'adresse mail est invalide." })
  @ValidateIf((_o, v) => v !== undefined)
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  email?: User['email']

  @Field(() => String, { description: 'Name of user', nullable: true })
  @MaxLength(50, {
    message: 'Le nom et prénom ne peuvent pas dépasser 50 caractères.'
  })
  @ValidateIf((_o, v) => v !== undefined)
  name?: User['name']

  @Field(() => Date, { description: 'Birthday of user', nullable: true })
  @IsDate({ message: 'La date de naissance est invalide.' })
  @ValidateIf((_o, v) => v !== undefined)
  birthday?: User['birthday']

  @Field(() => String, { description: 'Password of user', nullable: true })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule et un chiffre.'
  })
  @ValidateIf((_o, v) => v !== undefined)
  password?: User['password']

  refreshToken?: User['refreshToken']
}

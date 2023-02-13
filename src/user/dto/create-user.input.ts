import { InputType, Field } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import { IsDate, IsEmail, Matches, MaxLength } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Username of user' })
  @Matches(/^[a-zA-Z0-9_]{3,}$/, {
    message:
      "Le nom d'utilisateur doit contenir au moins 3 caractères et ne peut contenir que des lettres, des chiffres et des tirets bas."
  })
  @Transform(({ value }) => value.toLowerCase())
  username: string

  @Field(() => String, { description: 'Email of user' })
  @IsEmail({}, { message: "L'adresse mail est invalide." })
  @Transform(({ value }) => value.toLowerCase())
  email: string

  @Field(() => String, { description: 'Name of user' })
  @MaxLength(50, {
    message: 'Le nom et prénom ne peuvent pas dépasser 50 caractères.'
  })
  name: string

  @Field(() => Date, { description: 'Birthday of user' })
  @IsDate({ message: 'La date de naissance est invalide.' })
  birthday: Date

  @Field(() => String, { description: 'Password of user' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule et un chiffre.'
  })
  password: string
}

import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

import { User } from '../../user/entities/user.entity'

@ArgsType()
export class SignInArgs {
  @Field(() => String, { description: 'Email of user' })
  email: User['email']

  @Field(() => String, { description: 'Password of user' })
  password: User['password']
}

@ObjectType()
export class TokensOutput {
  @Field(() => String, { description: 'Access Token of user' })
  accessToken: string

  @Field(() => String, { description: 'Access Token of user' })
  refreshToken: User['refreshToken']
}

@ObjectType()
export class SignInOutput extends TokensOutput {
  @Field(() => User, { description: 'Current user' })
  user: User
}

@ObjectType()
export class SignUpOutput extends TokensOutput {
  @Field(() => User, { description: 'Current user' })
  user: User
}

import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Services } from '../utils/constants'
import {
  SignInArgs,
  SignInOutput,
  SignUpOutput,
  TokensOutput
} from './dto/auth.dto'
import { LocalAuthGuard } from './guards/local.guard'
import { UserPayload } from './dto/payload-user.dto'
import { JwtAuthGuard, CurrentUser } from './guards/jwt.guard'
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard'
import { CreateUserInput } from '../user/dto/create-user.input'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { User } from '../user/entities/user.entity'

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(Services.AUTH) private readonly authService: AuthService,
    @Inject(Services.USER) private readonly userService: UserService
  ) {}

  @Mutation(() => SignUpOutput, {
    name: 'SignUp',
    description: 'Sign up User'
  })
  async signUp(@Args('input') input: CreateUserInput) {
    return await this.authService.signUp(input)
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => SignInOutput, {
    name: 'SignIn',
    description: 'Sign in User'
  })
  async signIn(@Args() _args: SignInArgs, @CurrentUser() user: UserPayload) {
    return await this.authService.signIn(user)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean, {
    name: 'LogOut',
    description: 'LogOut current user'
  })
  async logout(@CurrentUser() user: UserPayload) {
    await this.authService.logout(user.id)
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, {
    name: 'Profile',
    description: 'Get current user'
  })
  async profile(@CurrentUser() currentUser: UserPayload) {
    return await this.userService.findOne({ id: currentUser.id })
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Query(() => TokensOutput, {
    name: 'RefreshTokens',
    description: 'Refresh Tokens of current user'
  })
  async refreshTokens(@CurrentUser() user: UserPayload) {
    return await this.authService.refreshTokens(user.id, user.refreshToken)
  }
}

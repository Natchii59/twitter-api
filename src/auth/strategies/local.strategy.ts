import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { Services } from 'src/utils/constants'
import { User } from 'src/user/entities/user.entity'
import { UserPayload } from '../dto/payload-user.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH) private readonly authService: AuthService
  ) {
    super({
      usernameField: 'email'
    })
  }

  async validate(
    email: User['email'],
    password: User['password']
  ): Promise<UserPayload> {
    const user = await this.authService.validateUser(email, password)

    if (!user) throw new UnauthorizedException()

    return user
  }
}

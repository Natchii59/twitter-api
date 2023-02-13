import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from 'src/user/user.module'
import { Services } from 'src/utils/constants'
import { PassportModule } from '@nestjs/passport'
import { AuthResolver } from './auth.resolver'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_ACCES_TOKEN_SECRET')
      })
    })
  ],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService
    },
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthModule {}

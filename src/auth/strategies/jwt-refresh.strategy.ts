import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtValidatePayload, UserPayload } from '../dto/payload-user.dto'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true
    })
  }

  /**
   * Get and return refresh token in Authorization header, with UserPayload
   *
   * @param {Request} req Request
   * @param {JwtValidatePayload} payload Payload of user with expiration information
   *
   * @returns {UserPayload} Payload of user with refresh token in Request Authorization
   */
  validate(req: Request, payload: JwtValidatePayload): UserPayload {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim()

    return { ...payload, refreshToken }
  }
}

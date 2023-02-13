import {
  BadRequestException,
  ExecutionContext,
  Injectable
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { isEmail, matches } from 'class-validator'
import { IGraphQLErrorMessage } from 'src/utils/types'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const gqlReq = ctx.getContext().req

    if (gqlReq) {
      const args = ctx.getArgs()
      this.validateArgs(args)

      gqlReq.body = args
      return gqlReq
    }

    return context.switchToHttp().getRequest()
  }

  validateArgs(args): void {
    const errors: IGraphQLErrorMessage[] = []

    if (!isEmail(args.email))
      errors.push({ code: 'email', message: "L'adresse mail est invalide." })

    if (
      !matches(
        args.password,
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      )
    )
      errors.push({
        code: 'password',
        message:
          'Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule et un chiffre.'
      })

    if (errors.length) throw new BadRequestException(errors)
  }
}

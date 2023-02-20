import { NestFactory } from '@nestjs/core'
import { BadRequestException, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { formatErrorMessages } from './utils/functions'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const messages = formatErrorMessages(errors)
        return new BadRequestException(messages)
      }
    })
  )

  await app.listen(3001)
}
bootstrap()

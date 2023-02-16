import { NestFactory } from '@nestjs/core'
import { BadRequestException, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const messages = errors.map((error) => {
          if (error.children.length > 0) {
            return error.children.map((child) => {
              const msg = Object.values(child.constraints)[0]
              return {
                code: `${error.property}.${child.property}`,
                message: msg
              }
            })
          }

          const msg = Object.values(error.constraints)[0]
          return { code: error.property, message: msg }
        })
        return new BadRequestException(messages)
      }
    })
  )

  await app.listen(3001)
}
bootstrap()

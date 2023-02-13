import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TweetModule } from './tweet/tweet.module'
import { IGraphQLError } from './utils/types'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: parseInt(configService.getOrThrow('DB_PORT')),
        username: configService.getOrThrow('DB_USERNAME'),
        database: configService.getOrThrow('DB_DATABASE'),
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')]
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      formatError: (error) => {
        if (error.extensions.response) {
          return error.extensions.response as IGraphQLError
        }

        return error
      }
    }),
    UserModule,
    AuthModule,
    TweetModule
  ]
})
export class AppModule {}

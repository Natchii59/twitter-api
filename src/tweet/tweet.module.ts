import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TweetService } from './tweet.service'
import { TweetResolver } from './tweet.resolver'
import { Tweet } from './entities/tweet.entity'
import { UserModule } from '../user/user.module'
import { Services } from '../utils/constants'
import { User } from 'src/user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User]), UserModule],
  providers: [
    {
      provide: Services.TWEET,
      useClass: TweetService
    },
    TweetResolver
  ]
})
export class TweetModule {}

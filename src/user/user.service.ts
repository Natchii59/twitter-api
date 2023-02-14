import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { hashData } from '../utils/functions'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const errors = []

    if (await this.userRepository.findOneBy({ email: input.email }))
      errors.push({
        code: 'email',
        message: 'Email already exists'
      })

    if (await this.userRepository.findOneBy({ username: input.username }))
      errors.push({
        code: 'username',
        message: 'Username already exists'
      })

    if (errors.length > 0) throw new BadRequestException(errors)

    const password = await hashData(input.password)

    const user = this.userRepository.create({
      ...input,
      password
    })

    return await this.userRepository.save(user)
  }

  async findOne(input: FindOptionsWhere<User>): Promise<User | null> {
    return await this.userRepository.findOneBy({ ...input })
  }

  async update(id: User['id'], input: UpdateUserInput): Promise<User | null> {
    if (input.password) input.password = await hashData(input.password)

    const user = await this.userRepository.update(id, input)

    if (user.affected == 0) return null

    return await this.userRepository.findOneBy({ id })
  }

  async remove(id: User['id']): Promise<User['id'] | null> {
    const user = await this.userRepository.delete(id)

    if (user.affected == 0) return null

    return id
  }

  async follow(id: User['id'], followId: User['id']): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['following']
    })

    const follow = await this.userRepository.findOne({
      where: { id: followId },
      relations: ['followers']
    })

    if (!user || !follow) return null

    if (user.following.find((f) => f.id === followId)) {
      user.following = user.following.filter((f) => f.id !== follow.id)
    } else {
      user.following.push(follow)
    }

    await this.userRepository.save(user)
    return follow
  }

  async following(id: User['id']): Promise<User['following'] | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['following']
    })

    if (!user) return null

    return user.following
  }

  async followers(id: User['id']): Promise<User['followers'] | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['followers']
    })

    if (!user) return null

    return user.followers
  }
}

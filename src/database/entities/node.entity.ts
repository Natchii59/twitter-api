import { Field, ID, InterfaceType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@InterfaceType({ isAbstract: true })
export abstract class Node {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Unique identifier' })
  id: string

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date, { description: 'Date of creation' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date, { description: 'Date of last update' })
  updatedAt: Date
}

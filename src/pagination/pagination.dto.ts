import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  registerEnumType
} from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

import { Node } from '../database/entities/node.entity'

export enum SortDirection {
  ASC,
  DESC
}

registerEnumType(SortDirection, {
  name: 'SortDirection'
})

@InputType()
export class PaginationSortBy {
  @Field(() => SortDirection, {
    nullable: true,
    description: 'Sort by date of creation'
  })
  createdAt?: SortDirection

  @Field(() => SortDirection, {
    nullable: true,
    description: 'Sort by date of last update'
  })
  updatedAt?: SortDirection
}

@InputType()
export class PaginationWhere {
  @Field(() => ID, { nullable: true, description: 'Filter by id' })
  id?: string
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { description: 'Skip the first n nodes' })
  @IsNotEmpty()
  @IsInt()
  skip: number

  @Field(() => Int, { description: 'Take the first n nodes' })
  @IsNotEmpty()
  @IsInt()
  take: number

  @Field(() => PaginationSortBy, { nullable: true, description: 'Sort nodes' })
  sortBy?: PaginationSortBy

  @Field(() => PaginationWhere, { nullable: true, description: 'Filter nodes' })
  where?: PaginationWhere
}

@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
  @Field(() => Int, { description: 'Total number of nodes' })
  totalCount: number

  @Field(() => [Node], { description: 'Nodes' })
  abstract nodes: N[]
}

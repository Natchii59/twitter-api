import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  registerEnumType
} from '@nestjs/graphql'
import {
  IsInt,
  IsNotEmpty,
  IsUUID,
  ValidateIf,
  ValidateNested
} from 'class-validator'

import { Node } from '../database/entities/node.entity'
import { Type } from 'class-transformer'

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
    description: 'Sort by date of creation',
    nullable: true
  })
  createdAt?: SortDirection

  @Field(() => SortDirection, {
    description: 'Sort by date of last update',
    nullable: true
  })
  updatedAt?: SortDirection
}

@InputType()
export class PaginationWhere {
  @Field(() => ID, { nullable: true, description: 'Filter by id' })
  @IsUUID('all', { message: "L'identifiant est invalide" })
  @ValidateIf((_o, v) => v !== undefined)
  id?: string
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { description: 'Skip the first n nodes' })
  @IsInt({ message: 'Le nombre de noeuds à ignorer doit être un entier' })
  skip: number

  @Field(() => Int, { description: 'Take the first n nodes' })
  @IsInt({ message: 'Le nombre de noeuds à prendre doit être un entier' })
  take: number

  @Field(() => PaginationSortBy, { description: 'Sort nodes', nullable: true })
  @ValidateNested({ each: true })
  @Type(() => PaginationSortBy)
  sortBy?: PaginationSortBy

  @Field(() => PaginationWhere, { description: 'Filter nodes', nullable: true })
  @ValidateNested({ each: true })
  @Type(() => PaginationWhere)
  where?: PaginationWhere
}

@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
  @Field(() => Int, { description: 'Total number of nodes' })
  totalCount: number

  @Field(() => [Node], { description: 'Nodes' })
  abstract nodes: N[]
}

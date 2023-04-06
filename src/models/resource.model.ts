import {Entity, model, property} from '@loopback/repository';

@model()
export class Resource extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  resourceType: string;


  constructor(data?: Partial<Resource>) {
    super(data);
  }
}

export interface ResourceRelations {
  // describe navigational properties here
}

export type ResourceWithRelations = Resource & ResourceRelations;

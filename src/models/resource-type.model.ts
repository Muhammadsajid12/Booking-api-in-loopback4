import {Entity, model, property} from '@loopback/repository';

@model()
export class ResourceType extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
  resource: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;


  constructor(data?: Partial<ResourceType>) {
    super(data);
  }
}

export interface ResourceTypeRelations {
  // describe navigational properties here
}

export type ResourceTypeWithRelations = ResourceType & ResourceTypeRelations;

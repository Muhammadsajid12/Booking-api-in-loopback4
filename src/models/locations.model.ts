import {Entity, model, property} from '@loopback/repository';

@model()
export class Locations extends Entity {
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
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  resourceType: string;


  constructor(data?: Partial<Locations>) {
    super(data);
  }
}

export interface LocationsRelations {
  // describe navigational properties here
}

export type LocationsWithRelations = Locations & LocationsRelations;

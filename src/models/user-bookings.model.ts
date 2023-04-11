import {Entity, model, property} from '@loopback/repository';

@model()
export class UserBookings extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  bookingStartTime: string;

  @property({
    type: 'string',
    required: true,
  })
  bookingEndTime: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  resourceType: string;


  constructor(data?: Partial<UserBookings>) {
    super(data);
  }
}

export interface UserBookingsRelations {
  // describe navigational properties here
}

export type UserBookingsWithRelations = UserBookings & UserBookingsRelations;

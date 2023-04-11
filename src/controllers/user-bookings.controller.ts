import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';

import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';


import {UserBookings} from '../models';
import {UserBookingsRepository} from '../repositories';


export class UserBookingsController {
  constructor(
    @repository(UserBookingsRepository)
    public userBookingsRepository: UserBookingsRepository,
  ) { }

  @post('/user-bookings')
  @response(200, {
    description: 'UserBookings model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserBookings)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserBookings, {
            title: 'NewUserBookings',
            exclude: ['id'],
          }),
        },
      },
    })
    userBookings: Omit<UserBookings, 'id'>,
  ): Promise<UserBookings> {
    return this.userBookingsRepository.create(userBookings);
  }

  @get('/user-bookings/count')
  @response(200, {
    description: 'UserBookings model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserBookings) where?: Where<UserBookings>,
  ): Promise<Count> {
    return this.userBookingsRepository.count(where);
  }

  @get('/user-bookings')
  @response(200, {
    description: 'Array of UserBookings model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserBookings, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserBookings) filter?: Filter<UserBookings>,
  ): Promise<UserBookings[]> {
    return this.userBookingsRepository.find(filter);
  }

  @patch('/user-bookings')
  @response(200, {
    description: 'UserBookings PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserBookings, {partial: true}),
        },
      },
    })
    userBookings: UserBookings,
    @param.where(UserBookings) where?: Where<UserBookings>,
  ): Promise<Count> {
    return this.userBookingsRepository.updateAll(userBookings, where);
  }

  @get('/user-bookings/{id}')
  @response(200, {
    description: 'UserBookings model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserBookings, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserBookings, {exclude: 'where'}) filter?: FilterExcludingWhere<UserBookings>
  ): Promise<UserBookings> {
    return this.userBookingsRepository.findById(id, filter);
  }

  @patch('/user-bookings/{id}')
  @response(204, {
    description: 'UserBookings PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserBookings, {partial: true}),
        },
      },
    })
    userBookings: UserBookings,
  ): Promise<void> {
    await this.userBookingsRepository.updateById(id, userBookings);
  }

  @put('/user-bookings/{id}')
  @response(204, {
    description: 'UserBookings PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userBookings: UserBookings,
  ): Promise<void> {
    await this.userBookingsRepository.replaceById(id, userBookings);
  }

  @del('/user-bookings/{id}')
  @response(204, {
    description: 'UserBookings DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userBookingsRepository.deleteById(id);
  }
}

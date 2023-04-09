import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Where
} from '@loopback/repository';


import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post, put, requestBody,
  response
} from '@loopback/rest';
import {Locations} from '../models';
// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {LocationService} from '../services';


@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
export class LocationsController {
  constructor(
    @inject("services.LocationService") public locationSerivce: LocationService // Here carService injected..
  ) { }





  // Here is the methods route..............................
  @post('/locations')
  @response(200, {
    description: 'Locations model instance',
    content: {'application/json': {schema: getModelSchemaRef(Locations)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Locations, {
            title: 'NewLocations',
            exclude: ['id'],
          }),
        },
      },
    })
    locations: Omit<Locations, 'id'>,
  ): Promise<Locations> {
    return this.locationSerivce.createNewLocation(locations);
  }


  // Count Locations..................
  @get('/locations/count')
  @response(200, {
    description: 'Locations model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Locations) where?: Where<Locations>
  ): Promise<Count> {
    console.log('called');
    return this.locationSerivce.locationCount(where);
  }


  // Get all locations................................
  @get('/locations')
  @response(200, {
    description: 'Array of Locations model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Locations, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Locations) filter?: Filter<Locations>
  ): Promise<Locations[]> {
    return this.locationSerivce.findLocations(filter);
  }


  // Patch all locations.................................................

  @patch('/locations')
  @response(200, {
    description: 'Locations PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Locations, {partial: true}),
        },
      },
    })
    locations: Locations,
    @param.where(Locations) where?: Where<Locations>,
  ): Promise<Count> {
    return this.locationSerivce.patchAllLocations(locations, where);
  }

  // Get location By Id.......................⚡⚡

  @get('/locations/{id}')
  @response(200, {
    description: 'Locations model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Locations, {includeRelations: true}),
      },
    },
  })

  //
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Locations, {exclude: 'where'}) filter?: FilterExcludingWhere<Locations>
  ): Promise<Locations> {
    return this.locationSerivce.findById(id, filter);
  }


  // Patch locations ById...................................⚡⚡⚡
  @patch('/locations/{id}')
  @response(204, {
    description: 'Locations PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Locations, {partial: true}),
        },
      },
    })
    locations: Locations,
  ): Promise<void> {
    await this.locationSerivce.loctionUpdatebyId(id, locations);
  }

  // Put locations ById...............................⚡⚡⚡
  @put('/locations/{id}')
  @response(204, {
    description: 'Locations PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() locations: Locations,
  ): Promise<void> {
    await this.locationSerivce.putLocationById(id, locations);
  }


  // Delete location ById............................⚡⚡⚡
  @del('/locations/{id}')
  @response(204, {
    description: 'Locations DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.locationSerivce.deleteLocations(id);
  }


}

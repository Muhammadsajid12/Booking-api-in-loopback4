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
import {ResourceType} from '../models';
import {ResourceTypeRepository} from '../repositories';
// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {ResourceTypeService} from '../services';




export class ResourceTypeController {
  constructor(
    @repository(ResourceTypeRepository)
    public resourceTypeRepository: ResourceTypeRepository,

    @inject("services.ResourceTypeService") public resourceTypeService: ResourceTypeService

  ) { }




  //...................................... CountMethods......................................................

  @get('/resource-types/count')
  @response(200, {
    description: 'ResourceType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResourceType) where?: Where<ResourceType>,
  ): Promise<Count> {
    console.log('count fn called.......');
    return this.resourceTypeService.resourceTypeCount(where);
  }



  //...................................... GetAllResourceTypes................................................

  @get('/resource-types')
  @response(200, {
    description: 'Array of ResourceType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResourceType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResourceType) filter?: Filter<ResourceType>,
  ): Promise<ResourceType[]> {
    console.log("All Resource are fetched..");
    return this.resourceTypeService.resourceTypeGet(filter)
  }


  //......................ResourceGetById......................................................................

  @get('/resource-types/{id}')
  @response(200, {
    description: 'ResourceType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResourceType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ResourceType, {exclude: 'where'}) filter?: FilterExcludingWhere<ResourceType>
  ): Promise<ResourceType> {
    return this.resourceTypeRepository.findById(id, filter);
  }





  //.........................................Post_ResourceType..................................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @post('/resource-types')
  @response(200, {
    description: 'ResourceType model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResourceType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceType, {
            title: 'NewResourceType',
            exclude: ['id'],
          }),
        },
      },
    })
    resourceType: Omit<ResourceType, 'id'>,
  ): Promise<ResourceType> {
    return this.resourceTypeService.resourceTypePost(resourceType);
  }
  // ..........................................resourceType PutMethod...........................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @put('/resource-types/{id}')
  @response(204, {
    description: 'ResourceType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() resourceType: ResourceType,
  ): Promise<void> {
    await this.resourceTypeService.resourceTypePutById(id, resourceType);
  }
  // ..........................................resourceType PatchMethod...........................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @patch('/resource-types')
  @response(200, {
    description: 'ResourceType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceType, {partial: true}),
        },
      },
    })
    resourceType: ResourceType,
    @param.where(ResourceType) where?: Where<ResourceType>,
  ): Promise<Count> {
    return this.resourceTypeService.resourceTypePatch(resourceType, where);
  }

  //............................................resourceTypePatchByIdMethod......................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @patch('/resource-types/{id}')
  @response(204, {
    description: 'ResourceType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceType, {partial: true}),
        },
      },
    })
    resourceType: ResourceType,
  ): Promise<void> {
    await this.resourceTypeService.resourceTypePatchById(resourceType, id);
  }


  // .....................................resourceTypeDeleteById...............................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @del('/resource-types/{id}')
  @response(204, {
    description: 'ResourceType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.resourceTypeService.resourceTypeDeleteById(id);
  }
}

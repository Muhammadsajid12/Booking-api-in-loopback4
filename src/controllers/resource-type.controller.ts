import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ResourceType} from '../models';
import {ResourceTypeRepository} from '../repositories';
// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';



@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level

export class ResourceTypeController {
  constructor(
    @repository(ResourceTypeRepository)
    public resourceTypeRepository: ResourceTypeRepository,
  ) { }

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
    return this.resourceTypeRepository.create(resourceType);
  }

  @get('/resource-types/count')
  @response(200, {
    description: 'ResourceType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResourceType) where?: Where<ResourceType>,
  ): Promise<Count> {
    return this.resourceTypeRepository.count(where);
  }

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
    return this.resourceTypeRepository.find(filter);
  }

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
    return this.resourceTypeRepository.updateAll(resourceType, where);
  }

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
    await this.resourceTypeRepository.updateById(id, resourceType);
  }

  @put('/resource-types/{id}')
  @response(204, {
    description: 'ResourceType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() resourceType: ResourceType,
  ): Promise<void> {
    await this.resourceTypeRepository.replaceById(id, resourceType);
  }

  @del('/resource-types/{id}')
  @response(204, {
    description: 'ResourceType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.resourceTypeRepository.deleteById(id);
  }
}

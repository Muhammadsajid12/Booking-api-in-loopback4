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
import {Resource} from '../models';
import {ResourceRepository} from '../repositories';


// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {ResourceserviceService} from "../services/resource.service";



export class ResourceController {
  constructor(
    @repository(ResourceRepository)
    public resourceRepository: ResourceRepository,

    @inject("services.ResourceserviceService") public resourceService: ResourceserviceService

  ) { }



  // ..............................................ResourceCount...................................................

  @get('/resources/count')
  @response(200, {
    description: 'Resource model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resource) where?: Where<Resource>,
  ): Promise<Count> {
    return this.resourceService.resourceCount(where)
  }



  // ..............................................ResourceGet..................................................


  @get('/resources')
  @response(200, {
    description: 'Array of Resource model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resource, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resource) filter?: Filter<Resource>,
  ): Promise<Resource[]> {
    return this.resourceService.resourceGet(filter);
  }

  // ..............................................ResourceGet..................................................
  @get('/resources/{id}')
  @response(200, {
    description: 'Resource model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resource, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Resource, {exclude: 'where'}) filter?: FilterExcludingWhere<Resource>
  ): Promise<Resource> {
    return this.resourceService.resourceGetById(id, filter);
  }

  // ..............................................ResourcePost..................................................

  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @post('/resources')
  @response(200, {
    description: 'Resource model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resource)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resource, {
            title: 'NewResource',
            exclude: ['id'],
          }),
        },
      },
    })
    resource: Omit<Resource, 'id'>,
  ): Promise<Resource> {
    return this.resourceService.resourcePost(resource);
  }

  // .............................................ResourcePut................................................

  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @put('/resources/{id}')
  @response(204, {
    description: 'Resource PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() resource: Resource,
  ): Promise<void> {
    await this.resourceService.resourcePut(id, resource);
  }




  // .............................................ResourcePatch................................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @patch('/resources')
  @response(200, {
    description: 'Resource PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resource, {partial: true}),
        },
      },
    })
    resource: Resource,
    @param.where(Resource) where?: Where<Resource>,
  ): Promise<Count> {
    return this.resourceService.resourcePatch(resource, where);
  }

  // .............................................ResourcePatchById..........................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @patch('/resources/{id}')
  @response(204, {
    description: 'Resource PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resource, {partial: true}),
        },
      },
    })
    resource: Resource,
  ): Promise<void> {
    await this.resourceRepository.updateById(id, resource);
  }


  // .............................................ResourcePatchById..........................................
  @authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
  @del('/resources/{id}')
  @response(204, {
    description: 'Resource DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.resourceService.resourceDeleteById(id);
  }








}

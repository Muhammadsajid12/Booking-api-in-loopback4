import { /* inject, */ BindingScope, inject, injectable} from '@loopback/core';
import {Filter, FilterExcludingWhere, Where, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ResourceType} from '../models';
import {ResourceTypeRepository} from '../repositories';
@injectable({scope: BindingScope.TRANSIENT})
export class ResourceTypeService {
  constructor(@repository(ResourceTypeRepository) public resourceTypeRepository: ResourceTypeRepository,


    @inject('datasources.db') public dataSource: DbDataSource,) { }




  //............................................. CountMethod ...............................................
  async resourceTypeCount(where?: Where<ResourceType>) {
    return this.resourceTypeRepository.count(where)
  }

  //............................................. CountMethod ...............................................
  async resourceTypeGet(filter?: Filter<ResourceType>) {
    return this.resourceTypeRepository.find(filter)
  }

  // .........................................ResourceTypeGetById..............................................
  async resourceTypeGetById(id?: string, filter?: FilterExcludingWhere<ResourceType>) {
    console.log('ResourceTypeGetById');
    return this.resourceTypeRepository.findById(id, filter)
  }
  // .........................................ResourceTypeGetById..............................................
  async resourceTypePost(resourceType: Omit<ResourceType, 'id'>) {
    console.log('ResourceTypeCreated');
    return this.resourceTypeRepository.create(resourceType)
  }

  // .........................................ResourceTypeGetById..............................................
  async resourceTypePutById(id: string, resourceType: Omit<ResourceType, 'id'>) {
    console.log('ResourceTypePut');
    return this.resourceTypeRepository.replaceById(id, resourceType)
  }

  // .........................................ResourceTypeGetById..............................................
  async resourceTypePatch(resourceType: ResourceType, where?: Where<ResourceType>) {
    console.log('ResourceTypePatch');
    return this.resourceTypeRepository.updateAll(resourceType, where)
  }
  // .........................................ResourceTypeGetById..............................................
  async resourceTypePatchById(resourceType: ResourceType, id: string) {
    console.log('ResourceTypePatchById');
    return this.resourceTypeRepository.updateById(id, resourceType)
  }
  // .........................................ResourceTypeGetById..............................................
  async resourceTypeDeleteById(id: string) {
    console.log('ResourceTypeDeleteById');
    return this.resourceTypeRepository.deleteById(id)
  }




}

import { /* inject, */ BindingScope, inject, injectable} from '@loopback/core';
import {Filter, FilterExcludingWhere, Where, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Resource} from '../models';
import {ResourceRepository} from '../repositories';
@injectable({scope: BindingScope.TRANSIENT})
export class ResourceserviceService {
  constructor(

    @repository(ResourceRepository) public resourceRepository: ResourceRepository,

    @inject('datasources.db') public dataSource: DbDataSource) { }


  //.........................resourceCount......................................
  async resourceCount(where?: Where<Resource>) {
    console.log('ResourceCount🎆');
    return this.resourceRepository.count(where)
  }

  //.........................resourceGet......................................
  async resourceGet(filter?: Filter<Resource>) {
    console.log('ResourceGet🎇');
    return this.resourceRepository.find(filter)
  }


  //.........................resourceGetById......................................
  async resourceGetById(id: string, filter?: FilterExcludingWhere<Resource>) {
    console.log('ResourceGetById👓');
    return this.resourceRepository.findById(id, filter)
  }


  //.........................resourcePost......................................
  async resourcePost(resource: Omit<Resource, "id">) {
    console.log('ResourcePost🎉');
    return this.resourceRepository.create(resource)
  }

  //.........................resourcePatch......................................
  async resourcePut(id: string, resource: Resource) {
    console.log('ResourcePut⚡');
    return this.resourceRepository.replaceById(id, resource)
  }

  //.........................resourcePatch......................................
  async resourcePatch(resource: Resource, where?: Where<Resource>) {
    console.log('ResourcePatch🎈');
    return this.resourceRepository.updateAll(resource, where)
  }






  //.........................resourcePatchById......................................
  async resourcePatchById(resource: Resource, id: string) {
    console.log('ResourcePatchById🎶');
    return this.resourceRepository.updateById(id, resource)
  }
  //.........................resourcePatchById......................................
  async resourceDeleteById(id: string) {
    console.log('ResourceDeleteById👺');
    return this.resourceRepository.deleteById(id)
  }













}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ResourceType, ResourceTypeRelations} from '../models';

export class ResourceTypeRepository extends DefaultCrudRepository<
  ResourceType,
  typeof ResourceType.prototype.id,
  ResourceTypeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ResourceType, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Resource, ResourceRelations} from '../models';

export class ResourceRepository extends DefaultCrudRepository<
  Resource,
  typeof Resource.prototype.id,
  ResourceRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Resource, dataSource);
  }
}

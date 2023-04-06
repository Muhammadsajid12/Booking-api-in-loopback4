import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Locations, LocationsRelations} from '../models';

export class LocationsRepository extends DefaultCrudRepository<
  Locations,
  typeof Locations.prototype.id,
  LocationsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Locations, dataSource);
  }
}

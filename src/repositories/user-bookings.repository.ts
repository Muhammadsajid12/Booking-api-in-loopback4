import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserBookings, UserBookingsRelations} from '../models';

export class UserBookingsRepository extends DefaultCrudRepository<
  UserBookings,
  typeof UserBookings.prototype.id,
  UserBookingsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(UserBookings, dataSource);
  }
}

import {BindingScope, inject, injectable} from '@loopback/core';
import {Filter, FilterExcludingWhere, Where, repository} from '@loopback/repository';
import {
  DbDataSource
} from '../datasources/db.datasource';
import {Locations} from '../models';
import {LocationsRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})


export class LocationService {
  constructor(

    @repository(LocationsRepository)
    public locationRepository: LocationsRepository,

    @inject('datasources.db') public dataSource: DbDataSource,


  ) { }




  // Here CarCount method bussiness logic.....🎈🎈🎈
  async locationCount(where?: Where<Locations>) {
    console.log('Count💕');
    return this.locationRepository.count(where);
  }

  // ----------------------------------------------Find Method -------------------------------------------------------
  async findLocations(filter?: Filter<Locations>) {
    console.log('AllLocations are returned🎭');

    return this.locationRepository.find(filter);
  }

  //.............................................LocationsById........................................................
  async findById(id: string, filter?: FilterExcludingWhere<Locations>): Promise<Locations> {
    console.log("car get by Id.....");
    return this.locationRepository.findById(id, filter)


  }


  //-------------------------------------------- Here Create new car Method------------------------------------------
  async createNewLocation(location: Locations,) {
    console.log("New location is created");
    return this.locationRepository.create(location);
  }


  // -------------------------------------------Put Methods-----------------------------------------------------------
  async putLocationById(id: string, location: Locations) {
    return this.locationRepository.replaceById(id, location)
  }

  //-------------------------------------------- Patch Method .. || Here where clause is important----------------------------
  async patchAllLocations(car: Locations, where?: Where<Locations>) {
    console.log('all locations are Updated....');
    return this.locationRepository.updateAll(car, where)
  }

  //.............................................. Here updatebyId fn bussiness logic..........................

  async loctionUpdatebyId(id: string, location: Locations) {
    console.log('selected location is updated...');
    return this.locationRepository.updateById(id, location);
  }



  //!--------------------------------------------DeleteMethod----------------------------------------------------------
  async deleteLocations(id: string) {
    console.log('Selected Car deleted..');
    return this.locationRepository.deleteById(id);
  }





}


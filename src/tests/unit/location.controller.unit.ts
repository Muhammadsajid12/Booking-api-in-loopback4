

import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {UserBookingsController} from '../../controllers/user-bookings.controller';
import {UserBookingsRepository} from '../../repositories/user-bookings.repository';


describe('ProductController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<UserBookingsRepository>;


  beforeEach(givenStubbedRepository);



  describe('getDetails()', () => {
    it('retrieves details of a product', async () => {
      const controller = new UserBookingsController(repository);
      repository.stubs.find.resolves();


      const details = await controller.find();

      console.log(details);

      expect(details).to.containEql({
        name: "Muhammadsajid",
        email: "sajid93116@gmail.com",
        bookingStartTime: "12:30 PM",
        bookingEndTime: "01:30 PM",
        date: "2023-04-10T07:19:31.052Z",
        resourceType: "Meeting Room"
      });
      sinon.assert.calledWithMatch(repository.stubs.find, {
        where: {name: 'Muhammad sajid'},
      });
    });
  });

  function givenStubbedRepository() {
    repository = createStubInstance(UserBookingsRepository);
  }
});



// 2)Second Solution..............
// import {expect} from '@loopback/testlab';
// import {ResourceController} from '../../controllers/resource.controller';
// import {ResourceserviceService} from '../../services/resource.service';

// describe('MyController', () => {
//   let controller: ResourceController;
//   let service: ResourceserviceService;

//    before(() => {
//       Set up the testing environment
//      service = new ResourceserviceService();
//      controller = new ResourceController(service);
//    });


//   describe('myMethod', () => {
//     it('returns the expected result', async () => {
//       const result = controller.find();
//       console.log(result);
//       expect(result).to.eql(service.resourceGet);




//     });
//   });


// })



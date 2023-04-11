// import {
//   createStubInstance,
//   expect,
//   sinon,
//   StubbedInstanceWithSinonAccessor,
// } from '@loopback/testlab';

// import {ResourceRepository} from '../../repositories/resource.repository';
// import {ResourceserviceService} from '../../services';



// describe('CarService', () => {

//   let carRepository: StubbedInstanceWithSinonAccessor<ResourceRepository>;

//   beforeEach(() => {
//     carRepository = createStubInstance(ResourceRepository);


//   });

//     carService = new ResourceserviceService(carRepository);


//   describe('calculateCarPricesWithTaxes', () => {
//     it('should get new prices for cars', async () => {
//       const find = carRepository.stubs.find;
//       find.resolves([

//       ]);

//       const res = await carService.calculateCarPricesWithTaxes(10);

//       expect(res).to.eql([11000, 22000]);
//       // expect(res).to.not.eql([110, 220]);

//       sinon.assert.calledWith(find, {where: {price: {gte: 10000}}});

//       // sinon.assert.calledOnce(find);
//     });
//   });
// });

// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AdvertiserApiService } from './advertiser-api.service';
// import { Advertiser } from '../models/advertiser.model';
// import { AddressRequest } from '../models/address-request.model';
// import { AdvertiserRequest } from '../models/advertiser-request.model';
// import { BehaviorSubject } from 'rxjs';

// describe('AdvertiserApiService', () => {
//   let service: AdvertiserApiService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [AdvertiserApiService],
//     });
//     service = TestBed.inject(AdvertiserApiService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // it('should add advertiser and address', () => {
//   //   const mockRequest: AdvertiserRequest = { /* mock advertiser request data */ };
//   //   const mockAddressRequest: AddressRequest = { /* mock address request data */ };
//   //   const mockAddressResponse = { /* mock address response data */ };
//   //   const mockAdvertiserResponse = { /* mock advertiser response data */ };

//   //   service.addAdvertiser(mockRequest);

//   //   const addressRequest = httpMock.expectOne(`${service.apiUrl}/addresses`);
//   //   expect(addressRequest.request.method).toBe('POST');
//   //   addressRequest.flush(mockAddressResponse);

//   //   const advertiserRequest = httpMock.expectOne(`${service.apiUrl}/advertisers`);
//   //   expect(advertiserRequest.request.method).toBe('POST');
//   //   expect(advertiserRequest.request.body).toEqual({
//   //     ...mockRequest,
//   //     addressId: mockAddressResponse.id
//   //   });
//   //   advertiserRequest.flush(mockAdvertiserResponse);
//   // });

//   it('should fetch advertisers and addresses on initialization', () => {
//     const mockAdLdResponse = [
//       {
//         '@id': '/advertisers/1',
//         '@type': 'Advertiser',
//         id: 1,
//         name: 'Fiat',
//         orgurl: 'http://www.fiat.co.uk/',
//         firstName: 'John',
//         lastName: 'Smith',
//         email: 'info@fiat.co.uk',
//         telephone: '02012345678',
//         updatedTs: '2017-08-07T14:36:49+00:00',
//         address: '/addresses/1',
//       },
//       {
//         '@id': '/advertisers/2',
//         '@type': 'Advertiser',
//         id: 2,
//         name: 'Mercedes-Benz',
//         orgurl: 'http://www.mercedes-benz.co.uk/',
//         firstName: 'Jim',
//         lastName: 'Hendrix',
//         email: 'info@mercedes-benz.co.uk',
//         telephone: '02012345678',
//         updatedTs: '2017-08-08T14:36:49+00:00',
//         address: '/addresses/2',
//       },
//     ];
//     const mockAddressLdResponse = {
//       '@context': '/contexts/Address',
//       '@id': '/addresses/1',
//       '@type': 'Address',
//       id: 1,
//       address: "Convertr Media 6-8, St. John's Square",
//       city: 'London',
//       postcode: 'EC1M 4NH',
//       updatedTs: '2017-04-03T10:01:27+00:00',
//     };

//     service.getAdvertisers().subscribe((advertisers: Advertiser[]) => {
//       expect(advertisers.length).toBeGreaterThan(0);
//     });

//     const advertisersRequest = httpMock.expectOne(`${service['apiUrl']}/advertisers`);
//     expect(advertisersRequest.request.method).toBe('GET');
//     advertisersRequest.flush(mockAdLdResponse);

//     const addressRequest = httpMock.expectOne(mockAdLdResponse[0].address);
//     expect(addressRequest.request.method).toBe('GET');
//     addressRequest.flush(mockAddressLdResponse);
//   });
// });

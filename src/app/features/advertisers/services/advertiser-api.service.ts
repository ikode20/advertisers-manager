import { Injectable, inject } from '@angular/core';
import { JsonLd } from '../models/json-ld.model';
import { AdvertiserLd } from '../models/advertiser-ld.model';
import { HttpClient } from '@angular/common/http';
import { AddressLd } from '../models/address-ld.model';
import { BehaviorSubject, map, mergeAll, mergeMap, switchMap, take, tap, toArray } from 'rxjs';
import { Advertiser } from '../models/advertiser.model';
import { AddressRequest } from '../models/address-request.model';
import { AdvertiserRequest } from '../models/advertiser-request.model';
import { AdvertiserWithAddress } from '../models/advertiser-with-address.model';

@Injectable({
  providedIn: 'root',
})
export class AdvertiserApiService {
  addresses: AddressLd[] = [];
  advertisers$ = new BehaviorSubject<Advertiser[]>([]);

  private readonly apiUrl = 'https://1ea1bea0-214d-4c02-8e97-d5e259ec08b2.mock.pstmn.io';
  private readonly http = inject(HttpClient);

  constructor() {
    this.getAdvertisers().subscribe();
  }

  addAdvertiser(request: AdvertiserWithAddress) {
    const addressRequest: AddressRequest = { address: request.address, city: request.city, postcode: request.postcode };
    this.createAddress(addressRequest)
      .pipe(switchMap(address => this.createAdvertiser({ ...request, addressId: address.id })))
      .subscribe();
  }

  createAdvertiser(request: AdvertiserRequest) {
    return this.http.post<AdvertiserLd>(`${this.apiUrl}/advertisers`, request).pipe(
      map(_ => this.newAdvertiser(request)),
      tap(advertiser => this.advertisers$.next([...this.advertisers$.getValue(), advertiser]))
    );
  }

  createAddress(request: AddressRequest) {
    return this.http.post<AddressLd>(`${this.apiUrl}/addresses`, request).pipe(
      map(_ => this.newAddress(request)),
      tap(addressLd => this.addresses.push(addressLd))
    );
  }

  getAdvertisers() {
    return this.http.get<JsonLd<AdvertiserLd>>(`${this.apiUrl}/advertisers`).pipe(
      map(collection => collection['hydra:member']),
      mergeAll(),
      mergeMap(advertiserLd =>
        this.getAddress(advertiserLd.address).pipe(
          tap(addressLd => this.addresses.push(addressLd)),
          map(
            (addressLd): Advertiser => ({
              ...advertiserLd,
              address: addressLd.address + ', ' + addressLd.city,
              postcode: addressLd.postcode,
            })
          )
        )
      ),
      toArray(),
      tap(advertisers => this.advertisers$.next(advertisers)),
      take(1)
    );
  }

  getAddress(addressPath: string) {
    return this.http.get<AddressLd>(`${this.apiUrl}${addressPath}`);
  }

  private newAdvertiser(request: AdvertiserRequest): Advertiser {
    const addressLd = this.addresses.find(x => x.id === request.addressId)!;
    const advertisers = this.advertisers$.getValue();
    const lastAdvertiser = advertisers.at(-1)!;
    const newAdvertiserId = lastAdvertiser.id + 1;

    return {
      ...request,
      id: newAdvertiserId,
      address: addressLd.address + ', ' + addressLd.city,
      postcode: addressLd.postcode,
    };
  }

  private newAddress(address: AddressRequest): AddressLd {
    const lastAddress = this.addresses.at(-1)!;
    const newAddressId = lastAddress.id + 1;
    return {
      ...address,
      '@context': lastAddress['@context'],
      '@type': lastAddress['@type'],
      '@id': `/addresses/${newAddressId}`,
      id: newAddressId,
      updatedTs: new Date(),
    };
  }
}

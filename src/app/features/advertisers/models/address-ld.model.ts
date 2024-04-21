export interface AddressLd {
  '@context': string;
  '@id': string;
  '@type': string;
  id: number;
  address: string;
  city: string;
  postcode: string;
  updatedTs: Date;
}

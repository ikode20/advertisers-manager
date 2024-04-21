export interface JsonLd<T> {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': T[];
  'hydra:totalItems': number;
  'hydra:view': HydraView;
}

export interface HydraView {
  '@id': string;
  '@type': string;
}

import { ILocation } from '../../interfaces';

export const fetchStoreLocation = (payload: Partial<ILocation>) => {
  const data = {
    id: Math.floor(Math.random() * 100),
    ...payload,
    ward: '',
    district: '',
    province: ''
  } as ILocation;
  return data;
};

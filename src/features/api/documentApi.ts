import { IDocument } from '../../interfaces';

export const fetchStoreDocument = (payload: Partial<IDocument>) => {
  const data = {
    id: Math.floor(Math.random() * 10),
    ...payload,
    download: 0,
    url: '#'
  } as IDocument;
  return data;
};

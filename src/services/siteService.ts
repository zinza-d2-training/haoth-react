import { ILocation } from '../interfaces/interface';
import { axioInstance, axiosInstanceToken } from '../utils/request/httpRequest';

export const findAll = async (): Promise<ILocation[]> => {
  try {
    const res = await axioInstance.get<ILocation[]>('sites');
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const update = async (
  id: number,
  data: Partial<ILocation>
): Promise<ILocation> => {
  try {
    const res = await axiosInstanceToken.patch<ILocation>(`sites/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const create = async (data: Partial<ILocation>): Promise<ILocation> => {
  try {
    const res = await axiosInstanceToken.post<ILocation>('sites', data);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

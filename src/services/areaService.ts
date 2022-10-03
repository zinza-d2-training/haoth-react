import { IDistrict, IProvince, IWard } from '../interfaces/interface';
import { axioInstance } from '../utils/request/httpRequest';

export const findAllProvinces = async (): Promise<IProvince[]> => {
  try {
    const res = await axioInstance.get('provinces');
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const findDistricts = async (id: number): Promise<IDistrict[]> => {
  try {
    const res = await axioInstance.get(`provinces/${id}`);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export const findWards = async (id: number): Promise<IWard[]> => {
  try {
    const res = await axioInstance.get(`districts/${id}`);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

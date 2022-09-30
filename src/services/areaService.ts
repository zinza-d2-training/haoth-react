import httpRequest from '../utils/request/httpRequest';

export const findAllProvinces = async () => {
  try {
    const res = await httpRequest.get('provinces');
    return res;
  } catch (error) {
    throw new Error();
  }
};

export const findDistricts = async (id: number) => {
  try {
    const res = await httpRequest.get(`provinces/p/${id}`);
    return res;
  } catch (error) {
    throw new Error();
  }
};

export const findWards = async (id: number) => {
  try {
    const res = await httpRequest.get(`provinces/d/${id}`);
    return res;
  } catch (error) {
    throw new Error();
  }
};

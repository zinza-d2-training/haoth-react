import { IUserLogin, IUserRegister } from '../interfaces/interface';
import httpRequest from '../utils/request/httpRequest';

export const register = async (data: IUserRegister) => {
  try {
    const res = await httpRequest.post('auth/register', data);
    return res;
  } catch (error) {
    throw new Error();
  }
};

export const login = async (data: IUserLogin) => {
  try {
    const res = await httpRequest.post('auth/login', data);
    return res;
  } catch (error) {
    throw new Error();
  }
};

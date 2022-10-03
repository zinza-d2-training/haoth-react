export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  identifyCard: string;
  birthday: Date;
  gender: number;
  wardId: number;
  type: number;
  tokenResetPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  identifyCard: string;
  birthday: Date;
  gender: number;
  wardId: number;
}

export interface IResponseLogin {
  user: Partial<IUser>;
  token: string;
}

export interface IProvince {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDistrict {
  id: number;
  provinceId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IWard {
  id: number;
  districtId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

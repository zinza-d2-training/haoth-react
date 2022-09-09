export interface IWard {
  label: string;
  code: number;
  name: string;
  codename: string;
  division_type: string;
  district_code: number;
}
export interface IDistrict {
  label: string;
  code: number;
  wards?: IWard[];
  name: string;
  codename: string;
  division_type: string;
  province_code: number;
}
export interface IProvince {
  label: string;
  code: number;
  districts?: IDistrict[];
  name: string;
  codename: string;
  division_type: string;
  phone_code: number;
}
export interface IDataChart {
  date: string;
  total: number;
}

export interface ILocation {
  id: number;
  name: string;
  street: string;
  ward: string;
  district: string;
  province: string;
  leader: string;
  table: number;
}
export interface IDataAutocomplete {
  label: string;
}

export interface IGroup {
  id: number;
  label: string;
}
export interface IShift {
  id: number;
  label: string;
}

export interface IVaccineRegistrationInfo {
  id: number;
  userId: string;
  group: string;
  cardInsurance: string;
  job: string;
  workplace: string;
  address: string;
  time: string;
  shift: string;
}
export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  province: string;
  district: string;
  ward: string;
  card: string;
  gender: string;
  birthday: string;
}

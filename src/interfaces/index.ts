export interface IWard {
  code: number;
  name: string;
  codename: string;
  division_type: string;
  district_code: number;
}
export interface IDistrict {
  code: number;
  wards?: IWard[];
  name: string;
  codename: string;
  division_type: string;
  province_code: number;
}
export interface IProvince {
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

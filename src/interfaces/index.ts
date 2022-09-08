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

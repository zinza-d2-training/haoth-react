import { IDistrict, IProvince, IWard } from '../interfaces';

export const listProvinces: IProvince[] = [
  {
    code: 1,
    districts: [],
    name: 'Hà Nội',
    codename: 'thanh_pho_ha_noi',
    division_type: 'thành phố trung ương',
    phone_code: 24
  },
  {
    code: 2,
    districts: [],
    name: 'Hà Nam',
    codename: 'thanh_pho_ha_nam',
    division_type: 'thành phố trung ương',
    phone_code: 23
  },
  {
    code: 3,
    districts: [],
    name: 'Hải Phòng',
    codename: 'thanh_pho_hai_phong',
    division_type: 'thành phố trung ương',
    phone_code: 25
  }
];
export const listDistricts: IDistrict[] = [
  {
    code: 1,
    wards: [],
    name: 'Quận Ba Đình',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 1
  },
  {
    code: 2,
    wards: [],
    name: 'Quận Hoàn Kiếm',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 1
  },
  {
    code: 3,
    wards: [],
    name: 'Quận Hai Bà Trưng',
    division_type: 'quận',
    codename: 'quan_hai_ba_trung',
    province_code: 1
  },
  {
    code: 4,
    wards: [],
    name: 'Huyện Bình Lục',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 5,
    wards: [],
    name: 'Huyện Kim Bảng',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 6,
    wards: [],
    name: 'Huyện lý Nhân',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 7,
    wards: [],
    name: 'Quận Ba Đình',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 3
  },
  {
    code: 8,
    wards: [],
    name: 'Quận Quang Nam',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 3
  }
];
export const listWards: IWard[] = [
  {
    code: 1,
    name: 'Xã 1',
    division_type: 'xa',
    codename: 'xa_1',
    district_code: 1
  },
  {
    code: 2,
    name: 'Xã 2',
    division_type: 'xa',
    codename: 'xa_2',
    district_code: 2
  },
  {
    code: 3,
    name: 'Xã 3',
    division_type: 'xa',
    codename: 'xa_3',
    district_code: 3
  },
  {
    code: 4,
    name: 'Xã 4',
    division_type: 'xa',
    codename: 'xa_4',
    district_code: 4
  },
  {
    code: 5,
    name: 'Xã 5',
    division_type: 'xa',
    codename: 'xa_5',
    district_code: 5
  },
  {
    code: 6,
    name: 'Xã 6',
    division_type: 'xa',
    codename: 'xa_6',
    district_code: 6
  },
  {
    code: 7,
    name: 'Xã 7',
    division_type: 'xa',
    codename: 'xa_7',
    district_code: 7
  },
  {
    code: 8,
    name: 'Xã 8',
    division_type: 'xa',
    codename: 'xa_8',
    district_code: 8
  }
];

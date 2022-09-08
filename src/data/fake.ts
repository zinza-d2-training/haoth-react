import {
  IDataChart,
  IDistrict,
  ILocation,
  IProvince,
  IWard
} from '../interfaces';

export const listProvinces: IProvince[] = [
  {
    code: 1,
    districts: [],
    name: 'Thành Phố Hà Nội',
    label: 'Thành Phố Hà Nội',
    codename: 'thanh_pho_ha_noi',
    division_type: 'thành phố trung ương',
    phone_code: 24
  },
  {
    code: 2,
    districts: [],
    name: 'Hà Nam',
    label: 'Hà Nam',
    codename: 'thanh_pho_ha_nam',
    division_type: 'thành phố trung ương',
    phone_code: 23
  },
  {
    code: 3,
    districts: [],
    name: 'Hải Phòng',
    label: 'Hải Phòng',
    codename: 'thanh_pho_hai_phong',
    division_type: 'thành phố trung ương',
    phone_code: 25
  }
];
export const listDistricts: IDistrict[] = [
  {
    code: 1,
    wards: [],
    label: 'Quận Cầu Giấy',
    name: 'Quận Cầu Giấy',
    division_type: 'quận',
    codename: 'quan_cau_giay',
    province_code: 1
  },
  {
    code: 2,
    wards: [],
    name: 'Quận Hoàn Kiếm',
    label: 'Quận Hoàn Kiếm',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 1
  },
  {
    code: 3,
    wards: [],
    name: 'Quận Hai Bà Trưng',
    label: 'Quận Hai Bà Trưng',
    division_type: 'quận',
    codename: 'quan_hai_ba_trung',
    province_code: 1
  },
  {
    code: 4,
    wards: [],
    name: 'Huyện Bình Lục',
    label: 'Huyện Bình Lục',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 5,
    wards: [],
    name: 'Huyện Kim Bảng',
    label: 'Huyện Kim Bảng',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 6,
    wards: [],
    name: 'Huyện lý Nhân',
    label: 'Huyện lý Nhân',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 7,
    wards: [],
    name: 'Quận Ba Đình',
    label: 'Quận Ba Đình',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 1
  },
  {
    code: 8,
    wards: [],
    name: 'Quận Quang Nam',
    label: 'Quận Quang Nam',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 3
  }
];
export const listWards: IWard[] = [
  {
    code: 1,
    name: 'Xã 1',
    label: 'Xã 1',
    division_type: 'xa',
    codename: 'xa_1',
    district_code: 1
  },
  {
    code: 2,
    name: 'Xã 2',
    label: 'Xã 2',
    division_type: 'xa',
    codename: 'xa_2',
    district_code: 2
  },
  {
    code: 3,
    name: 'Xã 3',
    label: 'Xã 3',
    division_type: 'xa',
    codename: 'xa_3',
    district_code: 3
  },
  {
    code: 4,
    name: 'Xã 4',
    label: 'Xã 4',
    division_type: 'xa',
    codename: 'xa_4',
    district_code: 4
  },
  {
    code: 5,
    name: 'Xã 5',
    label: 'Xã 5',
    division_type: 'xa',
    codename: 'xa_5',
    district_code: 5
  },
  {
    code: 6,
    name: 'Xã 6',
    label: 'Xã 6',
    division_type: 'xa',
    codename: 'xa_6',
    district_code: 6
  },
  {
    code: 7,
    name: 'Xã 7',
    label: 'Xã 7',
    division_type: 'xa',
    codename: 'xa_7',
    district_code: 7
  },
  {
    code: 8,
    name: 'Xã 8',
    label: 'Xã 8',
    division_type: 'xa',
    codename: 'xa_8',
    district_code: 8
  }
];

export const dataChart: IDataChart[] = [
  {
    date: '07/08',
    total: 183713
  },
  {
    date: '08/08',
    total: 184924
  },
  {
    date: '09/08',
    total: 451428
  },
  {
    date: '10/08',
    total: 486115
  },
  {
    date: '11/08',
    total: 635135
  },
  {
    date: '12/08',
    total: 619648
  },
  {
    date: '13/08',
    total: 311386
  },
  {
    date: '14/08',
    total: 152167
  },
  {
    date: '15/08',
    total: 306398
  }
];

export const dataLocation: ILocation[] = [
  {
    id: 1,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 2,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 3,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 4,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 5,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 6,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 7,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Hà Nam',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 8,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Hà Nam',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 9,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 10,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Xã 2',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 11,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 12,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 13,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 14,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 15,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Cầu Giấy',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 16,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Xã 1',
    district: 'Quận Cầu Giấy',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 17,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 18,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  }
];

import { IVaccineRegistrationInfo } from '../../interfaces';
import { listUsers } from '../../data/fake';
import { IUser } from '../../interfaces';
export type InfoUser = Partial<IUser>;
export interface UserResponse {
  user: InfoUser;
  token: string;
}
export const fetchLogin = (payload: InfoUser) => {
  return new Promise<{ data: UserResponse }>((resolve, rejected) => {
    setTimeout(() => {
      const res = listUsers.find((user) => {
        return (
          user.email === payload.email && user.password === payload.password
        );
      });
      if (res) {
        const { password, ...others }: InfoUser = res;
        resolve({ data: { user: others, token: '' + Date.now() } });
      } else {
        rejected();
      }
    }, 500);
  });
};
export const fetchForgotPassword = (email: string) => {
  return new Promise<{ data: string }>((resolver) => {
    setTimeout(() => {
      resolver({ data: 'Xem email cua ban' });
    }, 2000);
  });
};

export const fetchRegistration = (payload: IVaccineRegistrationInfo) => {
  return new Promise<{ data: IVaccineRegistrationInfo }>((resolver) => {
    setTimeout(() => {
      resolver({
        data: payload
      });
    }, 1000);
  });
};
export const fetchUser = (id: string) => {
  const res = listUsers.find((user) => user.id === id);
  if (res) {
    const { password, ...others }: InfoUser = res;
    return others;
  }
};

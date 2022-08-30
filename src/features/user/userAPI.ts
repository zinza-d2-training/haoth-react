export interface User {
  id: string;
  email: string;
  password: string;
}
export type InfoUser = Partial<User>;
export interface UserResponse {
  user: InfoUser;
  token: string;
}
export const listUsers: User[] = [
  {
    id: 'sadjsabass',
    email: 'user1@gmail.com',
    password: '123456789'
  },
  {
    id: 'fadgsvhbj',
    email: 'user2@gmail.com',
    password: '123456789'
  }
];
export const fetchLogin = (payload: InfoUser) => {
  return new Promise<{ data: UserResponse }>((resolve, rejected) => {
    setTimeout(() => {
      const res = listUsers.find((user) => {
        return (
          user.email === payload.email && user.password === payload.password
        );
      });
      if (res) {
        const { password, ...others }: any = res;
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

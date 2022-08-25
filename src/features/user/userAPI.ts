export interface User {
  id?: string;
  email?: string;
  password?: string;
  token?: string;
}
export const listUsers: User[] = [
  {
    id: 'sadjsabass',
    email: 'user1@gmail.com',
    password: '123456789',
    token: 'tokenuser1'
  },
  {
    id: 'fadgsvhbj',
    email: 'user2@gmail.com',
    password: '123456789',
    token: 'tokenuser2'
  }
];
export const fetchLogin = (payload: User) => {
  return new Promise<{ data: User }>((resolve, rejected) => {
    setTimeout(() => {
      const res = listUsers.filter((user) => {
        return (
          user.email === payload.email && user.password === payload.password
        );
      });
      res.length === 1 && resolve({ data: res[0] });
      rejected();
    }, 500);
  });
};

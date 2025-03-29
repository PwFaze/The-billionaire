export type User = {
  id: string;
  username: string;
  email: string;
  userType: "buyer";
};

export type CreateOrLoginUserRequest = {
  username: string;
  password: string;
};

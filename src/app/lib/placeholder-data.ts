 export const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'User',
      email: 'user@nextmail.com',
      password: '123456',
    },
  ];

  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  export type CheckUserState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
      email?: string
    }
  | undefined

  


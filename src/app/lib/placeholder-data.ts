import { z } from 'zod';
 
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
    username:string
  };
  
 

 
  export const SignupFormSchema = z.object({
    username: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
   
  export type SignupFormState =
         { username?: string[]
          email?: string[]
          message?: string
        }   
    | undefined;


   export const CheckUserSchema = z.object({
      email: z
      .string().email({message: 'Please enter a valid email.' }).trim(),
      username: z
      .string().email({message: 'Please enter a valid email.' }).trim()
    })

    export type CheckUserState =
    | {
      id: string;
      name: string;
      email: string;
      password: string;
      username:string
      }
    | undefined
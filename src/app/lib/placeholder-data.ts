import { z } from 'zod';
 
  {/* for sign up start here*/}
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

export type SignupFormState ={
   username?: string[]
   email?: string[]
   message?: string
} | undefined;

export type User = {
   id: string;
   name: string;
   email: string;
   password: string;
   username:string
};
  {/**********/}

 {/*to start chat*/}
 export type userCheckState = {
   message?: string
   }| undefined

export const CheckUserSchema = z.object({
   email: z
   .string().email({message: 'Please enter a valid email.' }).trim(),
   initiatingUserId: z
   .string()
   .transform((val) => parseInt(val, 10))
   .refine((val) => !isNaN(val),
   {message: 'Please enter a valid email.'})
   })

export interface checkUser {
      id: number;
      email: string;
      username: string;
      password_hash: string;
      created_at: Date;
    }
     {/*******/}

{/*for fetchchart component use for building chat list */}
 export type chatDataState = {
   conversation_id?:number
   username?:string
 }
/*********** */


    export type CheckUserState =
    | {
      id: string;
      name: string;
      email: string;
      password: string;
      username:string;
      message: string
      }
    | undefined;

    export type ChatMessage = {
      id: number;
      message: string;
      timestamp: string;
      name: string;
      sender_id: string;
      receiver_id: string; 
      conversation_id? : number,
      username : string
   }
   

   {/*to insert message*/}
   export const MessageSchema = z.object({
      content: z
      .string(),
      conversation_id: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val),
      {message: 'Please enter a valid email.'}),
       userID: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val),
      {message: 'Please enter a valid email.'}
      )
      })

{/*chat view state*/}

export type chatViewState = {
   conversation_id?:number
   user_id?:number,
   content?:string
 }

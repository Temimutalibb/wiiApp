'use server';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { signIn } from "../../../auth";
import { chatUser } from './data';
import { CheckUserState } from './placeholder-data';

export async function authenticate( 
  prevState: string | undefined, 
formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
  } 

  
const CheckUserSchema = z.object({
  email: z
  .string().email({message: 'Please enter a valid email.' }).trim()
})

  export async function authenticateChatUser( state: CheckUserState, formData : FormData){
      const validatedFields = CheckUserSchema.safeParse({
        email:formData.get('email')
      })

      if(!validatedFields.success){
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }
      const {email} = validatedFields.data
      const user = await chatUser(email);
      console.log(user)
      if (!user) {
        return {
          message: 'user does not exist'
        }
    }else{
      return {
        message: 'true'
      }
    }
    
  }
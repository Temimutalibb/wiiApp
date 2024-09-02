'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';
import { signIn } from "../../../auth";
import { CheckUserSchema, CheckUserState, SignupFormSchema, SignupFormState, User } from './placeholder-data';


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
 
export async function signupAction(  state: SignupFormState, formData: FormData){
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const { username, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  try{
  const userCheck = await sql<User>`SELECT * FROM users WHERE email=${email}`;
  const user =  userCheck.rows[0]
   if(user){
    return {
      message: "Email or username exist"
    }
   }
   console.log("submitti...")
  const insertData = await sql<User>`INSERT INTO users ( name, email, password)
    VALUES (  ${username}, ${email}, ${hashedPassword})
    RETURNING*
     `;
     const data =  insertData.rows[0].email
    if(data){
      return{
        success: "Registration sucessful, login to continue."
      }
    
    }
 }catch(error){
      return {
        message: "Something went wrong."
      }
  }
}

 


export async function authenticateChatUser(prevState:CheckUserState, formData: FormData){
  
  const validatedFields = CheckUserSchema.safeParse({
    email: formData.get('email'),
    username: formData.get('username')
  })

  if(validatedFields.success) {
    const {email,username} = validatedFields.data
    console.log(username)
    const userCheck = await sql<any>`SELECT * FROM users WHERE email=${email}`;
    const user =  userCheck.rows[0];
    console.log(user)
    if(user){ 
    const insertData = await sql<User>`INSERT INTO messages (
    sender_id, receiver_id, message)
    VALUES (${username}, ${email}, ${""})
    RETURNING*`;

    const data =  insertData.rows[0].email
    if(data)

     return user
  if(!validatedFields.success){
    console.log("error")
  }
 
}
return undefined;
  }
}
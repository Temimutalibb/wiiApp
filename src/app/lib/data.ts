import { sql } from '@vercel/postgres';
import { User } from './placeholder-data';

export async function fetchUser(){
  try{
    const data = await sql<User>`SELECT *  FROM users`
    return data.rows[0]
  }catch(error){
     console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data');
  }
}

export async function chatUser(email: string): Promise<User | undefined>{
 try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


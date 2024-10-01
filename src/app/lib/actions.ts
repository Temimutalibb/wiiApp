"use server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { signIn, signOut } from "../../../auth";
import {
  ChatMessage,
  chatViewState,
  checkUser,
  CheckUserSchema,
  MessageSchema,
  SignupFormSchema,
  SignupFormState,
  User,
  userCheckState,
} from "./placeholder-data";

{
  /*login authentification*/
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

//sign out method .........
export async function signout() {
  try {
    await signOut();
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

//sigup athentification
export async function signupAction(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const userCheck = await sql<User>`SELECT * FROM users WHERE email=${email}
     OR username = ${username}`;
    const user = userCheck.rows[0];
    if (user) {
      return {
        message: "Email or username exist",
      };
    }

    const insertData =
      await sql<User>`INSERT INTO users ( username, email, password)
     VALUES (  ${username}, ${email}, ${hashedPassword})
     RETURNING* `;

    const data = insertData.rows[0].email;

    if (data) {
      return {
        success: "Registration sucessful, login to continue.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong.",
    };
  }
}

interface Conversation {
  id: number;
  created_at: Date;
}

//to check if reciever exist*
export async function authenticateChatUser(
  prevState: userCheckState,
  formData: FormData
) {
  const validatedFields = CheckUserSchema.safeParse({
    email: formData.get("email"),
    initiatingUserId: formData.get("initiatingUserId"),
  });

  if (validatedFields.success) {
    const { email, initiatingUserId } = validatedFields.data;
    try {
      const userCheck =
        await sql<checkUser>`SELECT * FROM users WHERE email= ${email}`;
      const user = userCheck.rows[0];
      if (!user) {
        return {
          message: " user is not on wii",
        };
      }

      const receiverID = user.id;

      const conversationResultID = await sql<Conversation>`INSERT INTO 
        conversations (created_at) VALUES (CURRENT_TIMESTAMP) RETURNING id`;

      const conversationId = conversationResultID.rows[0].id;

      const conversationResult = await sql<{
        id: number;
      }>`INSERT INTO conversation_user(
        sender,receiver,conversationId) VALUES (${initiatingUserId}, ${receiverID}, ${conversationId}),(${receiverID},
         ${initiatingUserId},${conversationId})
        ON CONFLICT (sender, receiver) DO NOTHING RETURNING id`;

      if (conversationResult.rows.length > 0) {
        const conversationId = conversationResult.rows[0].id;
        console.log(conversationId);

        revalidatePath("/chat");
        return {
          message: "available",
        };
      } else {
        revalidatePath("/chat");
        console.log("there was conflict");
        return {
          message: "available",
        };
      }
    } catch (error) {
      console.log("error connecting ", error);
      return {
        message: "unsucessful",
      };
    }
  }
  if (!validatedFields.success) {
    console.log("error validating");
    return {
      message: "emailfail",
    };
  }
}

//for fetchdata componet use for chat lists
export async function fetchChatData(
  id: any | undefined
): Promise<ChatMessage[]> {
  try {
    const userCheck = await sql<ChatMessage>`SELECT 
         c.conversationId AS conversation_id,
         u.id AS receiver_id,
         u.username
         FROM conversation_user c
         JOIN "users" u ON c.receiver = u.id
         WHERE c.sender = ${id};`;
    const users = userCheck.rows;
    if (users) {
      return users;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return [];
  }
}

{
  /*for inserting the messages*/
}
export async function message(formData: FormData) {
  const validatedFields = MessageSchema.safeParse({
    conversation_id: formData.get("conversation_id"),
    content: formData.get("content"),
    userID: formData.get("userID"),
  });
  if (validatedFields.success) {
    const { conversation_id, content, userID } = validatedFields.data;
    console.log(conversation_id, content, userID);

    try {
      await sql`INSERT INTO messages(conversation_id, user_id, content,
       created_at) VALUES (${conversation_id},${userID}, ${content},(CURRENT_TIMESTAMP))`;

      revalidatePath(`/chat/`);
    } catch (error) {
      console.log("catch error", error);
    }
  }
  if (!validatedFields.success) {
    console.log("validation error");
  }
}

{
  /*to get the messages*/
}

export async function getMessages(
  id: any | undefined
): Promise<chatViewState[]> {
  try {
    const userCheck = await sql<chatViewState>`SELECT * FROM messages
         WHERE conversation_id = ${id};`;
    const users = userCheck.rows;
    if (users) {
      return users;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return [];
  }
}

export async function fetchcookie() {
  const cookiesStore = cookies();
  const userEmail = cookiesStore.get("userEmail")?.value;
  return userEmail;
}

export async function getUserId(
  email: string | undefined
): Promise<string | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const data = user.rows[0];
    return data.id;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function test(formData: FormData) {
  const email = formData.get("email");
  const initiatingUserId = formData.get("initiatingUserId");
}

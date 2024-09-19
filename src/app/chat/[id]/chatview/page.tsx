

import ChatViewCard from "@/app/ui/dashboard/chatviewcard";
import { cookies } from "next/headers";



  export default async function  ChatView(){
    const cookiesStore = cookies();
    const userId    =  cookiesStore.get('userId')?.value;
    
    return (
      <>
      <ChatViewCard userID={userId}/>
      </>
    )
  }
 
    




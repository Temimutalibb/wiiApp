
import { cookies } from "next/headers";
import { Suspense } from "react";
import Card from "../ui/dashboard/cards";
import FetchChart from "../ui/dashboard/fetchchart";
import { CardSkeleton } from "../ui/skeletons";

 async function Chat(){
    const cookiesStore = cookies();
    const userEmail =  cookiesStore.get('userEmail')?.value;
    const UserId    =  cookiesStore.get('userId')?.value;
    const hasCookie = cookiesStore.has('userId')


    return (
     <>
         <Suspense fallback={<CardSkeleton/>}>
         <FetchChart UserId= {UserId}/>
         </Suspense>
         <Card userID={UserId}/>
         
      </>
   );
}

export default Chat;
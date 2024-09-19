'use client'
import { fetchChatData } from '@/app/lib/actions';
import { chatDataState } from '@/app/lib/placeholder-data';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default  function FetchChart({UserId} : {UserId:string | undefined}){
const [chatData, setChatData] = useState<chatDataState[]>([]);

useEffect(() => {
   const fetchData = async ()=>{
   const data  =  await fetchChatData(UserId)
   setChatData(data)
   } 
   fetchData()
},[UserId])




useEffect(() => {
   let interval: any;
   if(UserId){
      const fetchData = async ()=>{
         const data  =  await fetchChatData(UserId)
         setChatData(data)
         } 

          // Set up polling interval
      interval = setInterval(fetchChatData, 5000); // Poll every 5 seconds
   
       // Fetch initial data
       fetchData();
   }
   return () => {
      if (interval) {
        clearInterval(interval);
      }
    };

}, [UserId])


return (
   <>
<div className='w-[100%]'>
 <ul role="list" className="p-6 divide-y divide-slate-400 bg-green-100">
    { chatData?.map(({conversation_id,username})=>(
  <Link className="flex py-4 first:pt-0 last:pb-0" key={conversation_id}
    
    href={`/chat/${conversation_id}/chatview`}
    passHref>
   <Image
       className="h-12 w-12 rounded-full border-2 border-green-300  items-center"
       src= ""
       alt="dp"
       width={500}
       height={300}
     />

<div className="ml-3 overflow-hidden">
       <p className="text-sm font-medium text-slate-900">{username}</p>
       <p className="text-sm text-slate-500 truncate">{}</p>
     </div>

     <div
      className='ml-auto'><EllipsisHorizontalIcon className = "text-green-700 size-9 cursor-pointer"/></div>
    
  </Link>
))}
</ul>
</div>
   </>
);
}
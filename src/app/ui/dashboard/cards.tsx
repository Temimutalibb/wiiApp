"use client"
import { authenticateChatUser } from '@/app/lib/actions';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Bars3Icon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';


export default  function Card(){

  const chatArray =[{id:1,name:"temi",src:"/temi"},{id:2,name:"wale",src:"/wale"},{id:3,name:"tunji",src:"/tunji"}]

  const[showChart, setShowChart] = useState(false)
  const[state, action] = useFormState(authenticateChatUser, undefined)
  const[confirm, setConfirm] = useState("");
  const[chatArrayState,setChatArrayState] = useState(chatArray)
  
  const username = 'user@nextmail.com';
 
  
  
 useEffect(() => {
  if(state){
    setConfirm("available");
    setChatArrayState((prev) => [...prev, state])
    setShowChart(false)
  }else if(!state){
    setConfirm("")
  }else{
    setConfirm("user does not exist")
  }
 },[state])
  

 return (
    <>
   <div className='flex flex-row justify-between relative'>
   <div><Bars3Icon className = "text-green-700 size-9"/></div>
   <div>{ username}</div>
   <div>logo</div>
   </div>
    
 <ul  role="list" className="p-6 divide-y divide-slate-400 bg-green-100">
    {chatArrayState?.map(({id,src,name}) => (
      <li className="flex py-4 first:pt-0 last:pb-0" key={id}>
        <Image
          className="h-10 w-10 rounded-full border-2 border-green-300"
          src={src}
          alt="profile picture"
          width={500}
          height={300}
        />
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-slate-900">{name}</p>
          <p className="text-sm text-slate-500 truncate">{"wale"}</p>
        </div>
      </li>
    ))}
  </ul>
 
  <div className={`w-1/2 h-auto  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${showChart? "" : "hidden" }`}>
  <form  action={action} className="bg-gray-400 px-6 pb-4 pt-8 flex-1 ">
    <input 
     className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
     type ="email"
     name='email'
     placeholder='name or email'
     required
    />
    <input className= "hidden"
    type ="email"
    name='username'
    value = {username}
    />

    {confirm}
     <button onClick={()=>setConfirm("checking...")}
     className="btn mx-auto block bg-green-500 justify-center w-1/2 mt-4 h-9"
     type="submit">continue
     </button>
   </form>
  </div>


    <div onClick={()=> setShowChart(!showChart)}
    className='rounded-full bg-green-500 w-22 hover:bg-green-400 absolute bottom-4 right-4' title="start chat"> 
    <div><PlusIcon className='text-gray-200 size-20 m-auto'/></div>
    </div>
       </>
 )
}

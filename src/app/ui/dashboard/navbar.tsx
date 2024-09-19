'use client'
import { signout } from "@/app/lib/actions";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
export default function Navbar({username }:{username:string | undefined}){
    const[showLeftBar, setShowLeftar] = useState(true)

    return(
    <>
       <div className={`flex-col row-span-3  ${showLeftBar? "hidden" : ""} bg-green-100 md:block `}>
          <div className="mb-2 flex h-20  items-end justify-start rounded-md bg-green-400">
               {/*advert*/} 
          </div>
          <div className="justify-center flex">
             <Image className="rounded-full w-32 h-32 border-2 border-green-300 flex justify-center items-center"
               src= ""
               alt="picture"
               width={500}
               height={300}
              />
          </div>
          <div className="flex justify-center  p-5 mt-[100%]">
             <form  action={signout} >
                <button className="text-green-900">
                    Signout
                </button>
             </form>
          </div>
       </div>

       <div  className={`${showLeftBar? "col-start-2" : "col-start-2"} col-end-9 mr-6 sticky top-0  md:col-start-2 md:mr-0`}>
             <div className='flex flex-row justify-between px-5 py-2 bg-green-300'>
                <div  onClick={(e)=>{
                   e.preventDefault()
                   setShowLeftar(!showLeftBar)
                }}
                className={`md:invisible md:disabled`}>
                { showLeftBar ? (<>
                <Bars3Icon className = "text-green-700 size-9 cursor-pointer hover:text-green-500 "/>
                </>) :
               (<><span className ="text-red-500 text-4xl cursor-pointer"> x</span></>) } 
               </div>
               <div className='bg-green-100 text-gray-400 cursor-pointer px-6 py-1'>{username}</div>
               <div className='text-green-900 cursor-pointer'>WiiApp</div>
         </div>
      </div>
    </>
    )
}
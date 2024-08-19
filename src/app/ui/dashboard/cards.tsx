import { Bars3Icon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { signOut } from '../../../../auth';
import { StartChart } from './startchat';

export default async function CardWrapper() {

    { /*const users = await fetchUser() ;
    const user = users.map((user) => {
        return user.email
    }) */}
    return(
    <>
    <Bars3Icon className = "size-9"/>
    < Cards userName = {'user@nextmail.com'}/>
    <form
         action={async () => {
          'use server';
          await signOut();
        }}
        >
          <button className="bg-sky-500 hover:bg-sky-700 ...">
            Sign Out
          </button>
        </form>
    </>
    )
}

export  function  Cards({userName} : {userName:string[] | string}){
    return (
        <>
   <ul role="list" className="p-6 divide-y divide-slate-200">
    <li className="flex py-4 first:pt-0 last:pb-0">
      <Image className="h-10 w-10 rounded-full"
       src="/IMG_6360.png" 
       alt="personimage"
       width ={500}
       height={300}
        />
      <div className="ml-3 overflow-hidden">
        <p className="text-sm font-medium text-slate-900">{userName}</p>
        <p className="text-sm text-slate-500 truncate">{userName}</p>
      </div>
    </li>
</ul>
       <StartChart/>
     </>
    )
}

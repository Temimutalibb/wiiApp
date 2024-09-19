"use client"
import { authenticateChatUser } from '@/app/lib/actions';
import { PlusIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';



export default  function Card({userID}:{userID: string | undefined}){
  const[showChart, setShowChart] = useState(true)
  const[state, action] = useFormState(authenticateChatUser, undefined)
  const[confirm, setConfirm] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const[email, setEmail] = useState("")


  {/* to check if input is empty*/}
  const isFormDataEmpty = (formData:any) => {
   return Object.values(formData).every(value => value === '');
}
  const handleSubmit =()=> {
   if (isFormDataEmpty(email)){
      alert('Please fill out all fields.');
      return;
   }
   setIsLoading(true)
   setConfirm("");
 }
  
  const handleChange = (event: any) => {
   setEmail(event.target.value)
  }


  useEffect(() => {
   if (state) {
     setIsLoading(false);
     setConfirm(state?.message);
     setShowChart(true);
     setConfirm("");
   }else if(!state){
      setConfirm("")
   }else{
      setConfirm("something went wrong")
   }
    }, [state])

return(
   <>
   
   <div className={`w-1/2 h-auto  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${showChart? "hidden" : "" }`}>
      <form action={action} className="bg-gray-400 px-6 pb-4 pt-8 flex-1 ">
         <input 
         className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
         type ="email"
         name='email'
         placeholder='name or email'
         onChange={handleChange}
         value = {email}
         required
         />
         <input className= "hidden"
         type ="text"
         name='initiatingUserId'
         value = {userID}
         required
         />
         <div className='text-center text-brown-900'>{confirm}</div>
         <button onClick={handleSubmit}
          className="btn mx-auto block bg-green-300 justify-center w-1/2 mt-4 h-9 hover:bg-green-200"
          type="submit">
            {isLoading ? 'checking...' : 'continue'}
         </button>
      </form>
   </div>


   <div onClick= {()=> setShowChart(!showChart)}
    className='rounded-full bg-green-500 w-22 hover:bg-green-400 absolute bottom-4 right-4' title="start chat"> 
    <div><PlusIcon className='text-gray-200 size-20 m-auto'/></div>
    </div>
   </>
)
}
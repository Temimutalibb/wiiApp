'use client'
import { authenticateChatUser } from '@/app/lib/actions';
import { useFormState } from "react-dom";

export function StartChart(){
    const[state,action, pending] = useFormState(authenticateChatUser, undefined)
    return(
        <>

        <form action ={action}>
            <div>
         <input type ="email" 
         id="email" 
         name ="email"
         placeholder='input user username or email'
         />
         </div>
          <button className="bg-sky-500 hover:bg-sky-700 ..." aria-disabled={pending} type="submit">
          {pending ? 'Submitting...' : 'start chat'}
          </button>

          {state?.message}
          {pending}
        </form>
        </>
    )
}
import { cookies } from "next/headers";



 const fetchcookie = async ()=>{
const cookiestore = cookies()
const fetchstore  =  cookiestore.get('name');
return fetchstore;
}


export const chatCookies = () =>{
   const fetchcookies = fetchcookie()
    return(
       {fetchcookies} 
    )
}
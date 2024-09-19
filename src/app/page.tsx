'use client'

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import styles from './home.module.css';
import { authenticate, signupAction } from "./lib/actions";

export default function Home() {
   const[formDisplay, setFormDisplay] = useState(false);
   const[isLoading, setIsLoading] = useState(false);
   const[isSubmiting, setIsSubmitting] = useState(false);
   const[errorMessage, formAction] = useFormState(authenticate, undefined,);/* for login authentication*/
   const[state, action] = useFormState(signupAction, undefined) /*for sign up authentication*/
   const[signupData, setSignupData] = useState({ username: '',email: '', password: ''
   })
   const [loginData, setLoginData] = useState({email: '',  password: ''
   })

   {/* to check if input is empty*/}
   const isFormDataEmpty = (formData:any) => {
      return Object.values(formData).every(value => value === '');
   }

   {/*methods for sign up*/}
   const handleSignupChange = (event:any) => {
      const { name, value } = event.target;
      setSignupData({
      ...signupData,
      [name]: value
      });
    };
  
   const handleSignupSubmit =()=> {
      if (isFormDataEmpty(signupData)){
         alert('Please fill out all fields.');
         return;
      }
      setIsLoading(true);
   }

   useEffect(() => {
    if (state) {
      setIsLoading(false);
    }
  }, [state])
  {/***** */}

  {/*methods for login*/}
   const handleLoginChange = (event:any) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
  
  const handleLoginSubmit =()=> {
    if (isFormDataEmpty(loginData)){
       alert('Please fill out all fields.');
       return;
    }
    setIsSubmitting(true);
 }

 useEffect(() => {
   if ( errorMessage){
    setIsSubmitting(false);
    setLoginData({email: '',  password: ''})
  }
}, [errorMessage])
 {/*** */} 

  return(
   <>
      <div className ={styles.body} >
         <div className={styles.main}>
            <div className={styles.intro}><span className="appname">WII</span><span className ="appnamechild">messaging app</span>
               <span className={styles.childone}>-Communication made easy</span>
               <span className={styles.childtwo}>-Registration is easy and free</span>
               <span className={styles.childthree}>-This is a functioning demo app</span>
            </div>
            <div>
              {formDisplay ? (
               <>
              {/*sign up*/}
              <form action={action} className={styles.form}>
                 <p className="text-red-950">{state?.message}</p>
                 <p className="text-green-950">{state?.success}</p>
                 <input className={styles.input}
                  type = "text"
                  placeholder="User-name"
                  name ="username"
                  value={signupData.username}
                  onChange={handleSignupChange}
                  required
                 />
                 {state?.errors?.username && <p>{state.errors.username}</p>}
                
                 <input className={styles.input}
                  type = "email"
                  placeholder="Email"
                  name ="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                  />
                {state?.errors?.email && <p>{state.errors.email}</p>}
       
                <input  className={styles.input}
                  type = "password"
                  placeholder="Password"
                  name = "password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                />
                  {state?.errors?.password && ( 
                <> 
                <ul className="text-red-950">
                  {state.errors.password.map((error) => (
                     <li key={error}>- {error}</li>
                   ))}
                </ul>
                 </>
                     )}
                 <button onClick={handleSignupSubmit}
                 className={styles.button} 
                 type = "submit">
                     {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                 <div>already have an account ?</div><br/>
                   <hr/>
                 <button className={styles.create} onClick={(e)=>{
                     e.preventDefault()
                     setFormDisplay(!formDisplay)} }>login
                  </button>
              </form>
            </>) :
            <>
           {/*login*/} 
           <form  className={styles.form} action= {formAction}>
              <input className={styles.input}
               id="email"
               type="email"
               name="email"
               value={loginData.email}
               onChange={handleLoginChange}
               placeholder="Enter your email address"
               required
               />
            
            <input className={styles.input}
             name = "password"
             id="password"
             type="password"
             value={loginData.password}
             onChange={handleLoginChange}
             placeholder="Enter password"
             required
             minLength={6}
             />
            <button onClick ={handleLoginSubmit}
            className={styles.button} 
             type = "submit">
              {isSubmiting ? "loading...": "login"}
            </button>
            <span 
            className="flex h-8 place-content-center"
            aria-live="polite"
            aria-atomic="true"
            >
           {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 text-center " />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
            )}
           </span>
           <div><strong>forgotten password?</strong></div><br/>
           <hr/>
           <button className={styles.create} onClick={(e)=>{
              e.preventDefault()
              setFormDisplay(!formDisplay)} }>Create account</button>
          </form>
           </>
            }
          </div>
         </div>
         <footer className={styles.footer}>by <span><a href ="https://github.com/Temimutalibb/">Mutalibb</a></span></footer>
      </div>
   </>
   );
}

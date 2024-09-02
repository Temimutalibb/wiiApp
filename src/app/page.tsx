'use client'

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useFormState } from "react-dom";
import styles from './home.module.css';
import { authenticate, signupAction } from "./lib/actions";


export default function Home() {
const[formDisplay, setFormDisplay] = useState(false);
const [errorMessage, formAction, isPending] = useFormState(
  authenticate,
  undefined,
);

const [state, action, pending] = useFormState(signupAction, undefined)
return(
   <>
   <body className ={styles.body}>
   <main className={styles.main}>
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
       />
     {state?.errors?.username && <p>{state.errors.username}</p>}
      <input className={styles.input}
      type = "email"
      placeholder="Email"
      name ="email"
       />
      {state?.errors?.email && <p>{state.errors.email}</p>}
       <input  className={styles.input}
       type = "password"
       placeholder="Password"
       name = "password"
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
       <button className={styles.button} aria-disabled={pending} 
       type = "submit">
          {pending? 'Submitting...' : 'Sign up'} 
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
      placeholder="Enter your email address"
      required
      />
      <input className={styles.input}
       name = "password"
       id="password"
       type="password"
       placeholder="Enter password"
       required
       minLength={6}
      />

      <button className={styles.button} aria-disabled={isPending}
        type = "submit">{isPending? "loading": "login"}
      </button>

      <div 
          className="flex h-8 place-content-center"
          aria-live="polite"
          aria-atomic="true"
          >
          {/* Add form errors here */}
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 text-center " />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

      <div>forgotten password?</div><br/>
       <hr/>

      <button className={styles.create} onClick={(e)=>{
       e.preventDefault()
       setFormDisplay(!formDisplay)} }>Create account</button>
   </form>
   </>
   }
   </div>
   </main>
   <footer className={styles.footer}>by <span><a href ="https://github.com/Temimutalibb/">Mutalibb</a></span>
   
   </footer>
   </body>
   </>
  );
}

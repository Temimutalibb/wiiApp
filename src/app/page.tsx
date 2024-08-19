'use client'
import { useState } from "react";
export default function Home() {
const[formDisplay, setFormDisplay] = useState(false);
return(
   <>
   <main>
   <div className="intro"><span className="appname">WII</span><span className ="appnamechild">messaging app</span>
    <span className="childone">-Communication made easy</span>
    <span className="childtwo">-Registration is easy and free</span>
    <span className="childthree">-This is a functioning demo app</span>
   </div>
   <div>
    {formDisplay ? (
      <>
      <form>
      <input type = "text"
      placeholder="User-name"
       />
       <input type = "text"
      placeholder="Password"
       />
       <button type = "submit">Sign up</button>
       <div>already have an account ?</div><br/>
       <hr/>
       <button className="create" onClick={(e)=>{
        e.preventDefault()
        setFormDisplay(!formDisplay)} }>login
        </button>
    </form></>) :
     <> <form >
     <input type = "text"
     placeholder="User-name"
     name = "username"
      />
      <input type = "text"
     placeholder="Password"
     name = "password"
      />
      <button type = "submit">Log in</button>
      <div>forgotten password?</div><br/>
       <hr/>

      <button className="create" onClick={(e)=>{
       e.preventDefault()
       setFormDisplay(!formDisplay)} }>Create account</button>
   </form></>
   }
   </div>
   </main>
   <footer>by <span><a href ="https://github.com/Temimutalibb/">Mutalibb</a></span>
   
   </footer>
   </>
  );
}

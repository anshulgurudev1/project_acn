import React  from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useState } from 'react'
import M from "materialize-css";

const Signup =()=>{
  const history=useHistory()
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const Postdata=()=>{
    fetch('/signup',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
        M.toast({html: data.error ,classes:"red"})
      }
      else{
        M.toast({html: data.message,classes:"green"})
        history.push('/Signin')
      }
    })
  }
    return(
        <div className="mycard">
            <div className="card auth-card">
               <h2 className="hadding">Acn Project</h2>
               <input
                 type="text"
                 placeholder="name"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 />
                   <input
                 type="text"
                 placeholder="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                      />
               <input
                 type="text"
                 placeholder="password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
               />
                  <button class="btn waves-effect waves-light #90caf9 blue darken-1"
                  onClick={()=>Postdata()} >Signup
                  </button>
                  <h6> <Link to="Signin">Already have an account</Link>
                   </h6>
            </div>
        </div>
    )
}
export default Signup
import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from "materialize-css";
import { Usercontext } from '../../App'

const Signin =()=>{
  const [state,dispatch]=useContext(Usercontext)
    const history=useHistory()
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const Postdata=()=>{
        fetch('/signin',{
            method:"post",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              email,
              password
            })
          }).then(res=>res.json())
          .then(data=>{
              console.log(data)
            if(data.err)
            {
              M.toast({html: data.err ,classes:"red"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
              M.toast({html: "logiedin" ,classes :"green"})
              history.push('/')
            }
          }).catch(err=>{
            console.log(err)
          })
    }
    return(
        <div className="mycard">
            <div className="card auth-card">
               <h2 className="hadding">Acn Project</h2>
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
                   onClick={()=>Postdata()} >Login
                  </button>
                  <h6> <Link to="Signup">Do not have an account</Link>
                   </h6>
            </div>
        </div>
    )
}
export default Signin 
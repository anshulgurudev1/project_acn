import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Usercontext} from '../App'
const Navbar =()=>{
  const [state,dispatch] =useContext(Usercontext)
  const history=useHistory()
     const renderList=()=>{   
       if(state){
        return [
         
          <li> <button class="btn waves-effect waves-light #90caf9 red darken-1"
          onClick={()=>{
             localStorage.clear()
             dispatch({type:"CLEAR"})
             history.push('/Signin')
          }} >Logout
         </button></li>
        ]
       }else{
          return [
            <li><Link to ="Signin">Login</Link></li>,
            <li><Link to ="Signup">Signup</Link></li>
          ]
       }
     }
    return(
        <nav>
        <div className="nav-wrapper  white">
          <Link to ={state?'/':'/Signin'} className="brand-logo">Acn Project </Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
          </ul>
        </div>
      </nav>
    )
}
export default Navbar
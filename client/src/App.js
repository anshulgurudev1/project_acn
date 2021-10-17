import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './component/navbar'
import "./App.css"
import {BrowserRouter,Route,useHistory,Switch} from 'react-router-dom'
import Home from './component/screens/Home'
import Signin from './component/screens/Signin'
import Signup from './component/screens/Signup'
import {reducer,initialState} from './reducers/userReducer'
export const Usercontext =createContext()
const Routing = ()=>{
  const history=useHistory()
  const [state,dispatch]=useContext(Usercontext)
  useEffect(()=>{
     const user =JSON.parse( localStorage.getItem('user'))
     if(user){
      dispatch({type:"USER",payload:user})
     
     }else{
       history.push('/Signin')
     }
  },[])
  return (
    <switch>
    <Route exact path ="/">
    <Home/>
    </Route>
  
    <Route path ="/Signup">
      <Signup/>
    </Route>
   
    <Route path ="/Signin">
      <Signin/>
    </Route>
   
    </switch>
  )
}
function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <Usercontext.Provider value={[state,dispatch]}>
    <BrowserRouter>
    <Navbar/>
      <Routing/>
    </BrowserRouter>
    </Usercontext.Provider>
  )
}

export default App;

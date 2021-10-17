import React,{useState,useEffect,useContext} from 'react'
import {Usercontext} from '../../App'
import { Link }  from  'react-router-dom'

const Home =()=>{
    const [data,setData]=useState([])
    const [state,dispatch]=useContext(Usercontext)
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    },[])
    const likesPost=(id)=>{
        fetch('/likes',{
            method:"PUT",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
            }).then(res=>res.json())
            .then(result=>{
                const newdata =data.map(item=>{
                    if(item._id==result._id){
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newdata)
        })
    }
    const unlikesPost=(id)=>{
        fetch('/unlikes',{
            method:"PUT",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
            }).then(res=>res.json())
            .then(result=>{
             const newdata =data.map(item=>{
                 if(item._id==result._id){
                     return result
                 }
                 else{
                     return item
                 }
             })
             setData(newdata)
        })
    }
    const makecomment=(text,postId)=>{
        fetch('/comment',{
            method:"PUT",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
         const newdata =data.map(item=>{
             if(item._id==result._id){
                 return result
             }
             else{
                 return item
             }
         })
         setData(newdata)
    }).catch(err=>{
        console.log(err)
    })

    }
    const deletePost=(postId)=>{
           fetch(`/deletepost/${postId}`,{
               method:"DELETE",
               headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               const newdata =data.filter(item=>{
                   return item._id !== result._id
               })
               setData(newdata)
           })
           
    }
    return(
        <div className="home">
        <h2 className="hadding">Welcome to acn Project home page </h2>    
          
        </div>
        
    )
}
export default Home
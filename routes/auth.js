const express =require('express');
const router = express.Router();
const mongoose =require('mongoose')
const User =mongoose.model('User')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require('../key')
const requireLogin =require('../middleware/requireLogin')

router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password ){
       return res.status(422).json({error : "plz add all the file"})
    }
    User.findOne({email:email})
    .then((saveUser)=>{
        if(saveUser){
           return res.status(422).json({error : "user all ready exist"})
        }
        bcrypt.hash(password,12)
        .then(hashpassword=>{
            const user = new User({
                email,
                name,
                password:hashpassword
            })
         user.save()
         .then(user=>{
             res.json({message:"saved successfully"})
          })
         .catch(err=>{
                console.log(err);
             })
        })
    })         
    .catch(err=>{
        console.log(err);
    })
})
router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({err:"plz add email and password "})
    }
    else{
        User.findOne({email:email})
        .then(saveUser=>{
            if(!saveUser){
                return res.status(422).json({err:"Invalid user id and password "})
            }
            bcrypt.compare(password,saveUser.password)
            .then(doMatch=>{
                if(doMatch){
                    //res.json({mess : "successfully login"})
                    const token = jwt.sign({_id:saveUser._id},JWT_SECRET)
                    const {_id,name,email}=saveUser
                    res.json({token,user:{_id,name,email}})
                }
                else{
                    return res.status(422).json({err:"Invalid user id and password "})
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
    }
})
module.exports=router
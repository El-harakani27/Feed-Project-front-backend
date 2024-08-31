const User = require('../models/user.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.createUser = (req,res,next)=>{
    console.log(req.body)
    const email=req.body.email
    const password=req.body.password
    const name=req.body.name
bcryptjs.hash(password,12).then(hashPass=>{
        const user = new User({
        email: email,
        password: hashPass,
        name:name,
        status:true
    })
return user.save()
})
.then(result=>{
    console.log(result)
    res.status(201).json({
        message: 'User created successfully',
        userId: result._id
    })    

}).catch(err=>{console.log(err)})
}

exports.userLogin = (req,res,next)=>{
    const email=req.body.email
    const password=req.body.password
    let loadedUser;
    User.findOne({email:email}).then(user=>{
        if(!user){
            return res.status(401).json({message:'Auth failed'})
        }
        loadedUser=user
        bcryptjs.compare(password,user.password).then(isMatch=>{
            if(!isMatch){
                return res.status(401).json({message:'Auth failed'})
            }
            const token = jwt.sign({userId:loadedUser._id.toString(),email:loadedUser.email},'secretKey',{expiresIn:'1h'})
            console.log(user)
            res.json({message:'Auth successful',token:token,userId:loadedUser._id.toString()})
        })
       .catch(err=>{console.log(err)})
    })
    
}
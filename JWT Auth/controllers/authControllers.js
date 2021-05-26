const User = require('../models/user')
const jwt = require('jsonwebtoken')

//create jwt token
const createJWTtoken = (id)=>{
    return jwt.sign({ id }, 'sharath kumar reddy guvvala', {
        expiresIn:3*24*60*60 //in seconds
    })
}

module.exports.signup_get = (req,res)=>{
    res.render('signup')
}
module.exports.signup_post = async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    //console.log(email,password)
    try{
        const user = await User.create({email, password})
        const token = createJWTtoken(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge:3*24*60*60*1000})
        res.render('home')
        //res.status(201).json(user)
    }
    catch(err){
        console.log(err)
    }
}
module.exports.login_get = (req,res)=>{
    res.render('login')
}
module.exports.login_post = async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    try{
        const user = await User.login(email, password)
        //console.log(user)
        //res.status(200).json({user:user._id})
        if(user){
            const token = createJWTtoken(user._id)
            res.cookie('jwt', token, {httpOnly:true, maxAge:3*24*60*60*1000})
            res.redirect('/')
        }
        else{
            res.redirect('login')
        }
    }
    catch(err){
        console.log(err)
    }
    //res.render('signup')
}
module.exports.logout = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
}
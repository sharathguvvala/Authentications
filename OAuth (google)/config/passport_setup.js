const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')

const User = require('../models/user_model')
const db = require('../mongodb/mongoose')

passport.serializeUser((user, done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(
    new GoogleStrategy({
        //options fot google strategy
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },(accessToken, refreshToken, profile, done)=>{
        //passport callback function

        //console.log('passport callback function fired')

        //console.log(profile.displayName)
        User.findOne({
            googleID: profile.id
        }).then(user => {
        if (user) {
            //already have a user
            //console.log('user is:', user)
            done(null,user)
        } 
        else{
            //create user in our database
            //console.log(profile)
            User.create({
                username:profile.displayName,
                googleID:profile.id,
                thumbnail:profile._json.picture
            },function(err,user){
                if(err){
                    console.log('error in creating a new user')
                    return
                }
                //console.log('new user created')
                done(null,user)
            })
        }
        })
        
    })
)
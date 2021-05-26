const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

const path = require('path')

const authRoutes = require('./routes/auth_routes')
const profileRoutes = require('./routes/profile_routes')

const passportSetup = require('./config/passport_setup')

const cookieSession = require('cookie-session')
const keys = require('./config/keys')

const passport = require('passport')

//set up view engine
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}))
//initialize passport
app.use(passport.initialize())
app.use(passport.session())

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//create home route
app.get('/',(req,res)=>{
    res.render('home.ejs', {user:req.user})
})

app.listen(PORT , ()=>{
    console.log(`Server is up and running on port ${PORT}`)
})
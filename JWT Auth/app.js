const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const requireAuth = require('./middleware/authMiddleware')
const checkUser = require('./middleware/authMiddleware')
const app =express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

//port
const PORT = process.env.PORT || 8000

//view engine
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

//routes
//app.get('*', checkUser)
app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/posts', requireAuth, (req,res)=>{
    res.render('posts')
})
app.use(authRoutes)

//database connection
mongoose.connect('mongodb+srv://authjwt:authjwt@cluster0.eig5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
const db = mongoose.connection
db.on('error',console.error.bind(console,'error in connecting to db'))
db.once('open',function(){
    console.log('connected to db successfully')
})

//setting up the server
app.listen(PORT, function(err){
    if(err){
        console.log('ERROR:', err)
    }
    console.log(`server is up and running on port ${PORT}`)
})
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://OAuth:OAuth@cluster0.abvza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const db = mongoose.connection
db.on('error',console.error.bind(console,'error in connecting to db'))
db.once('open',function(){
    console.log('connected to db successfully')
})
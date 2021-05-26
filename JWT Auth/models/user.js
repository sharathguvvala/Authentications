const mongoose = require('mongoose')

const { isEmail } = require('validator')

const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true,
        //validate:[(val)=>{}, 'Please enter a valid email-id']
        validate:[isEmail, 'Please enter a valid email-id']
    },
    password:{
        type:String,
        required:[true, 'Please enter a password'],
        minlength:[8, 'Minimum length of password is 8 characters']
    }
})

//fire a function before document saved to database
UserSchema.pre('save', async function(next){
    //console.log('User about to be created and saved', this)
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//fire a function after document saved to database
/*UserSchema.post('save', function(doc, next){
    console.log('New User was created:', doc)
    next()
})*/

//static method to login user
UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        else{
            console.log("incorrect password")
        }
    }
    else{
        console.log('user did not exist')
    }
}
const User = mongoose.model('User', UserSchema)
module.exports = User
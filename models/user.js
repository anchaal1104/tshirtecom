const mongoose = require("mongoose")
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
var userSchema = new mongoose.Schema({
  name:{type:String,
    required:true,
    maxLength:32,
    trim:true
    },
    lastname:{
        type:String,
        maxLength:30,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    
    //in case ur missing nd think my applicatiom i need more dnt use req true
    
    userinfo:
    {
        type:String,
        trim:true
    },
    encry_password:
    {
        type:String,
        required:true
    },

    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:
    {
        type:Array,
        default:[]
    }
},{timestamps: true});

userSchema.virtual("password")
.set(function(password)
{
    this._password = password;
    this.salt = uuidv1();
    this.encry_password=this.securedPassword(password);
})
.get(function()
{
    return this.password;
})

userSchema.methods = {
    autheticate:function(plainpassword)
    {
        return this.securedPassword(plainpassword)
     === this.encry_password;
    },
    securedPassword: function(plainpassword)
    {
        if(!plainpassword)
        return "";
        try
        {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err)
        {
          return "";
        }
        
    }
}

module.exports = mongoose.model("User",userSchema);
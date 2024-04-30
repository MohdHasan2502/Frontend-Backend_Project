import mongoose,{Schema} from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//jwt token are bearer tokens

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String, ///cloudinary url
            required:true,

        },
        coverImage:{
            type:String, ///cloudinary url
            required:true,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required"],
        },
    },
    {
        timestamps:true,
    }
)

//middleware in mongoose
userSchema.pre("save", async function(next){
    if(!this.isModified("password")===false)return next()
    this.password=bcrypt.hash(this.password,10)
    next()  
})
//methods in mongoose. these are custom methods
userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}
//Tokens
userSchema.methods.generateAccessToken=function(){
      return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)

}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User=mongoose.model("User",userSchema)
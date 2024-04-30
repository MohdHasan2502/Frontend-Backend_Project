import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express()


app.cors(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//public assert 
app.use(express.static("public"))
//secure cookie which can be removed by only Server
app.use(cookieParser())



export {app}
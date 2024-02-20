const nodemailer=require('nodemailer')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const {redis}=require('../controller/redis.controller')

const verification=async(id,email,res)=>{
    const verificationLink=`http://localhost:8080/users/update/${id}`
    try{
        // const token =jwt.sign({email},'khalid',{expiresIn:60*60})
        // await redis.setex(`verify-${email}`, 60*60, token);
        const transporter=await nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:`${process.env.EMAIL}`,
                pass:`${process.env.PASSWORD}`
            }
        });
        let info=await transporter.sendMail({
            from:`${process.env.EMAIL}`,
            to:`${email}`,
            subject:'account verification for chat app',
            text:'enter otp',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your account. This link will expire in 1 hour.</p>`
        })
        res.status(200).json({msg:'profile updated'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
}

module.exports={
    verification
}
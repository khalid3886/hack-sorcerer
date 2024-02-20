const Redis=require('ioredis')
const redis=new Redis({
    host:"redis-18282.c321.us-east-1-2.ec2.cloud.redislabs.com",
    port:"18282",
    password:"DFmC9wlmymAykcLymPKaWAwdrQQJyin0"
})

module.exports={
    redis
}
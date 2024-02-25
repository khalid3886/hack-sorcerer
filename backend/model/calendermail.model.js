const mongoose=require('mongoose')
const calenderSchema=mongoose.Schema({
    email:{type:String, require:true, unique:true},
    date: Date
},{
    versionKey:false
})

const CalenderModel=mongoose.model('calender',calenderSchema)

module.exports={
    CalenderModel
}
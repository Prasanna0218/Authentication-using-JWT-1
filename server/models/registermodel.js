let mongoose=require('mongoose');

let reguserSchema=new mongoose.Schema({
    name:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String}
})

let regusermodel=mongoose.model("regusermodel",reguserSchema);

module.exports=regusermodel
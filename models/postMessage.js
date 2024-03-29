const mongoose =require("mongoose");
const Schema=mongoose.Schema

const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:false
    },
    selectedFile:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:false
    },
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true});
const PostMessage=mongoose.model('PostMessage',postSchema);
module.exports =PostMessage;

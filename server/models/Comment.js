import mongoose from 'mongoose'


// Schema -> Model (Class/Object) -> Create -> Save

// Creating a new schema (structure of the document) for post 
const commentSchema=new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog',
        required:true,
    }
    ,
    name:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    

},{timestamps:true})


// Model is the actual object we use to interact with database
// Creating the model from the schema
const Comment=mongoose.model('comment',commentSchema);


export default Comment;
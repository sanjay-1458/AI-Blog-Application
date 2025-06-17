import mongoose from 'mongoose'


// Schema -> Model (Class/Object) -> Create -> Save

// Creating a new schema (structure of the document) for post 
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subTitle:{
        type:String,
    }
    ,
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    

},{timestamps:true})


// Model is the actual object we use to interact with database
// Creating the model from the schema
const Blog=mongoose.model('blog',blogSchema);


export default Blog;
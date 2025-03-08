import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true 
    },
    postName : {
        type :String,
        required : true
    },
    
    Images : [
        {
            type : String
        }
    ],
  
    description : {
        type : String,
        required : true
    },
        dateTime : {
            type : String,
            required : true
    }
})

const Product = mongoose.model("products", postSchema);

export default Product;
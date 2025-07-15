import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    },
})

const Review=mongoose.model("Review",reviewSchema);
export default Review;

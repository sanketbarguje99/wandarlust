const mongoose = require("mongoose");
 const Schema = mongoose.Schema; 
 const Review = require("./review.js");
const { string } = require("joi");


 const listingschema = new mongoose.Schema({ 
    title: { type :String, 
    required:true,
 },

description:String, 
image: {
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    filename: String
},
         price:Number,
         location:String,
         country:String,

         reviews:[ 
            {
                 type:mongoose.Schema.Types.ObjectId,
                  ref:"review"
                 }, 
                ],
        owner:
         { 
            type:Schema.Types.ObjectId,
             ref:"User",
             },
        // category:
        // {
        //     type:string,
        //     enum:["mountains","arctic","farms","deserts"]

        // }
        });

        listingschema.post("findOneAndDelete",async(listing) =>{
             if(listing){ await Review.deleteMany({_id : {$in:listing.reviews}});
             } 
            })

            const listing = mongoose.model("listing",listingschema);
            module.exports =listing;
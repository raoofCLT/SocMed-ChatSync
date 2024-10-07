import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    postedBy:{
        type: mongoose.Shema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text:{
        type: String,
        maxLength: 500,
    },
    img:{
        type: String,
    },
    likes:{
        type:Number,
        default:0,
    },
    replies:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text:{
                type: String,
                required: true
            },
            userProfilePic:{
                type: String,
            },
            username:{
                type: String,
            }
        }
    ]
},{
    timestamps: true
})

export default mongoose.model("Post",postSchema)
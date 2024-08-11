import mongoose, {Schema} from "mongoose";

const responseSchema = new Schema(
    {
        issueId: {
            type: Schema.Types.ObjectId,
            ref: "Issue"
        },
        description : {
            type: String,
            default:"",
            trim: true, 
        },
        requirements : {
            type: String,
            default:"",
            trim: true, 
        },
        actionTaken : {
            type: String,
            default:"",
            trim: true, 
        },
        complete :{
            type : Boolean,
            default:false
        }

    },
    {
        timestamps: true
    }
)

export const Response = mongoose.model("Response",responseSchema)
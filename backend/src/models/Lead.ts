
import mongoose ,{Schema,Document} from "mongoose"
export interface ILead extends Document{
    name:string;
    email:string;
    status:string;
    source:string;
    createdBy:mongoose.Types.ObjectId;
}

const leadSchema = new Schema<ILead>({
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },
   status: {
  type: String,
  enum: [
    "pending",
    "qualified",
    "rejected"
  ],
  default: "pending",
},
    source: {
      type: String,
      enum: ["Website", "Instagram", "Referral"],
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
},{timestamps:true})

export default mongoose.model<ILead>("Lead", leadSchema);
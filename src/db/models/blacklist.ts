import {Document, model, Schema} from "mongoose";

enum BlacklistKind {
    jti = "jti",
    refresh = "refresh",
    token = "token",
}

const BlacklistSchema = new Schema(
    {
        object: {
            type: String,
            required: [true, "please provide an object"],
            unique: true,
        },
        kind:{
            type: String,
            enum: ["jti", "refresh", "token"],
            default: "jti",
            required: [true, "please enter a kind"],
        },
    },
    {timestamps: true}
);

interface BlacklistDocument extends Document {
    object: string;
    kind: BlacklistKind;
  }
  
  export default model<BlacklistDocument>("Blacklist", BlacklistSchema);
import { model, Schema } from "mongoose";

export const User = model(
  "User",
  new Schema({
    username: {
      type: String,
      required: true,
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      sessionToken: {
        type: String,
        select:false
      }
    },
  })
);

// category: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "Category",
//   },
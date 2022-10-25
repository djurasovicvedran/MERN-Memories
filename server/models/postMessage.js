import mongoose from "mongoose";

// specify what the posts should contain
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// turn the schema into the module
const PostMessage = mongoose.model("PostMessage", postSchema);
// export the mongoose model
export default PostMessage;

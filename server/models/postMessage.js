import mongoose from "mongoose";

// specify what the posts should contain
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
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

import User from "../models/userModel.js";
import Post from "../models/postModel.js";


//Create Post
const createPost = async (req, res) => {
  const { postedBy, text, img } = req.body;
  try {
    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ message: "Postedby and text fields are required" });
    }

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to create post" });
    }
    const maxLength = 1500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ message: `Text must be less than ${maxLength} characters` });
    }

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in createPost:", error.message);
  }
};

//Get Post
const getPost = async (req, res) => {
  try{

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getPost:",error.message);
  }
}

export { createPost, getPost};

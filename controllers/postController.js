const { default: mongoose } = require("mongoose");
const PostMessage=require("../models/postMessage");

 const getPosts=async (req,res)=>{
 try {
    const postMessages=await PostMessage.find();
    res.status(200).json(postMessages);
    
 } catch (error) {
    res.status(404).json({message:error.message})
 }
}

 const createPost=async(req,res)=>{
    const post=req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

 const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully." });
}

const likePost = async (req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.json({message:"Unauthenticated"});//checking if userId exist

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index=post.likes.findIndex((id)=>id===String(req.userId));//checking if likes array has userid

    if(index===-1){
post.likes.push(req.userId);//push the userid in likes arrya
    }
    else{
post.likes=post.likes.filter((id)=>(id)!==String(req.userId));//if id already exist then dislike the post
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
}

module.exports={createPost,getPosts,updatePost,deletePost,likePost}
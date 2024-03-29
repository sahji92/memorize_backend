const express=require('express');
const { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPost } = require('../controllers/postController');
const auth=require('../middlewares/auth')
const router=express.Router();

router.get('/', getPosts);//here we dont put auth to make users see all posts without geting authenticated.
router.get('/:id', getPost);
router.get('/search', getPostsBySearch);
router.post('/',auth, createPost);
router.put('/:id',auth,updatePost);
router.delete('/:id',auth, deletePost);//user can only delete posts created by him/her
router.put('/:id/likePost',auth, likePost);//only authenticatde user can like post one time only
module.exports=router;
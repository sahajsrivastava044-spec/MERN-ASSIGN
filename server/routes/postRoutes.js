import express from 'express';
import { protect } from '../AuthMiddleware/protect.js';

import {
  createPost,
  getPosts,
   getPostById,  // Add
  updatePost,
  deletePost  // Add this import
} from '../controllers/recipeController.js';
import router from './userRoutes.js';


// router.post('/', createPost);
router.get('/',  (req,res)=>{
    console.log(req)
    try {
        res.send("Hello")
    } catch (error) {
        console.log(error)
        res.send(500)
    }
});
// router.get('/:id', protect, getPostById);      // Get single post
// router.put('/:id', protect, updatePost);       // Update post
// router.delete('/:id', protect, deletePost);    // Delete post

export default router;
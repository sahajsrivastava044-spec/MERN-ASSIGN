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


router.post('/', createPost);
// router.get('/',  (req,res)=>{
//     console.log(req)
//     try {
//         res.send("Hello")
//     } catch (error) {
//         console.log(error)
//         res.send(500)
//     }
// });
router.get('/',getPosts)
router.get('/:id', protect, getPostById);      
router.put('/:id', protect, updatePost);       
router.delete('/:id', protect, deletePost);    

export default router;
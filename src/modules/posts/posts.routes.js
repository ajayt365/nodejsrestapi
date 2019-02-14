// send Jwt.
import express from 'express'
import validate from 'express-validation'
import postValidation from './posts.validations'
import { authJWT } from '../../services/auth.services'
import * as postController from './posts.controller'
import Post from './posts.model'
export const postRouter = express.Router()
console.log(postController)
postRouter.post(
  '/post',
  validate(postValidation),
  authJWT,
  postController.createPost
) // creates no difference on moving validate in front of authJWT , why ?

postRouter.get('/', postController.getPostlist)

// updating a post

postRouter.patch('/update/:id', authJWT, postController.updatePost)

postRouter.delete('/delete/:id', authJWT, postController.deletePost)

postRouter.post('/:postid/favourite', authJWT, postController.likePost)

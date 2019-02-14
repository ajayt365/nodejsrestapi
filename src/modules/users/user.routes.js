import express from 'express'
export const userRouter = express.Router()
import User from './user.model'
import { joiSchema } from './user.validations'
import validate from 'express-validation'
import * as userController from './user.controller'
import { authLogin, authJWT } from '../../services/auth.services'
userRouter.get('/', async (req, res) => {
  const users = await User.find()
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(0)
  res.status(200).json(users)
})

userRouter.post('/signup', validate(joiSchema.signup), userController.signup)
userRouter.post('/login', authLogin, userController.login)
userRouter.post('/user', authJWT, (req, res) => {
  console.log('user', req.user)
  res.send('Assß')
})

// userRouter.post("/:postid/favorite", authJWT, userController.likePost); // unverified breakpoint .

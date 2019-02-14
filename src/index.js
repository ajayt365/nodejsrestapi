import express from 'express'
import constants from './config/constants'
import './config/database'
import middlewares from './config/middlewares'
import { userRouter } from './modules/users/user.routes'
import { postRouter } from './modules/posts/posts.routes'
const app = express()

middlewares(app) //order?
//routes

app.use('/api/v1/users', userRouter) // order ??

app.use('/api/v1/posts', postRouter)

app.use((err, req, res, next) => {
  if (err) {
    console.log('error 1')
    res.status(501).json({ msg: err.message })
    next()
  }
})

app.listen(constants.PORT, () => {
  console.log(`
 	Server running on port: ${constants.PORT}
		--- Running on ${process.env.NODE_ENV}
		--- Make something great!`)
})

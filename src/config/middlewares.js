import morgan from 'morgan'
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import passport from 'passport'

export default app => {
const isDev=process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
if(isDev) {
	app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())

if(isProd) {
app.use(compression())
app.use(helmet())
}
}
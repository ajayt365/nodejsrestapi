import mongoose from 'mongoose'

import constants from './constants'

mongoose
  .connect(constants.MONGO_URL)
  .then(db => {
    console.log('connected promise')
  })
  .catch(err => {
    console.log(err.message)
  })

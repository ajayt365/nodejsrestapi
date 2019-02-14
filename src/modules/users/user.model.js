import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import { passwordReg } from './user.validations'
import { hash, compare } from 'bcrypt'
// console.log(validator)
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Enter the firstname'],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, 'Enter the lastname'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      require: [true, 'Enter the Email'],
      validate: {
        /// using an object here
        // validator.isEmail,
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
      },
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      trim: true,
      minlength: [6, 'minimum 6 characters'],
      validate: [
        function validation(password) {
          // Using an array heer
          return passwordReg.test(password)
        },
        '{VALUE} is not a valid password',
      ],
    },
    favourites: {
      posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post',
        },
      ],
    },
  },
  { timestamps: true }
)

userSchema.methods = {
  validateUser: async function(password) {
    const response = await compare(password, this.password)
    return response
  },
}

userSchema.virtual('getName').get(function() {
  return this.firstname + ' ' + this.lastname
})

userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      const result = await hash(this.password, 2)
      this.password = result
      console.log('here', this)
    }
    return next()
  } catch (err) {
    res.status(400).send(err)
  }
})

export default mongoose.model('User', userSchema)

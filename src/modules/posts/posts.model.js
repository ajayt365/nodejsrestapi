import mongoose, { Schema } from 'mongoose'
// display unique error
import slug from 'slug'
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true,
      minlength: [3, 'Title needs to be longer'],
    },
    text: {
      type: String,
      required: [true, 'Text is required'],
      minlength: [10, 'Text needs to be longer'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   transform: function() {
    //     return {
    //       _id: this._id,
    //       author: this.author,
    //       title: this.title,
    //       text: this.text,
    //       createdAt: this.createdAt,
    //       slug: this.slug,
    //       likes: this.likes,
    //     }
    //   },
    // },
    toObject: function() {
      return {
        _id: this._id,
        author: this.author,
        title: this.title,
        text: this.text,
        createdAt: this.createdAt,
        slug: this.slug,
        likes: this.likes,
      }
    },
  }
)

postSchema.methods = {
  toJSON: function() {
    return {
      _id: this._id,
      author: this.author,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      slug: this.slug,
      likes: this.likes,
    }
  },
}

postSchema.pre('save', function() {
  this.slug = slug(this.title)
})

export default mongoose.model('Post', postSchema)

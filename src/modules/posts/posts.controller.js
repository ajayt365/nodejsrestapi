import Post from './posts.model'
import httpStatus from 'http-status'
import User from './../users/user.model'
export async function createPost(req, res) {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id })
    res.status(httpStatus.CREATED).json(post)
  } catch (err) {
    res.status(400).json({ err })
  }
}

export async function getPostlist(req, res) {
  try {
    let skip = parseInt(req.query.skip) || 0
    let limit = parseInt(req.query.limit) || 0
    console.log(skip)
    const posts = await Post.find()
      .populate('author')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.status(httpStatus.OK).json(posts)
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
}

export async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id)
    console.log(req.body)
    console.log(post)
    if (!post.author.equals(req.user._id)) {
      res.status(httpStatus.UNAUTHORIZED)
      return
    }
    Object.keys(req.body).forEach(key => {
      console.log('key', key)
      post[key] = req.body[key]
      console.log('updated', post)
    })
    const editedPost = await post.save()
    res.status(200).json(editedPost)
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST).json({ e: e.message })
  }
}

export async function deletePost(req, res) {
  try {
    const id = req.params.id
    console.log(typeof id)
    const post = await Post.findById(id)
    console.log(post)
    console.log('author', typeof post.author)
    console.log(post.author.equals(req.user.id))
    if (!post.author.equals(req.user.id)) {
      res.sendStatus(httpStatus.UNAUTHORIZED)
    }

    res.status(200).json(await post.remove())
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST).json({ e: e.message })
  }
}

export async function likePost(req, res) {
  try {
    const user = await User.findById(req.user._id)
    console.log(user)
    const index = user.favourites.posts.indexOf(req.params.postid)

    if (index >= 0) {
      user.favourites.posts.splice(index, 1)
    } else {
      user.favourites.posts.push(req.params.postid)
    }
    await user.save()
    res.sendStatus(200)
  } catch (e) {
    res.status(501).json({ msg: e.message })
  }
}

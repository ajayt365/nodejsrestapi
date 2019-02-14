import User from './user.model'
import jwt from 'jsonwebtoken'
export const signup = async function(req, res, next) {
  try {
    const user = await User.create(req.body)

    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

export function login(req, res) {
  const { _id, email } = req.user
  // console.log(_id, email)
  const token = jwt.sign(
    {
      _id,
      email,
    },
    'secret'
  )
  const resObject = {
    _id,
    email,
    username: req.user.username,
    token: `JWT ${token}`,
  }
  res.status(201).json(resObject)
}

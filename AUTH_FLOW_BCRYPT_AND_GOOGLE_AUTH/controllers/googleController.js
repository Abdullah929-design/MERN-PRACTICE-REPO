const { OAuth2Client } = require('google-auth-library')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body

    


    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    
    const payload = ticket.getPayload()
    const { email, name } = payload
    let user = await userModel.findOne({ email })


    //handling signup here
    if (!user) {
      user = new userModel({
        name,
        email,
        password: 'google-oauth' 
      })
      await user.save()
    }


    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      jwtToken,
      email
    })

  } catch (err) {
    res.status(500).json({ message: err.message, success: false })
  }
}

module.exports = { googleLogin }
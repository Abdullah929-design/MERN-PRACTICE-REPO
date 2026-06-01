import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (data.success) {
                localStorage.setItem('token', data.jwtToken) 
                localStorage.setItem('email', email)
                navigate('/home')                           
            } else {
                alert(data.message)
            }
        } catch (err) {
            alert('Something went wrong')
        }
    }
    const handleGoogleLogin = async (googleToken) => {
  try {
    const res = await fetch('http://localhost:8000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleToken })
    })
    const data = await res.json()
    if (data.success) {
      localStorage.setItem('token', data.jwtToken)
      localStorage.setItem('email', data.email)
      navigate('/home')
    } else {
      alert(data.message)
    }
  } catch (err) {
    alert('Something went wrong')
  }
}

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email"
                    value={email} onChange={ element=> setEmail(element.target.value)} required />
                <input type="password" placeholder="Password"
                    value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <GoogleLogin
  onSuccess={(credentialResponse) => {
    //credentialresponse.credential is the token jo google hamare lie bana rha hai na ke wo token jo ham normally login ke baad server se bana ke client ko bhejte hain ye kaam ab google kr rha hai
    handleGoogleLogin(credentialResponse.credential)
  }}
  onError={() => {
    alert('Google Login Failed')
  }}
/>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    )
}

export default Login
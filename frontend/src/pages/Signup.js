import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })
            const data = await res.json()
            if (data.success) {
                alert('Signup successful! Please login.')
                navigate('/login')   // ← redirect to login after signup
            } else {
                alert(data.message)
            }
        } catch (err) {
            alert('Something went wrong')
        }
    }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Name"
                    value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email"
                    value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password"
                    value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup
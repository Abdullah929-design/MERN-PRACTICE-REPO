import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')   
            return
        }
        fetchProducts(token)
    }, [])

    const fetchProducts = async (token) => {
        try {
            const res = await fetch('http://localhost:8000/product', {
                headers: { 'Authorization': token } 
            })
            const data = await res.json()
            if (res.status === 403) {
                navigate('/login')  
            } else {
                setProducts(data)
            }
        } catch (err) {
            alert('Something went wrong')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')  
        localStorage.removeItem('email')
        navigate('/login')
    }

    return (
        <div>
            <h2>Welcome, {localStorage.getItem('email')}</h2>
            <button onClick={handleLogout}>Logout</button>
            <h3>Products</h3>
            {products.map((product, index) => (
                <div key={index}>
                    <p>Name: {product.name}</p>
                    <p>Price: {product.price}</p>
                </div>
            ))}
        </div>
    )
}

export default Home
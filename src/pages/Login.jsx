import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../utils/auth'
import bgPoster from '../assets/bg.jpg'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill both fields')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        form,
        { withCredentials: true }
      )
      login(res.data.user) // Login successful → dashboard
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative font-sans"
      style={{ backgroundImage: `url(${bgPoster})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Netflix Logo */}
      <h1
        className="ml-12 mt-6 relative z-10 text-red-600 text-5xl font-bebas"
        style={{ fontFamily: 'Bebas Neue' }}
      >
        Netflix
      </h1>

      {/* Login card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen -mt-20">
        <div className="w-full max-w-md p-10 bg-black/70 rounded-md shadow-lg">
          <h2 className="text-white text-3xl font-bold mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email or phone number"
              className="w-full px-4 py-3 rounded bg-[#333] placeholder:text-gray-400 text-white"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded bg-[#333] placeholder:text-gray-400 text-white"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="bg-red-900/50 p-4 rounded mt-6 text-gray-300">
            <h3 className="text-center text-lg font-semibold text-white mb-2">
              Demo Credentials
            </h3>
            <p>Email: <span className="text-gray-300">demo@netflix.com</span></p>
            <p>Password: <span className="text-gray-300">password123</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

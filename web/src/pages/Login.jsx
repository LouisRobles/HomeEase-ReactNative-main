import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionCard from '../components/common/SectionCard'

const USERNAME = 'admin'
const PASSWORD = 'admin123'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === USERNAME && password === PASSWORD) {
      setError('')
      navigate('/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="auth-page">
      <SectionCard className="auth-card">
        <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Admin Login
        </h1>
        <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Sign in to manage HomeEaseAdmin
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Login
          </button>
        </form>
      </SectionCard>
    </div>
  )
}

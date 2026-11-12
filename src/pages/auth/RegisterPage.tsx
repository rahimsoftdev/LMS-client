
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  User,
  Mail,
  LockKeyhole,
} from 'lucide-react'
import { authClient } from '../../lib/auth-client'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setIsLoading(true)

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      })

      if (error) {
        setError(error.message || 'Registration failed. Please try again.')
        return
      }

      navigate('/login', { replace: true })
    } catch (err) {
      console.error('Registration error:', err)

      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User size={28} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Create Account
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Join us and start your learning journey.
            </p>

          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="w-full h-12 pl-10 pr-12 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              <p className="text-xs text-slate-400 mt-2">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="w-full h-12 pl-10 pr-12 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3"
              >
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-500">

            Already have an account?{' '}

            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Learning Management System
        </p>

      </div>

    </div>
  )
}

export default Register

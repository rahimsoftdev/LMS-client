
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { authClient } from '../../lib/auth-client'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

 const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  setError('')

  if (!email.trim() || !password) {
    setError('Please enter your email and password.')
    return
  }

  try {
    setIsLoading(true)

    const { data, error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    })

    if (error) {
      setError(error.message || 'Invalid email or password.')
      return
    }

    // Check user role
    const role = data.user.role

    if (role === 'admin') {
      navigate('/admin', { replace: true })
    } else if (role === 'user') {
      navigate('/courses', { replace: true })
    } else {
      setError('Your account has an invalid role.')
    }
  } catch (err) {
    console.error('Login error:', err)

    setError('Something went wrong. Please try again.')
  } finally {
    setIsLoading(false)
  }
}
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LockKeyhole size={28} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Login to access your learning dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">

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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Create an account
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

export default Login

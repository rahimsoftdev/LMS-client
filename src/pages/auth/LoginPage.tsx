import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react'
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

  // Shared floating-label field styles
  const fieldInput =
    'peer h-14 w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 pt-5 text-sm text-slate-900 placeholder-transparent outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100'
  const fieldLabel =
    'pointer-events-none absolute left-12 top-1/2 max-w-[calc(100%-4rem)] -translate-y-1/2 truncate whitespace-nowrap text-sm text-slate-400 transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold'
  const fieldIcon =
    'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-indigo-600'
  const eyeBtn =
    'absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700'

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
          <Sparkles size={26} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Login to access your learning dashboard.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4" noValidate>
        {/* Email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            name="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className={fieldInput}
          />
          <Mail size={18} className={fieldIcon} />
          <label htmlFor="email" className={fieldLabel}>
            Email Address
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={`${fieldInput} pr-14`}
          />
          <LockKeyhole size={18} className={fieldIcon} />
          <label htmlFor="password" className={fieldLabel}>
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={eyeBtn}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative mt-2 flex h-14 w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Login
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      {/* Register link */}
      <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
        >
          Create an account
        </Link>
      </div>
    </div>
  )
}

export default Login
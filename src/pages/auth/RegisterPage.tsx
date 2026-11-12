import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  User,
  Mail,
  LockKeyhole,
  Sparkles,
  AlertCircle,
  Loader2,
  ArrowRight,
  Check,
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

  // Visual-only helpers
  const rules = [
    { label: '8+ characters', ok: password.length >= 8 },
    {
      label: 'Upper & lower case',
      ok: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    { label: 'A number', ok: /\d/.test(password) },
  ]
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword

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
          Create your account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Join us and start your learning journey.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4" noValidate>
        {/* Name */}
        <div className="relative">
          <input
            id="name"
            type="text"
            name="name"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            className={fieldInput}
          />
          <User size={18} className={`${fieldIcon}`} />
          <label htmlFor="name" className={fieldLabel}>
            Full Name
          </label>
        </div>

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
        <div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

          {/* Rules chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {rules.map((r) => (
              <span
                key={r.label}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                  r.ok
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
              >
                <Check size={12} className={r.ok ? 'opacity-100' : 'opacity-40'} />
                {r.label}
              </span>
            ))}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            className={`${fieldInput} pr-24 ${
              passwordsMatch ? '!border-emerald-400' : ''
            }`}
          />
          <LockKeyhole size={18} className={fieldIcon} />
          <label htmlFor="confirmPassword" className={fieldLabel}>
            Confirm Password
          </label>

          {passwordsMatch && (
            <span className="pointer-events-none absolute right-14 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={14} />
            </span>
          )}

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={eyeBtn}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Register

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import {
  BookOpen,
  GraduationCap,
  Video,
  RefreshCw,
  AlertCircle,
  CalendarDays,
} from 'lucide-react'

import PageHeading from '@/components/ui/PageHeading'

interface Course {
  _id: string
  title: string
  description?: string
  createdAt?: string
}

interface OverviewData {
  statistics: {
    totalCourses: number
    totalLectures: number
    totalStudents: number
  }
  recentCourses: Course[]
}

const API_URL = import.meta.env.VITE_API_URL

export default function DashboardPage() {
  const [overview, setOverview] = useState<OverviewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOverview = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')

      const response = await axios.get(
        `${API_URL}/admin/overview`,
        { withCredentials: true },
      )

      setOverview(response.data.data)
    } catch (error) {
      console.error('Failed to fetch admin overview:', error)

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
          'Failed to load dashboard data. Please try again.',
        )
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOverview()
  }, [fetchOverview])

  const stats = [
    {
      label: 'Total Courses',
      value: overview?.statistics.totalCourses ?? 0,
      icon: BookOpen,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Total Lectures',
      value: overview?.statistics.totalLectures ?? 0,
      icon: Video,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      label: 'Total Students',
      value: overview?.statistics.totalStudents ?? 0,
      icon: GraduationCap,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ]

  return (
    <section className="mx-auto w-full max-w-7xl xl:pb-10">
      <PageHeading
        title="Admin Dashboard"
        description="Monitor your courses, lectures, and students from one place."
      />

      {error && (
        <div
          role="alert"
          className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-start gap-2 text-sm text-red-700 sm:items-center">
            <AlertCircle className="mt-0.5 size-5 shrink-0 sm:mt-0" />
            <p className="min-w-0 break-words">{error}</p>
          </div>

          <button
            type="button"
            onClick={fetchOverview}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:shrink-0"
          >
            <RefreshCw className="size-4" />
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-11 ${stat.iconBg}`}
                >
                  <Icon
                    className={`size-5 ${stat.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <p className="mt-3 truncate text-2xl font-bold text-slate-900 sm:mt-4 sm:text-3xl">
                {isLoading ? '—' : stat.value.toLocaleString()}
              </p>

              <p className="mt-1 text-xs text-slate-400">Overview statistics</p>
            </div>
          )
        })}
      </div>

      {/* Recent courses */}
      <div className="mt-6 sm:mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
              Recent Courses
            </h2>
            <p className="mt-1 text-sm text-slate-500">Recently added courses</p>
          </div>

          <button
            type="button"
            onClick={fetchOverview}
            disabled={isLoading}
            aria-label="Refresh"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden min-[400px]:inline">Refresh</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-14 animate-pulse rounded-lg bg-slate-100"
                />
              ))}
            </div>
          ) : overview?.recentCourses.length ? (
            <div className="divide-y divide-slate-100">
              {overview.recentCourses.map((course) => (
                <div
                  key={course._id}
                  className="flex flex-col gap-2 p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <BookOpen className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-800">
                        {course.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-500 sm:line-clamp-1">
                        {course.description || 'No description available'}
                      </p>
                    </div>
                  </div>

                  {course.createdAt && (
                    <div className="flex shrink-0 items-center gap-2 pl-[52px] text-xs text-slate-400 sm:pl-0">
                      <CalendarDays className="size-4" />
                      {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-10 text-center sm:p-10">
              <BookOpen className="mx-auto size-10 text-slate-300" />
              <h3 className="mt-3 font-medium text-slate-700">No courses found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Courses will appear here once you create them.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

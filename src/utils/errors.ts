import axios from 'axios'

type ApiErrorBody = {
  message?: string
}

export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404
}

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

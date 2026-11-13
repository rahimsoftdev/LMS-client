export interface User {
  id: string
  _id?: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  role: 'admin' | 'user'
}
export type UserRole = 'Admin' | 'Lecturer' | 'Student'

export interface AuthUser {
  userId: string
  email: string
  fullName: string
  role: UserRole
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  userId: string
  email: string
  fullName: string
  role: UserRole
}

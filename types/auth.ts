// Enum local hasta que se instale Prisma
export type UserRole = 'ADMIN' | 'EDITOR'

export interface User {
  id: string
  email: string
  password: string
  name?: string
  role: UserRole
  is_active: boolean
  email_verified: boolean
  created_at: string
  updated_at: string
  last_login_at?: string
}

export interface Session {
  id: string
  user_id: string
  token: string
  expires_at: string
  created_at: string
  user?: User
}

export interface PasswordReset {
  id: string
  user_id: string
  token: string
  expires_at: string
  used: boolean
  created_at: string
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  role: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  newPassword: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: AuthUser
  token?: string
}

// Tipos para Supabase Database
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      sessions: {
        Row: Session
        Insert: Omit<Session, 'id' | 'created_at'>
        Update: Partial<Omit<Session, 'id' | 'created_at'>>
      }
      password_resets: {
        Row: PasswordReset
        Insert: Omit<PasswordReset, 'id' | 'created_at'>
        Update: Partial<Omit<PasswordReset, 'id' | 'created_at'>>
      }
    }
  }
} 
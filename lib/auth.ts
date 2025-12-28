import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { AuthUser, UserRole, User, Session } from '@/types/auth'
import { supabaseAdmin } from '@/lib/supabase'

// Hashear contraseña con bcryptjs
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

// Comparar contraseña con bcryptjs
export const comparePassword = async (password: string, storedHash: string): Promise<boolean> => {
  return await bcrypt.compare(password, storedHash)
}

// Generar token aleatorio usando bcryptjs
const generateRandomToken = async (): Promise<string> => {
  const randomString = `${Date.now()}-${Math.random()}-${Math.random()}-${Math.random()}`
  const hash = await bcrypt.hash(randomString, 10)
  // Remover caracteres especiales de bcrypt y tomar solo caracteres alfanuméricos
  return hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 64)
}

// Generar token de sesión
export const generateSessionToken = async (): Promise<string> => {
  return await generateRandomToken()
}

// Generar token de reset de contraseña
export const generateResetToken = async (): Promise<string> => {
  return await generateRandomToken()
}

// Obtener sesión actual
export async function getCurrentSession(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session-token')?.value

    if (!sessionToken) {
      return null
    }

    // Buscar sesión en Supabase
    const { data: session, error } = await supabaseAdmin
      .from('sessions')
      .select(`
        *,
        user:users(*)
      `)
      .eq('token', sessionToken)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !session || !session.user) {
      return null
    }

    const user = session.user as User
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  } catch (error) {
    console.error('Error getting current session:', error)
    return null
  }
}

// Verificar si el usuario está autenticado
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentSession()
  
  if (!user) {
    redirect('/user/login')
  }
  
  return user
}

// Verificar si el usuario es admin
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth()
  
  if (user.role !== 'ADMIN') {
    redirect('/user/login')
  }
  
  return user
}

// Logout
export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session-token')?.value

  if (sessionToken) {
    // Eliminar sesión de Supabase
    await supabaseAdmin
      .from('sessions')
      .delete()
      .eq('token', sessionToken)
  }

  // Eliminar cookie
  cookieStore.delete('session-token')
}

// Crear sesión
export async function createSession(userId: string): Promise<string> {
  const token = await generateSessionToken()
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 horas

  // Crear sesión en Supabase
  const { error } = await supabaseAdmin
    .from('sessions')
    .insert({
      user_id: userId,
      token,
      expires_at: expiresAt.toISOString()
    })

  if (error) {
    throw new Error('Error creating session: ' + error.message)
  }

  // Establecer cookie
  const cookieStore = await cookies()
  cookieStore.set('session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt
  })

  return token
}

// Buscar usuario por email
export async function findUserByEmail(email: string): Promise<User | null> {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .eq('is_active', true)
    .single()

  if (error || !user) {
    return null
  }

  return user
}

// Crear nuevo usuario
export async function createUser(email: string, password: string, name?: string): Promise<User> {
  const hashedPassword = await hashPassword(password)

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .insert({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || null,
      role: 'ADMIN' as UserRole,
      is_active: true,
      email_verified: false
    })
    .select()
    .single()

  if (error || !user) {
    throw new Error('Error creating user: ' + (error?.message || 'Unknown error'))
  }

  return user
}

// Actualizar último login
export async function updateLastLogin(userId: string): Promise<void> {
  await supabaseAdmin
    .from('users')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', userId)
}

// Actualizar contraseña de un usuario (genera nuevo hash con bcryptjs)
export async function updateUserPassword(userId: string, newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword)
  
  const { error } = await supabaseAdmin
    .from('users')
    .update({ 
      password: hashedPassword,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) {
    throw new Error('Error updating password: ' + error.message)
  }
}

// Actualizar contraseña por email (útil para actualizar usuario principal)
export async function updateUserPasswordByEmail(email: string, newPassword: string): Promise<void> {
  const user = await findUserByEmail(email)
  
  if (!user) {
    throw new Error('Usuario no encontrado')
  }
  
  await updateUserPassword(user.id, newPassword)
}

// Limpiar sesiones expiradas
export async function cleanupExpiredSessions(): Promise<void> {
  await supabaseAdmin
    .from('sessions')
    .delete()
    .lt('expires_at', new Date().toISOString())

  await supabaseAdmin
    .from('password_resets')
    .delete()
    .lt('expires_at', new Date().toISOString())
} 
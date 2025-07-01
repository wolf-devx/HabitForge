import { supabase } from "./supabase"

function assertSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase não está configurado. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar autenticação.",
    )
  }
}

export async function signUp(email: string, password: string, name: string) {
  assertSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) throw error

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email: data.user.email!,
      name,
      level: 1,
      xp: 0,
      streak: 0,
    })

    if (profileError) throw profileError
  }

  return data
}

export async function signIn(email: string, password: string) {
  assertSupabase()
  const { data, error } = await supabase!.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  assertSupabase()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  assertSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

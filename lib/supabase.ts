import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Supabase só pode ser inicializado no cliente com variáveis
 * NEXT_PUBLIC_* já disponíveis.  Durante o preview do v0 essas
 * variáveis normalmente ainda não existem, então protegemos
 * a criação para evitar o erro: “supabaseUrl is required”.
 *
 * Se quiser usar Supabase de fato:
 *  1. Crie um projeto em app.supabase.com
 *  2. Adicione as variáveis NEXT_PUBLIC_SUPABASE_URL e
 *     NEXT_PUBLIC_SUPABASE_ANON_KEY na aba “Environment Variables”
 *     do seu projeto Vercel / .env.local.
 */
function initSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Mantém a aplicação funcional no preview
    console.warn(
      "⚠️  Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar o backend.",
    )
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Cliente Singleton
 *  - Evita múltiplas instâncias
 *  - Pode ser `null` caso as variáveis não existam
 */
export const supabase = initSupabase()

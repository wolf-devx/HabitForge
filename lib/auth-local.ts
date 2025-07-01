import { userStorage, initializeSampleData, type User } from "./local-storage"

// Simula delay de rede para parecer mais realista
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function signUp(email: string, password: string, name: string) {
  await delay(1000) // Simula delay da API

  // Verificar se usuário já existe
  const existingUser = userStorage.findUserByEmail(email)
  if (existingUser) {
    throw new Error("Usuário já existe com este email")
  }

  // Criar novo usuário
  const user: User = {
    id: Date.now().toString(),
    email,
    name,
    level: 1,
    xp: 0,
    streak: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Salvar usuário
  userStorage.saveUser(user)
  userStorage.setCurrentUser(user)

  // Inicializar dados de exemplo
  initializeSampleData(user.id)

  return { user }
}

export async function signIn(email: string, password: string) {
  await delay(1000) // Simula delay da API

  // Buscar usuário
  const user = userStorage.findUserByEmail(email)
  if (!user) {
    throw new Error("Usuário não encontrado. Clique em 'Cadastre-se' para criar uma conta.")
  }

  // Em um app real, verificaríamos a senha aqui
  // Por simplicidade, vamos aceitar qualquer senha

  userStorage.setCurrentUser(user)

  return { user }
}

export async function signOut() {
  await delay(500)
  userStorage.clearCurrentUser()
}

export async function getCurrentUser() {
  return userStorage.getCurrentUser()
}

// Função para atualizar dados do usuário
export async function updateUser(updates: Partial<User>) {
  const currentUser = userStorage.getCurrentUser()
  if (!currentUser) {
    throw new Error("Usuário não está logado")
  }

  const updatedUser = {
    ...currentUser,
    ...updates,
    updated_at: new Date().toISOString(),
  }

  userStorage.saveUser(updatedUser)
  userStorage.setCurrentUser(updatedUser)

  return updatedUser
}

export async function createDemoUserIfNeeded() {
  const demoUser = userStorage.findUserByEmail("demo@habitforge.com")
  if (!demoUser) {
    return await signUp("demo@habitforge.com", "demo123", "Usuário Demo")
  }
  return { user: demoUser }
}

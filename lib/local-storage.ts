// Sistema de armazenamento local para substituir o Supabase durante desenvolvimento/preview

export interface User {
  id: string
  email: string
  name: string
  level: number
  xp: number
  streak: number
  created_at: string
  updated_at: string
}

export interface Habit {
  id: string
  user_id: string
  name: string
  category: string
  icon: string
  color: string
  streak: number
  target_frequency: number
  created_at: string
  updated_at: string
}

export interface HabitLog {
  id: string
  habit_id: string
  user_id: string
  date: string
  status: "completed" | "partial" | "missed"
  notes?: string
  created_at: string
}

// Chaves do localStorage
const STORAGE_KEYS = {
  CURRENT_USER: "habitforge_current_user",
  USERS: "habitforge_users",
  HABITS: "habitforge_habits",
  HABIT_LOGS: "habitforge_habit_logs",
}

// Utilitários para localStorage
export const storage = {
  get: (key: string): any | null => {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set: (key: string, value: any): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },
}

// Funções para gerenciar usuários
export const userStorage = {
  getCurrentUser: (): any | null => {
    return storage.get(STORAGE_KEYS.CURRENT_USER)
  },

  setCurrentUser: (user: any): void => {
    storage.set(STORAGE_KEYS.CURRENT_USER, user)
  },

  clearCurrentUser: (): void => {
    storage.remove(STORAGE_KEYS.CURRENT_USER)
  },

  getAllUsers: (): any[] => {
    return storage.get(STORAGE_KEYS.USERS) || []
  },

  saveUser: (user: any): void => {
    const users = userStorage.getAllUsers()
    const existingIndex = users.findIndex((u: any) => u.id === user.id)

    if (existingIndex >= 0) {
      users[existingIndex] = { ...user, updated_at: new Date().toISOString() }
    } else {
      users.push(user)
    }

    storage.set(STORAGE_KEYS.USERS, users)
  },

  findUserByEmail: (email: string): any | null => {
    const users = userStorage.getAllUsers()
    return users.find((u: any) => u.email === email) || null
  },
}

// Funções para gerenciar hábitos
export const habitStorage = {
  getUserHabits: (userId: string): any[] => {
    const habits = storage.get(STORAGE_KEYS.HABITS) || []
    return habits.filter((h: any) => h.user_id === userId)
  },

  saveHabit: (habit: any): void => {
    const habits = storage.get(STORAGE_KEYS.HABITS) || []
    const existingIndex = habits.findIndex((h: any) => h.id === habit.id)

    if (existingIndex >= 0) {
      habits[existingIndex] = { ...habit, updated_at: new Date().toISOString() }
    } else {
      habits.push(habit)
    }

    storage.set(STORAGE_KEYS.HABITS, habits)
  },

  deleteHabit: (habitId: string): void => {
    const habits = storage.get(STORAGE_KEYS.HABITS) || []
    const filtered = habits.filter((h: any) => h.id !== habitId)
    storage.set(STORAGE_KEYS.HABITS, filtered)
  },
}

// Funções para gerenciar logs de hábitos
export const habitLogStorage = {
  getHabitLogs: (habitId: string): any[] => {
    const logs = storage.get(STORAGE_KEYS.HABIT_LOGS) || []
    return logs.filter((l: any) => l.habit_id === habitId)
  },

  getUserLogs: (userId: string): any[] => {
    const logs = storage.get(STORAGE_KEYS.HABIT_LOGS) || []
    return logs.filter((l: any) => l.user_id === userId)
  },

  saveLog: (log: any): void => {
    const logs = storage.get(STORAGE_KEYS.HABIT_LOGS) || []
    const existingIndex = logs.findIndex((l: any) => l.habit_id === log.habit_id && l.date === log.date)

    if (existingIndex >= 0) {
      logs[existingIndex] = log
    } else {
      logs.push(log)
    }

    storage.set(STORAGE_KEYS.HABIT_LOGS, logs)
  },
}

/**
 * Cria hábitos e logs de exemplo para um novo usuário.
 * Isso permite testar o app sem backend.
 */
export function initializeSampleData(userId: string): void {
  const habits = [
    {
      id: `${userId}-sleep`,
      user_id: userId,
      name: "Dormir 8h",
      category: "sleep",
      icon: "🛌",
      color: "bg-purple-500",
      streak: 0,
      target_frequency: 7,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: `${userId}-water`,
      user_id: userId,
      name: "Beber 2L água",
      category: "nutrition",
      icon: "💧",
      color: "bg-blue-500",
      streak: 0,
      target_frequency: 7,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: `${userId}-workout`,
      user_id: userId,
      name: "Exercitar 30min",
      category: "movement",
      icon: "🏃",
      color: "bg-orange-500",
      streak: 0,
      target_frequency: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  // Salva hábitos de exemplo
  habits.forEach((habit: any) => habitStorage.saveHabit(habit))

  // Gera logs “completed” para os últimos 3 dias (exclui hoje)
  const today = new Date()
  habits.forEach((habit: any) => {
    for (let i = 1; i <= 3; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      habitLogStorage.saveLog({
        id: `${habit.id}-${date.toISOString().slice(0, 10)}`,
        habit_id: habit.id,
        user_id: userId,
        date: date.toISOString().slice(0, 10),
        status: "completed",
        created_at: new Date().toISOString(),
      })
    }
  })
}

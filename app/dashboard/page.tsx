"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/layout/sidebar"
import { Target, Trophy, TrendingUp, Plus, CheckCircle2, Flame, Calendar, Brain, Zap, Award, Star } from "lucide-react"
import { habitStorage, habitLogStorage, type User, type Habit } from "@/lib/local-storage"
import { getCurrentUser } from "@/lib/auth-local"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [todayHabits, setTodayHabits] = useState([
    { id: "1", name: "Dormir 8h", completed: false, xp: 50 },
    { id: "2", name: "Beber 2L água", completed: false, xp: 30 },
    { id: "3", name: "Exercitar 30min", completed: false, xp: 75 },
    { id: "4", name: "Meditar 10min", completed: false, xp: 40 },
    { id: "5", name: "Ler 20min", completed: false, xp: 35 },
    { id: "6", name: "Tempo família", completed: false, xp: 45 },
  ])
  const [weeklyStats, setWeeklyStats] = useState({
    consistency: 85,
    bestCategory: "Saúde Mental",
    improvement: "+12%",
    totalXP: 1250,
  })
  const [achievements, setAchievements] = useState([
    { name: "Constante", description: "7 dias seguidos", icon: "🔥", unlocked: true },
    { name: "3H Master", description: "Equilibrio total", icon: "⚖️", unlocked: true },
    { name: "Inquebrável", description: "30 dias seguidos", icon: "💎", unlocked: false },
  ])

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/auth/login")
          return
        }

        setUser(currentUser)

        // Carregar hábitos do usuário
        const userHabits = habitStorage.getUserHabits(currentUser.id)
        setHabits(userHabits)

        // Calcular estatísticas
        const today = new Date().toISOString().split("T")[0]
        const userLogs = habitLogStorage.getUserLogs(currentUser.id)
        const todayLogs = userLogs.filter((log) => log.date === today)
        const completedToday = todayLogs.filter((log) => log.status === "completed").length

        setTodayHabits([
          { id: "1", name: "Dormir 8h", completed: completedToday > 0, xp: 50 },
          { id: "2", name: "Beber 2L água", completed: completedToday > 1, xp: 30 },
          { id: "3", name: "Exercitar 30min", completed: completedToday > 2, xp: 75 },
          { id: "4", name: "Meditar 10min", completed: completedToday > 3, xp: 40 },
          { id: "5", name: "Ler 20min", completed: false, xp: 35 },
          { id: "6", name: "Tempo família", completed: false, xp: 45 },
        ])

        setWeeklyStats({
          consistency: 85,
          bestCategory: "Saúde Mental",
          improvement: "+12%",
          totalXP: 1250,
        })

        setAchievements([
          { name: "Constante", description: "7 dias seguidos", icon: "🔥", unlocked: true },
          { name: "3H Master", description: "Equilibrio total", icon: "⚖️", unlocked: true },
          { name: "Inquebrável", description: "30 dias seguidos", icon: "💎", unlocked: false },
        ])
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar user={user} />

      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Olá, {user.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Você está indo muito bem. Continue assim!</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Nível Atual</p>
                    <p className="text-3xl font-bold">{user.level}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-blue-200" />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>XP: {user.xp}/3000</span>
                    <span>{Math.round((user.xp / 3000) * 100)}%</span>
                  </div>
                  <Progress value={(user.xp / 3000) * 100} className="bg-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Hoje</p>
                    <p className="text-2xl font-bold">
                      {todayHabits.filter((habit) => habit.completed).length}/{habits.length}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {habits.length > 0
                    ? Math.round((todayHabits.filter((habit) => habit.completed).length / habits.length) * 100)
                    : 0}
                  % completo
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Sequência</p>
                    <p className="text-2xl font-bold text-orange-500">{user.streak}</p>
                  </div>
                  <Flame className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">dias consecutivos</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Esta Semana</p>
                    <p className="text-2xl font-bold text-purple-500">{weeklyStats.consistency}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">{weeklyStats.improvement} vs semana passada</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's Habits */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Hábitos de Hoje
                    </CardTitle>
                    <Button size="sm" onClick={() => router.push("/habits")}>
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todayHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        habit.completed
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            habit.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {habit.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`font-medium ${
                            habit.completed ? "text-green-800 dark:text-green-200" : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {habit.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          +{habit.xp} XP
                        </Badge>
                        {!habit.completed && (
                          <Button size="sm" variant="outline">
                            Marcar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                    <Brain className="w-4 h-4" />
                    Falar com LUMA
                  </Button>
                  <Button
                    className="w-full justify-start gap-2 bg-transparent"
                    variant="outline"
                    onClick={() => router.push("/progress")}
                  >
                    <Calendar className="w-4 h-4" />
                    Ver Progresso Semanal
                  </Button>
                  <Button
                    className="w-full justify-start gap-2 bg-transparent"
                    variant="outline"
                    onClick={() => router.push("/habits")}
                  >
                    <Plus className="w-4 h-4" />
                    Criar Novo Hábito
                  </Button>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Conquistas Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.unlocked
                          ? "bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
                          : "bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 opacity-60"
                      }`}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{achievement.name}</p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && <Star className="w-4 h-4 text-yellow-500 ml-auto" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Weekly Insight */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">💡 Insight da Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Princípio 80/20:</strong> Seus hábitos de sono e exercício representam 80% do seu
                      progresso semanal. Continue focando neles!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/layout/sidebar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CheckCircle2, Circle, AlertCircle, X, Calendar, Target, TrendingUp } from "lucide-react"

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

const categories = [
  { id: "sleep", name: "Sono", color: "bg-purple-500", emoji: "🛌" },
  { id: "nutrition", name: "Alimentação", color: "bg-green-500", emoji: "🥗" },
  { id: "movement", name: "Movimento", color: "bg-orange-500", emoji: "🏃" },
  { id: "mental", name: "Saúde Mental", color: "bg-blue-500", emoji: "🧘" },
  { id: "productivity", name: "Produtividade", color: "bg-indigo-500", emoji: "📚" },
  { id: "social", name: "Social & Lazer", color: "bg-pink-500", emoji: "👥" },
]

interface Habit {
  id: string
  name: string
  category: string
  icon: string
  color: string
  streak: number
  weekProgress: ("completed" | "partial" | "missed" | "pending")[]
  xp: number
  targetFrequency: number
}

export default function HabitsPage() {
  const [user] = useState({
    name: "João Silva",
    email: "joao@email.com",
    level: 12,
    xp: 2840,
  })

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Dormir 8h",
      category: "sleep",
      icon: "🛌",
      color: "bg-purple-500",
      streak: 15,
      weekProgress: ["completed", "completed", "completed", "partial", "completed", "completed", "pending"],
      xp: 50,
      targetFrequency: 7,
    },
    {
      id: "2",
      name: "Beber 2L água",
      category: "nutrition",
      icon: "💧",
      color: "bg-blue-500",
      streak: 12,
      weekProgress: ["completed", "completed", "missed", "completed", "completed", "partial", "pending"],
      xp: 30,
      targetFrequency: 7,
    },
    {
      id: "3",
      name: "Exercitar 30min",
      category: "movement",
      icon: "🏃",
      color: "bg-orange-500",
      streak: 8,
      weekProgress: ["completed", "partial", "completed", "completed", "missed", "completed", "pending"],
      xp: 75,
      targetFrequency: 5,
    },
    {
      id: "4",
      name: "Meditar 10min",
      category: "mental",
      icon: "🧘",
      color: "bg-green-500",
      streak: 20,
      weekProgress: ["completed", "completed", "completed", "completed", "completed", "completed", "pending"],
      xp: 40,
      targetFrequency: 7,
    },
    {
      id: "5",
      name: "Ler 20min",
      category: "productivity",
      icon: "📚",
      color: "bg-indigo-500",
      streak: 5,
      weekProgress: ["partial", "completed", "missed", "completed", "completed", "missed", "pending"],
      xp: 35,
      targetFrequency: 5,
    },
    {
      id: "6",
      name: "Tempo família",
      category: "social",
      icon: "👨‍👩‍👧‍👦",
      color: "bg-pink-500",
      streak: 10,
      weekProgress: ["completed", "completed", "completed", "partial", "completed", "completed", "pending"],
      xp: 45,
      targetFrequency: 7,
    },
  ])

  const [showNewHabitDialog, setShowNewHabitDialog] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: "",
    category: "",
    icon: "",
    targetFrequency: 7,
  })

  const getProgressIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "partial":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "missed":
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const toggleHabitStatus = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId) {
          const newProgress = [...habit.weekProgress]
          const currentStatus = newProgress[dayIndex]

          if (currentStatus === "pending") newProgress[dayIndex] = "completed"
          else if (currentStatus === "completed") newProgress[dayIndex] = "partial"
          else if (currentStatus === "partial") newProgress[dayIndex] = "missed"
          else newProgress[dayIndex] = "pending"

          return { ...habit, weekProgress: newProgress }
        }
        return habit
      }),
    )
  }

  const getWeeklyCompletion = (habit: Habit) => {
    const completed = habit.weekProgress.filter((status) => status === "completed").length
    return Math.round((completed / habit.targetFrequency) * 100)
  }

  const createNewHabit = () => {
    if (!newHabit.name || !newHabit.category) return

    const category = categories.find((c) => c.id === newHabit.category)
    if (!category) return

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      category: newHabit.category,
      icon: newHabit.icon || category.emoji,
      color: category.color,
      streak: 0,
      weekProgress: Array(7).fill("pending"),
      xp: 25,
      targetFrequency: newHabit.targetFrequency,
    }

    setHabits((prev) => [...prev, habit])
    setNewHabit({ name: "", category: "", icon: "", targetFrequency: 7 })
    setShowNewHabitDialog(false)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar user={user} />

      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Meus Hábitos</h1>
              <p className="text-gray-600 dark:text-gray-400">Gerencie e acompanhe seus hábitos diários</p>
            </div>

            <Dialog open={showNewHabitDialog} onOpenChange={setShowNewHabitDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Hábito
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Hábito</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="habit-name">Nome do Hábito</Label>
                    <Input
                      id="habit-name"
                      placeholder="Ex: Beber 2L de água"
                      value={newHabit.name}
                      onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="habit-category">Categoria</Label>
                    <Select
                      value={newHabit.category}
                      onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.emoji} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="habit-frequency">Frequência Semanal</Label>
                    <Select
                      value={newHabit.targetFrequency.toString()}
                      onValueChange={(value) => setNewHabit({ ...newHabit, targetFrequency: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x por semana</SelectItem>
                        <SelectItem value="2">2x por semana</SelectItem>
                        <SelectItem value="3">3x por semana</SelectItem>
                        <SelectItem value="5">5x por semana</SelectItem>
                        <SelectItem value="7">Todos os dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="habit-icon">Emoji (opcional)</Label>
                    <Input
                      id="habit-icon"
                      placeholder="🎯"
                      value={newHabit.icon}
                      onChange={(e) => setNewHabit({ ...newHabit, icon: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={createNewHabit} className="flex-1">
                      Criar Hábito
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewHabitDialog(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total de Hábitos</p>
                    <p className="text-2xl font-bold">{habits.length}</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Média Semanal</p>
                    <p className="text-2xl font-bold text-green-500">
                      {Math.round(habits.reduce((acc, habit) => acc + getWeeklyCompletion(habit), 0) / habits.length)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Melhor Sequência</p>
                    <p className="text-2xl font-bold text-orange-500">{Math.max(...habits.map((h) => h.streak))}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Habits Table */}
          <Card>
            <CardHeader>
              <CardTitle>Tabela Semanal de Hábitos</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Header */}
              <div className="grid grid-cols-9 gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="col-span-2">
                  <p className="font-medium text-gray-700 dark:text-gray-300">Hábito</p>
                </div>
                {weekDays.map((day) => (
                  <div key={day} className="text-center">
                    <p className="text-sm font-medium text-gray-500">{day}</p>
                  </div>
                ))}
              </div>

              {/* Habits */}
              <div className="space-y-4">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="grid grid-cols-9 gap-4 items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="col-span-2 flex items-center gap-3">
                      <span className="text-2xl">{habit.icon}</span>
                      <div>
                        <p className="font-medium">{habit.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {habit.streak} dias
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {getWeeklyCompletion(habit)}%
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {habit.weekProgress.map((status, dayIndex) => (
                      <div key={dayIndex} className="flex justify-center">
                        <button
                          onClick={() => toggleHabitStatus(habit.id, dayIndex)}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {getProgressIcon(status)}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

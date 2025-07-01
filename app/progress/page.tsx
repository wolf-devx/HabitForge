"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/layout/sidebar"
import { TrendingUp, Calendar, Target, Award, BarChart3, PieChart, Activity, Zap } from "lucide-react"

const categories = [
  { id: "sleep", name: "Sono", color: "bg-purple-500", textColor: "text-purple-700" },
  { id: "nutrition", name: "Alimentação", color: "bg-green-500", textColor: "text-green-700" },
  { id: "movement", name: "Movimento", color: "bg-orange-500", textColor: "text-orange-700" },
  { id: "mental", name: "Saúde Mental", color: "bg-blue-500", textColor: "text-blue-700" },
  { id: "productivity", name: "Produtividade", color: "bg-indigo-500", textColor: "text-indigo-700" },
  { id: "social", name: "Social & Lazer", color: "bg-pink-500", textColor: "text-pink-700" },
]

export default function ProgressPage() {
  const [user] = useState({
    name: "João Silva",
    email: "joao@email.com",
    level: 12,
    xp: 2840,
  })

  const [weeklyData] = useState([
    { week: "Sem 1", completion: 65, xp: 850 },
    { week: "Sem 2", completion: 72, xp: 920 },
    { week: "Sem 3", completion: 78, xp: 1050 },
    { week: "Sem 4", completion: 85, xp: 1250 },
  ])

  const [categoryProgress] = useState([
    { category: "sleep", name: "Sono", progress: 92, habits: 2, streak: 15 },
    { category: "nutrition", name: "Alimentação", progress: 78, habits: 2, streak: 8 },
    { category: "movement", name: "Movimento", progress: 85, habits: 1, streak: 12 },
    { category: "mental", name: "Saúde Mental", progress: 95, habits: 1, streak: 20 },
    { category: "productivity", name: "Produtividade", progress: 68, habits: 1, streak: 5 },
    { category: "social", name: "Social & Lazer", progress: 88, habits: 1, streak: 10 },
  ])

  const [insights] = useState([
    {
      type: "80/20",
      title: "Princípio de Pareto Detectado",
      description: "Seus 3 hábitos principais (sono, exercício, meditação) representam 80% do seu progresso semanal.",
      color: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      type: "correlation",
      title: "Correlação Identificada",
      description: "Quando você dorme bem, tem 85% mais chance de completar o exercício no dia seguinte.",
      color: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-300",
    },
    {
      type: "improvement",
      title: "Área de Melhoria",
      description: "Sua consistência em produtividade pode melhorar. Tente aplicar a regra dos 2 minutos.",
      color: "bg-yellow-50 dark:bg-yellow-900/20",
      textColor: "text-yellow-700 dark:text-yellow-300",
    },
  ])

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.color || "bg-gray-500"
  }

  const getCategoryTextColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.textColor || "text-gray-700"
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar user={user} />

      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progresso & Análises</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Acompanhe sua evolução e descubra insights sobre seus hábitos
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Esta Semana</p>
                    <p className="text-2xl font-bold text-green-500">85%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-green-600 mt-2">+12% vs semana passada</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">XP Total</p>
                    <p className="text-2xl font-bold text-purple-500">1,250</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-sm text-purple-600 mt-2">Esta semana</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Melhor Categoria</p>
                    <p className="text-2xl font-bold text-blue-500">95%</p>
                  </div>
                  <Award className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-sm text-blue-600 mt-2">Saúde Mental</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Sequência Atual</p>
                    <p className="text-2xl font-bold text-orange-500">15</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-sm text-orange-600 mt-2">dias consecutivos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Progress Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Evolução Semanal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((week, index) => (
                      <div key={week.week} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{week.week}</span>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{week.completion}%</Badge>
                            <Badge variant="secondary">+{week.xp} XP</Badge>
                          </div>
                        </div>
                        <Progress value={week.completion} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">📈 Tendência Positiva</h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Você está em uma trajetória ascendente! Sua consistência melhorou 20% no último mês.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Breakdown */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryProgress.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <Badge variant="outline">{item.progress}%</Badge>
                      </div>
                      <Progress value={item.progress} />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{item.habits} hábito(s)</span>
                        <span>{item.streak} dias sequência</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Insights Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Insights Inteligentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg ${insight.color}`}>
                    <h3 className={`font-medium mb-2 ${insight.textColor}`}>{insight.title}</h3>
                    <p className={`text-sm ${insight.textColor}`}>{insight.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Monthly Summary */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Resumo do Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">28</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Dias ativos</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">4,070</div>
                    <div className="text-sm text-green-700 dark:text-green-300">XP conquistado</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">82%</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Taxa de sucesso</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🎯 Meta do Próximo Mês</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Baseado no seu progresso, sugiro focar em aumentar a consistência em produtividade para 85%. Isso
                    pode elevar sua taxa geral para 90%!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

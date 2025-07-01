"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/layout/sidebar"
import { Trophy, Award, Star, Calendar, Target, Zap, Crown, Medal, Flame, Edit } from "lucide-react"

export default function ProfilePage() {
  const [user] = useState({
    name: "João Silva",
    email: "joao@email.com",
    level: 12,
    xp: 2840,
    xpToNext: 3000,
    joinDate: "Janeiro 2024",
    totalDays: 156,
    successRate: 89,
    totalXP: 15420,
    bestStreak: 25,
    currentStreak: 15,
  })

  const [achievements] = useState([
    {
      id: "1",
      name: "Primeiro Passo",
      description: "Criou seu primeiro hábito",
      icon: "🎯",
      unlocked: true,
      unlockedAt: "15 Jan 2024",
      rarity: "common",
    },
    {
      id: "2",
      name: "Tiro Curto",
      description: "3 dias consecutivos",
      icon: "🔥",
      unlocked: true,
      unlockedAt: "18 Jan 2024",
      rarity: "common",
    },
    {
      id: "3",
      name: "Constante",
      description: "7 dias consecutivos",
      icon: "⚡",
      unlocked: true,
      unlockedAt: "22 Jan 2024",
      rarity: "uncommon",
    },
    {
      id: "4",
      name: "Dedicado",
      description: "15 dias consecutivos",
      icon: "🌟",
      unlocked: true,
      unlockedAt: "05 Fev 2024",
      rarity: "rare",
    },
    {
      id: "5",
      name: "3H Master",
      description: "Equilibrou Head, Heart, Hands",
      icon: "⚖️",
      unlocked: true,
      unlockedAt: "12 Fev 2024",
      rarity: "epic",
    },
    {
      id: "6",
      name: "Inquebrável",
      description: "30 dias consecutivos",
      icon: "💎",
      unlocked: false,
      unlockedAt: null,
      rarity: "legendary",
    },
    {
      id: "7",
      name: "Centurião",
      description: "100 dias de atividade",
      icon: "🏛️",
      unlocked: false,
      unlockedAt: null,
      rarity: "legendary",
    },
    {
      id: "8",
      name: "Mestre Zen",
      description: "50 dias de meditação",
      icon: "🧘",
      unlocked: false,
      unlockedAt: null,
      rarity: "epic",
    },
  ])

  const [stats] = useState([
    { label: "Dias Total", value: user.totalDays, icon: Calendar, color: "text-blue-500" },
    { label: "Taxa de Sucesso", value: `${user.successRate}%`, icon: Target, color: "text-green-500" },
    { label: "XP Total", value: user.totalXP.toLocaleString(), icon: Zap, color: "text-purple-500" },
    { label: "Melhor Sequência", value: user.bestStreak, icon: Flame, color: "text-orange-500" },
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      case "uncommon":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common":
        return <Medal className="w-4 h-4" />
      case "uncommon":
        return <Award className="w-4 h-4" />
      case "rare":
        return <Star className="w-4 h-4" />
      case "epic":
        return <Trophy className="w-4 h-4" />
      case "legendary":
        return <Crown className="w-4 h-4" />
      default:
        return <Medal className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar user={user} />

      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Meu Perfil</h1>
            <p className="text-gray-600 dark:text-gray-400">Acompanhe suas conquistas e estatísticas</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      Nível {user.level}
                    </Badge>
                    <Badge variant="outline">Membro desde {user.joinDate}</Badge>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Progresso para Nível {user.level + 1}</span>
                      <span>{Math.round((user.xp / user.xpToNext) * 100)}%</span>
                    </div>
                    <Progress value={(user.xp / user.xpToNext) * 100} />
                    <p className="text-xs text-gray-500">
                      {user.xp} / {user.xpToNext} XP
                    </p>
                  </div>

                  <Button className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Achievements */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Estatísticas Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}
                        >
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Conquistas
                    <Badge variant="secondary" className="ml-2">
                      {achievements.filter((a) => a.unlocked).length}/{achievements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border transition-all ${
                          achievement.unlocked
                            ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
                            : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{achievement.name}</h3>
                              <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                {getRarityIcon(achievement.rarity)}
                                <span className="ml-1 capitalize">{achievement.rarity}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                            {achievement.unlocked && achievement.unlockedAt && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                Desbloqueado em {achievement.unlockedAt}
                              </p>
                            )}
                            {!achievement.unlocked && <p className="text-xs text-gray-500">Bloqueado</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Resumo de Progresso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{user.currentStreak}</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Sequência Atual</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {user.bestStreak - user.currentStreak} para bater recorde
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-2">{user.successRate}%</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Taxa de Sucesso</div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">+5% este mês</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{user.level}</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Nível Atual</div>
                      <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        {user.xpToNext - user.xp} XP para próximo
                      </div>
                    </div>
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

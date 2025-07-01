import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Target, Brain, TrendingUp, Users, Star, CheckCircle, Zap, Award, ArrowRight } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: "Planejamento Personalizado",
      description:
        "Crie rotinas baseadas em 6 categorias essenciais: sono, alimentação, movimento, saúde mental, produtividade e social.",
    },
    {
      icon: Brain,
      title: "Assistente LUMA",
      description:
        "IA integrada que conhece profundamente os princípios 8-8-8, 80/20, 3F, 3S e 3H para orientar sua jornada.",
    },
    {
      icon: TrendingUp,
      title: "Análises Inteligentes",
      description: "Relatórios semanais com insights baseados no princípio 80/20 e correlações entre seus hábitos.",
    },
    {
      icon: Award,
      title: "Gamificação Completa",
      description: "Sistema de XP, níveis, conquistas e desafios para manter você motivado e engajado.",
    },
  ]

  const principles = [
    { name: "8-8-8", description: "8h trabalho, 8h descanso, 8h vida pessoal" },
    { name: "80/20", description: "Foque nos 20% que geram 80% dos resultados" },
    { name: "3F", description: "Foco, Força e Fé em equilíbrio" },
    { name: "3S", description: "Simples, Sustentável e Sistematizado" },
    { name: "3H", description: "Head (mente), Heart (coração), Hands (ação)" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HabitForge
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Começar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            ✨ Construa Hábitos com Ciência e IA
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              HabitForge
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Transforme sua vida com o aplicativo mais inteligente para construção de hábitos saudáveis. Baseado em
            frameworks comprovados e assistido por IA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-4">
                <Zap className="w-5 h-5 mr-2" />
                Começar Jornada
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                <Users className="w-5 h-5 mr-2" />
                Já tenho conta
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
              <div className="text-gray-600 dark:text-gray-400">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-gray-600 dark:text-gray-400">Taxa de sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">2.5M</div>
              <div className="text-gray-600 dark:text-gray-400">Hábitos completados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Funcionalidades Principais</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tudo que você precisa para construir e manter hábitos saudáveis de forma inteligente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Baseado em Frameworks Comprovados</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Nossa IA LUMA conhece profundamente estes princípios para orientar sua jornada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{principle.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Pronto para Transformar sua Vida?</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de pessoas que já estão construindo hábitos saudáveis com o HabitForge
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Star className="w-5 h-5 mr-2" />
                Começar Gratuitamente
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Grátis para começar
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Sem cartão de crédito
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Cancele quando quiser
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">HabitForge</h3>
          </div>

          <p className="text-gray-400 mb-6">
            Construindo hábitos saudáveis com inteligência artificial e ciência comportamental
          </p>

          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">© 2024 HabitForge. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

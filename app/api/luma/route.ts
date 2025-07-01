import { type NextRequest, NextResponse } from "next/server"

const LUMA_RESPONSES = {
  "80/20": [
    "Baseado no princípio 80/20, identifiquei que seus 3 hábitos principais (sono, exercício e meditação) são responsáveis por 80% do seu bem-estar geral. Sugiro focar energia neles primeiro.",
    "Aplicando Pareto aos seus dados: 20% dos seus hábitos geram 80% dos resultados. Priorize sono de qualidade e movimento diário - eles impactam todos os outros.",
  ],
  "3S": [
    "Vamos aplicar o 3S (Simples, Sustentável, Sistematizado): Comece com apenas 5 minutos de meditação pela manhã. Simples de fazer, sustentável a longo prazo, e sistematize colocando no mesmo horário todos os dias.",
    "Para tornar seus hábitos mais 3S: Simplifique reduzindo para o mínimo viável, torne sustentável conectando com sua rotina existente, e sistematize usando gatilhos automáticos.",
  ],
  "3H": [
    "Aplicando o 3H (Head, Heart, Hands): Head - entenda POR QUE este hábito é importante para você. Heart - conecte emocionalmente com o benefício. Hands - defina a ação específica e quando fazer.",
    "Vejo que você perdeu alguns dias de leitura. Vamos usar 3H: Head (escolha um livro que realmente te interessa), Heart (conecte com sua motivação de crescer), Hands (reserve 10min antes de dormir).",
  ],
  "8-8-8": [
    "A regra 8-8-8 sugere: 8h trabalho, 8h descanso, 8h vida pessoal. Analisando seus dados, você está desequilibrado no descanso. Que tal priorizar o hábito de sono primeiro?",
    "Seus dados mostram que quando você segue o 8-8-8, sua consistência nos outros hábitos aumenta 40%. O equilíbrio é a chave!",
  ],
  "3F": [
    "Os 3F (Foco, Força, Fé) estão conectados aos seus hábitos: Foco vem da meditação, Força do exercício, e Fé dos momentos em família. Você está forte no Foco e Força, mas pode investir mais na Fé.",
    "Para fortalecer os 3F: mantenha o foco com meditação diária, desenvolva força física e mental com exercícios, e cultive fé através de conexões significativas.",
  ],
  correlacao: [
    "Detectei uma correlação interessante: quando você dorme bem, tem 85% mais chance de completar o exercício no dia seguinte. O sono é seu hábito-chave!",
    "Seus dados mostram que meditação pela manhã aumenta em 60% a probabilidade de você completar todos os outros hábitos do dia. É um efeito dominó positivo!",
  ],
  motivacao: [
    "Lembre-se: você não está construindo hábitos, está se tornando o tipo de pessoa que tem esses hábitos. Cada repetição é um voto na sua nova identidade.",
    "Pequenos progressos diários levam a grandes transformações. Você já provou isso com sua sequência de 15 dias. Continue, você está no caminho certo!",
  ],
  ajuste: [
    "Se você perdeu alguns dias, não se preocupe. O importante é voltar rapidamente. Que tal reduzir temporariamente a intensidade para manter a consistência?",
    "Para recuperar o momentum, sugiro a regra dos 2 minutos: faça a versão mais simples do hábito por alguns dias até recuperar o ritmo.",
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { message, userContext } = await request.json()

    // Simular processamento da IA
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Determinar tipo de resposta baseado na mensagem
    let responseType = "motivacao"

    if (message.toLowerCase().includes("80/20") || message.toLowerCase().includes("pareto")) {
      responseType = "80/20"
    } else if (message.toLowerCase().includes("3s") || message.toLowerCase().includes("simples")) {
      responseType = "3S"
    } else if (message.toLowerCase().includes("3h") || message.toLowerCase().includes("cabeça")) {
      responseType = "3H"
    } else if (message.toLowerCase().includes("8-8-8") || message.toLowerCase().includes("equilibrio")) {
      responseType = "8-8-8"
    } else if (message.toLowerCase().includes("3f") || message.toLowerCase().includes("foco")) {
      responseType = "3F"
    } else if (message.toLowerCase().includes("correlação") || message.toLowerCase().includes("padrão")) {
      responseType = "correlacao"
    } else if (message.toLowerCase().includes("perdi") || message.toLowerCase().includes("falhei")) {
      responseType = "ajuste"
    }

    const responses = LUMA_RESPONSES[responseType as keyof typeof LUMA_RESPONSES]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return NextResponse.json({
      response: randomResponse,
      type: responseType,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro na API LUMA:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

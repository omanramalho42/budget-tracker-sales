"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Clock,
  Sparkles,
  PiggyBank,
  ChevronRight,
  Send,
  X,
  Check,
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })
  const [showUserAlert, setShowUserAlert] = useState(false)
  const [userCount, setUserCount] = useState(1247)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [showNotification, setShowNotification] = useState(true)
  const [hasSeenNotification, setHasSeenNotification] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! 👋 Bem-vindo ao Budget Tracker. Como posso ajudá-lo hoje?",
      isBot: true,
      timestamp: new Date(),
      reactions: [] as string[],
      status: "delivered" as "sent" | "delivered",
    },
  ])

  // Countdown timer for promotion
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // User registration alert every 1 minute
  useEffect(() => {
    const alertTimer = setInterval(() => {
      setShowUserAlert(true)
      setUserCount((prev) => prev + 1)
      setTimeout(() => setShowUserAlert(false), 5000)
    }, 60000)

    return () => clearInterval(alertTimer)
  }, [])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const whatsappNumber = "5585982240002"
      const message = encodeURIComponent(chatMessage)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

      // Add user message with 'sent' status
      const newMessage = {
        id: messages.length + 1,
        text: chatMessage,
        isBot: false,
        timestamp: new Date(),
        reactions: [],
        status: "sent" as "sent" | "delivered",
      }

      setMessages((prev) => [...prev, newMessage])

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank")

      // Clear input
      setChatMessage("")

      // Simulate message delivery after 1 second
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" as "sent" | "delivered" } : msg)),
        )

        // Add automatic support response after 2 seconds
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text: "Obrigado pela sua mensagem! Nossa equipe entrará em contato com você em breve via WhatsApp. 🚀",
              isBot: true,
              timestamp: new Date(),
              reactions: [],
              status: "delivered" as "sent" | "delivered",
            },
          ])
        }, 2000)
      }, 1000)
    }
  }

  const toggleReaction = (messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const hasReaction = msg.reactions.includes(emoji)
          return {
            ...msg,
            reactions: hasReaction ? msg.reactions.filter((r) => r !== emoji) : [...msg.reactions, emoji],
          }
        }
        return msg
      }),
    )
  }

  const handleChatOpen = () => {
    setIsChatOpen(true)
    setShowNotification(false)
    setHasSeenNotification(true)
  }

  const plans = [
    {
      name: "Básico",
      price: "R$ 29",
      period: "/mês",
      description: "Perfeito para começar sua jornada financeira",
      features: [
        "Até 50 transações por mês",
        "Relatórios básicos",
        "Suporte por email",
        "Acesso mobile e web",
        "1 categoria personalizada",
      ],
      cta: "Começar Grátis",
      popular: false,
    },
    {
      name: "Pro",
      price: "R$ 59",
      period: "/mês",
      description: "Para quem busca controle total das finanças",
      features: [
        "Transações ilimitadas",
        "Relatórios avançados e insights",
        "Suporte prioritário 24/7",
        "Acesso em todos dispositivos",
        "Categorias ilimitadas",
        "Exportação de dados",
        "Alertas personalizados",
      ],
      cta: "Teste Grátis por 14 Dias",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "R$ 149",
      period: "/mês",
      description: "Para empresas e profissionais liberais",
      features: [
        "Tudo do plano Pro",
        "Múltiplas contas",
        "API de integração",
        "Gerente de conta dedicado",
        "Treinamento personalizado",
        "Backup automático",
        "Relatórios personalizados",
        "Acesso para equipe (até 5 usuários)",
      ],
      cta: "Falar com Especialista",
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empreendedora",
      content:
        "Desde que comecei a usar o Budget Tracker, consegui economizar 30% do meu salário todo mês. A interface é intuitiva e os relatórios me ajudam a tomar decisões melhores.",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "João Santos",
      role: "Freelancer",
      content:
        "Finalmente encontrei uma ferramenta que me ajuda a separar minhas finanças pessoais das profissionais. O suporte é excelente e os insights são valiosos!",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: "Ana Costa",
      role: "Professora",
      content:
        "Nunca imaginei que controlar minhas finanças poderia ser tão simples. Em 2 meses já quitei uma dívida que me perseguia há anos. Recomendo demais!",
      rating: 5,
      avatar: "👩‍🏫",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0515] via-[#1a0e2e] to-[#0a0515] text-white">
      {/* User Registration Alert */}
      {showUserAlert && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-from-top max-w-sm">
          <Alert className="bg-yellow-500/10 border-yellow-500/50 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-100 text-sm">
              <strong>🎉 Novo usuário cadastrado!</strong> {userCount} pessoas já estão transformando suas finanças.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#1a0e2e]/80 backdrop-blur-md z-40 border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
            <span className="text-lg md:text-2xl font-bold text-yellow-500">Budget Tracker</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#recursos" className="hover:text-yellow-500 transition-colors">
              Recursos
            </a>
            <a href="#planos" className="hover:text-yellow-500 transition-colors">
              Preços
            </a>
            <a href="#depoimentos" className="hover:text-yellow-500 transition-colors">
              Depoimentos
            </a>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent"
            >
              <Link href="https://budget-tracker-app-pearl.vercel.app/">Entrar</Link>
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden border-yellow-500 text-yellow-500 bg-transparent"
            asChild
          >
            <Link href="https://budget-tracker-app-pearl.vercel.app/">Entrar</Link>
          </Button>
        </div>
      </nav>

      {/* Countdown Timer Banner */}
      <div className="mt-16 w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 py-3 md:py-4 text-center text-black font-bold shadow-2xl animate-pulse">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-base md:text-2xl px-4">
          <div className="flex items-center gap-2 md:gap-3">
            <Clock className="h-5 w-5 md:h-8 md:w-8 animate-spin" style={{ animationDuration: "2s" }} />
            <span className="uppercase tracking-wider font-black text-sm md:text-xl">
              🔥 PROMOÇÃO ÚNICA TERMINA EM:
            </span>
          </div>
          <span className="font-mono text-xl md:text-3xl bg-black/30 px-4 md:px-6 py-1 md:py-2 rounded-xl shadow-lg font-black">
            {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="uppercase tracking-wider font-black text-sm md:text-xl animate-bounce">
            ⚡ NÃO PERCA! 🚀
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 md:pt-16 pb-12 md:pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50 text-xs md:text-sm">
              ✨ Mais de {userCount} usuários confiam em nós
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Gerencie suas finanças de forma <span className="text-yellow-500">fácil e eficiente</span>
            </h1>
            <p className="text-base md:text-xl text-gray-300 text-pretty">
              Controle seus depósitos e retiradas em um painel intuitivo e mantenha seu orçamento sob controle. Tome
              decisões financeiras inteligentes com insights em tempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
              >
                Comece Agora Grátis <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-transparent"
                asChild
              >
                <Link href="https://budget-tracker-app-pearl.vercel.app/">Ver Demonstração</Link>
              </Button>
            </div>
            <p className="text-xs md:text-sm text-gray-400">
              🎁 Experimente grátis. Não é necessário cartão de crédito.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                <span className="text-xs md:text-sm">Painel fácil de usar</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                <span className="text-xs md:text-sm">Segurança dos seus dados</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
            <img
              src="/images/captura-20de-20tela-202025-12-31-20010008.png"
              alt="Budget Tracker Dashboard"
              className="relative rounded-lg shadow-2xl border border-yellow-500/30 w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-12 md:py-20 bg-[#2a1548]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Tudo que você precisa para <span className="text-yellow-500">controlar seu dinheiro</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
              Ferramentas poderosas que transformam a forma como você gerencia suas finanças
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <TrendingUp className="h-10 w-10 md:h-12 md:w-12 text-yellow-500" />,
                title: "Visualização em Tempo Real",
                description:
                  "Acompanhe seus depósitos, retiradas e saldo com gráficos interativos e atualizações instantâneas.",
              },
              {
                icon: <Shield className="h-10 w-10 md:h-12 md:w-12 text-yellow-500" />,
                title: "Segurança de Ponta",
                description:
                  "Seus dados são protegidos com criptografia de nível bancário e autenticação de dois fatores.",
              },
              {
                icon: <Zap className="h-10 w-10 md:h-12 md:w-12 text-yellow-500" />,
                title: "Insights Inteligentes",
                description:
                  "Receba alertas e recomendações personalizadas para otimizar seus gastos e aumentar suas economias.",
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="bg-[#1a0e2e]/50 border-yellow-500/30 hover:border-yellow-500 transition-all hover:scale-105"
              >
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl md:text-2xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
              <Link href="https://budget-tracker-app-pearl.vercel.app/">
                Experimente Todos os Recursos <ChevronRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50 text-xs md:text-sm">
              🎯 Personalizado para você
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Crie sua <span className="text-yellow-500">planilha personalizada</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300">
              Responda nosso quiz inteligente e receba uma planilha financeira customizada de acordo com seu perfil e
              objetivos.
            </p>
            <ul className="space-y-3">
              {[
                "Análise do seu perfil financeiro",
                "Metas personalizadas baseadas em suas respostas",
                "Planilha pronta para usar imediatamente",
                "Dicas exclusivas para seu caso",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold w-full sm:w-auto"
              asChild
            >
              <Link href="https://budget-tracket-quizz.vercel.app/">
                Fazer Quiz Gratuito <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
            <Card className="relative bg-gradient-to-br from-yellow-500/10 to-purple-500/10 border-yellow-500/50 p-6 md:p-8">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-white">Quiz Financeiro</CardTitle>
                <CardDescription className="text-sm md:text-base text-gray-300">
                  Descubra seu perfil e receba recomendações personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 md:p-4 bg-[#1a0e2e]/50 rounded-lg">
                  <span className="text-sm md:text-base">✅ Rápido (3 minutos)</span>
                </div>
                <div className="flex items-center justify-between p-3 md:p-4 bg-[#1a0e2e]/50 rounded-lg">
                  <span className="text-sm md:text-base">✅ 100% Gratuito</span>
                </div>
                <div className="flex items-center justify-between p-3 md:p-4 bg-[#1a0e2e]/50 rounded-lg">
                  <span className="text-sm md:text-base">✅ Resultados Instantâneos</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12 md:py-20 bg-[#2a1548]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Veja o <span className="text-yellow-500">Budget Tracker em ação</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8">
              Explore todas as funcionalidades gratuitamente. Sem compromisso, sem cartão de crédito.
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base md:text-lg px-8 md:px-12 py-5 md:py-6"
              asChild
            >
              <Link href="https://budget-tracker-app-pearl.vercel.app/">
                Acessar Demonstração Gratuita <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </Button>
          </div>
          <div className="max-w-5xl mx-auto mt-8 md:mt-12">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-yellow-500/50">
              <img src="/images/chatgpt-20image-2031-20de-20dez.png" alt="Budget Tracker Demo" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e2e] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-12 md:py-20 container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            O que nossos <span className="text-yellow-500">usuários dizem</span>
          </h2>
          <p className="text-base md:text-xl text-gray-300">
            Milhares de pessoas já transformaram suas vidas financeiras
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="bg-[#1a0e2e]/50 border-yellow-500/30 hover:border-yellow-500 transition-all">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl md:text-4xl">{testimonial.avatar}</div>
                  <div>
                    <CardTitle className="text-base md:text-lg text-white">{testimonial.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{testimonial.role}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-gray-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8 md:mt-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 md:px-6 py-2 md:py-3">
            <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-500 text-yellow-500" />
            <span className="text-sm md:text-base font-semibold">4.9/5 baseado em 1,247+ avaliações</span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-12 md:py-20 bg-[#2a1548]/50 relative">
        <div className="container mx-auto px-4 relative">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="inline-block mb-4">
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50 text-sm md:text-base px-4 py-2">
                  🚧 VERSÃO BETA
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Em Breve: Novidades Incríveis!
              </h3>
              <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Estamos preparando planos exclusivos com funcionalidades revolucionárias para transformar completamente
                sua gestão financeira. Fique ligado!
              </p>
              <div className="mt-6 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 animate-pulse" />
                <span className="text-sm md:text-base text-yellow-500 font-semibold">Lançamento em breve</span>
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="text-center mb-12 md:mb-16 opacity-30">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Escolha o plano <span className="text-yellow-500">perfeito para você</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300">Todos os planos incluem 14 dias de teste gratuito</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto opacity-30">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative flex flex-col ${plan.popular ? "border-yellow-500 shadow-2xl shadow-yellow-500/20 lg:scale-105" : "border-yellow-500/30"} bg-[#1a0e2e]/50`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-black font-bold px-3 md:px-4 py-1 text-xs md:text-sm">
                      🔥 MAIS POPULAR
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-sm md:text-base text-gray-300">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl md:text-5xl font-bold text-yellow-500">{plan.price}</span>
                    <span className="text-sm md:text-base text-gray-400">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    className={`w-full ${plan.popular ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"} font-bold text-sm md:text-base`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <p className="text-sm md:text-base text-gray-400 mb-6">
              💳 Aceitamos todos os principais cartões de crédito
            </p>
            <Button variant="link" className="text-sm md:text-base text-yellow-500 hover:text-yellow-400">
              Ver comparação completa de planos →
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-yellow-600/20 to-purple-600/20 border border-yellow-500/50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Pronto para <span className="text-yellow-500">transformar suas finanças?</span>
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão no controle do seu dinheiro. Comece gratuitamente hoje mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base md:text-lg px-8 md:px-12 py-5 md:py-6 w-full sm:w-auto"
            >
              Criar Conta Grátis <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-base md:text-lg px-8 md:px-12 py-5 md:py-6 bg-transparent w-full sm:w-auto"
              asChild
            >
              <Link href="https://budget-tracket-quizz.vercel.app/">Fazer Quiz Primeiro</Link>
            </Button>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-4 md:mt-6">
            ⚡ Configure em menos de 2 minutos • 🔒 100% seguro • ❌ Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 py-8 md:py-12 bg-[#1a0e2e]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <PiggyBank className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                <span className="text-lg md:text-xl font-bold text-yellow-500">Budget Tracker</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">Sua solução completa para gestão financeira pessoal.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white text-sm md:text-base">Produto</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li>
                  <a href="#recursos" className="hover:text-yellow-500">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#planos" className="hover:text-yellow-500">
                    Preços
                  </a>
                </li>
                <li>
                  <Link href="https://budget-tracker-app-pearl.vercel.app/" className="hover:text-yellow-500">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="https://budget-tracket-quizz.vercel.app/" className="hover:text-yellow-500">
                    Quiz
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white text-sm md:text-base">Suporte</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white text-sm md:text-base">Legal</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-500">
                    Segurança
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-yellow-500/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-400">
            <p>&copy; 2025 Budget Tracker. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Chat Floating Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button
          onClick={handleChatOpen}
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 group"
          aria-label="Abrir chat"
        >
          <img
            src="/images/chatgpt-20image-203-20de-20dez.png"
            alt="TouchTech Chat"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-yellow-500/0 group-hover:bg-yellow-500/20 transition-colors"></div>

          {showNotification && !hasSeenNotification && (
            <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full border-2 border-[#0a0515] animate-pulse"></div>
          )}
        </button>

        {/* Notification bubble */}
        {showNotification && !hasSeenNotification && (
          <div className="absolute bottom-16 md:bottom-20 right-0 w-56 md:w-64 bg-white rounded-lg shadow-2xl p-3 md:p-4 animate-in slide-in-from-bottom-5">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            <div className="flex gap-2 md:gap-3">
              <img
                src="/images/chatgpt-20image-203-20de-20dez.png"
                alt="TouchTech"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-gray-900 text-xs md:text-sm">TouchTech Support</p>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  Olá! Precisa de ajuda? Estou aqui para responder suas dúvidas.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-[#1a0e2e] border-yellow-500/30 text-white sm:max-w-md p-0 gap-0">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/chatgpt-20image-203-20de-20dez.png"
                  alt="TouchTech"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <DialogTitle className="text-base md:text-lg text-white font-bold">TouchTech Support</DialogTitle>
                <DialogDescription className="text-purple-100 text-xs md:text-sm">
                  Online • Responde em minutos
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 bg-[#0a0515]">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}>
                {message.isBot && (
                  <img
                    src="/images/chatgpt-20image-203-20de-20dez.png"
                    alt="Bot"
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0"
                  />
                )}
                <div className="space-y-1 max-w-xs">
                  <div
                    className={`rounded-2xl px-3 md:px-4 py-2 ${
                      message.isBot
                        ? "bg-[#2a1548] text-white shadow-sm border border-yellow-500/20"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    }`}
                  >
                    <p className="text-xs md:text-sm">{message.text}</p>
                  </div>

                  {/* Reaction emojis */}
                  {message.isBot && (
                    <div className="flex gap-1 px-2">
                      {["👍", "❤️", "😊"].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => toggleReaction(message.id, emoji)}
                          className={`text-xs transition-all hover:scale-125 ${
                            message.reactions.includes(emoji) ? "opacity-100 scale-110" : "opacity-40 hover:opacity-100"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 px-2">
                    {message.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {!message.isBot && (
                    <div className="flex justify-end mt-1">
                      {message.status === "sent" && <Check className="w-3 h-3 text-gray-300" />}
                      {message.status === "delivered" && (
                        <div className="flex -space-x-1">
                          <Check className="w-3 h-3 text-yellow-400" />
                          <Check className="w-3 h-3 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-[#1a0e2e] border-t border-yellow-500/20">
            <div className="flex gap-2">
              <Textarea
                placeholder="Digite sua mensagem..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="min-h-12 max-h-24 bg-[#0a0515] border-yellow-500/30 text-white placeholder:text-gray-500 focus:border-purple-500 resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-auto px-3 md:px-4"
                disabled={!chatMessage.trim()}
              >
                <Send className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Conectado via WhatsApp • Resposta garantida</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

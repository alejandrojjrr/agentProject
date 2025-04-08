import { Bot, Brain, Code, Database, Layers, Zap } from "lucide-react"

const features = [
  {
    icon: <Bot className="h-6 w-6 text-[#e3a857]" />,
    title: "Visual Agent Builder",
    description: "Drag-and-drop interface to build AI agents without coding knowledge.",
  },
  {
    icon: <Database className="h-6 w-6 text-[#e3a857]" />,
    title: "Data Integration",
    description: "Connect your agents to any data source with our simple connectors.",
  },
  {
    icon: <Brain className="h-6 w-6 text-[#e3a857]" />,
    title: "Advanced AI Models",
    description: "Access to state-of-the-art AI models for various use cases.",
  },
  {
    icon: <Zap className="h-6 w-6 text-[#e3a857]" />,
    title: "Instant Deployment",
    description: "Deploy your agents to production with one click.",
  },
  {
    icon: <Code className="h-6 w-6 text-[#e3a857]" />,
    title: "API Access",
    description: "Integrate your agents with any application via our REST API.",
  },
  {
    icon: <Layers className="h-6 w-6 text-[#e3a857]" />,
    title: "Multi-Agent Workflows",
    description: "Create complex workflows with multiple agents working together.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl text-zinc-200">
          Powerful Features for <span className="gradient-text">AI Innovation</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-300">
          Everything you need to build, deploy, and manage intelligent AI agents for your business.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card-hover rounded-xl border border-zinc-800 tech-card p-6 copper-border copper-shine circuit-pattern"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#d08c60]/10">
              {feature.icon}
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#d08c60]">{feature.title}</h3>
            <p className="text-zinc-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

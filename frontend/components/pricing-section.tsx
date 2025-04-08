import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for individuals and small projects",
    features: ["1 AI agent", "100 queries per day", "Basic templates", "Community support", "API access"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Ideal for professionals and growing teams",
    features: [
      "10 AI agents",
      "10,000 queries per day",
      "Advanced templates",
      "Priority support",
      "Custom integrations",
      "Workflow automation",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced needs",
    features: [
      "Unlimited AI agents",
      "Unlimited queries",
      "Custom model training",
      "Dedicated support",
      "SLA guarantees",
      "On-premise deployment",
      "SSO & advanced security",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl text-zinc-200">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-300">
          Choose the plan that fits your needs. All plans include core features.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`card-hover relative rounded-xl border ${
              plan.popular ? "border-[#d08c60] bg-[#d08c60]/10 copper-accent" : "border-zinc-800 nebula-bg"
            } p-6 ${plan.popular ? "copper-glow" : ""} copper-shine`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-6 rounded-full bg-[#d08c60] px-3 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
            )}
            <h3 className="mb-2 text-xl font-semibold text-[#d08c60]">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-zinc-200">{plan.price}</span>
              {plan.period && <span className="text-zinc-400">{plan.period}</span>}
            </div>
            <p className="mb-6 text-zinc-300">{plan.description}</p>

            <ul className="mb-8 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#e3a857]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href={plan.name === "Enterprise" ? "/contact" : "/register"} className="block">
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-[#d08c60] hover:bg-[#c77c3c] button-glow text-white btn-primary"
                    : "border-[#d08c60] text-[#d08c60] hover:text-[#e3a857] hover:border-[#e3a857] hover:bg-[#d08c60]/10 btn-outline"
                }`}
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

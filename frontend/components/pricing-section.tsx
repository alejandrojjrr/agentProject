"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <section id="pricing" className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-zinc-200">
          Simple, Transparent <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#d08c60] to-[#e3a857]">Pricing</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-zinc-300">
          Choose the plan that fits your needs. All plans include core features.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => setSelectedPlan(plan.name)}
            className={`group relative rounded-xl border cursor-pointer ${
              plan.popular 
                ? "border-[#d08c60] bg-[#d08c60]/10" 
                : "border-zinc-800/50 bg-[#030303]/50"
            } p-6 transition-all duration-300 hover:shadow-lg ${
              plan.popular 
                ? "hover:shadow-[#d08c60]/20" 
                : "hover:shadow-[#d08c60]/10"
            } ${
              selectedPlan === plan.name ? "ring-2 ring-[#d08c60] ring-offset-2 ring-offset-[#030303]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#d08c60] to-[#e3a857] px-3 py-1 text-xs font-medium text-white shadow-lg shadow-[#d08c60]/20">
                Most Popular
              </div>
            )}
            <div className="relative z-10">
              <h3 className="mb-2 text-xl font-semibold text-[#d08c60] transition-colors duration-300 group-hover:text-[#e3a857]">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-zinc-200">{plan.price}</span>
                {plan.period && <span className="text-zinc-400">{plan.period}</span>}
              </div>
              <p className="mb-6 text-zinc-300 transition-colors duration-300 group-hover:text-zinc-200">{plan.description}</p>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-[#e3a857]" />
                    <span className="text-zinc-300 transition-colors duration-300 group-hover:text-zinc-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.name === "Enterprise" ? "/contact" : "/register"} className="block">
                <Button
                  variant={plan.popular ? "copper" : "copper-outline"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
              plan.popular 
                ? "from-[#d08c60]/10 to-transparent" 
                : "from-[#d08c60]/5 to-transparent"
            } opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>
          </div>
        ))}
      </div>
    </section>
  )
}

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-[rgb(171,89,50)] text-white hover:bg-[rgb(255,200,180)] hover:text-[rgb(40,20,10)] shadow-lg shadow-[rgb(171,89,50)]/20 hover:shadow-[rgb(171,89,50)]/30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20",
        outline:
          "border-2 border-input bg-background hover:bg-accent/5 hover:text-accent-foreground shadow-lg hover:shadow-accent/20 backdrop-blur-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg shadow-secondary/20",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        copper: "bg-[rgb(171,89,50)] text-white hover:bg-[rgb(255,200,180)] hover:text-[rgb(40,20,10)] shadow-lg shadow-[rgb(171,89,50)]/20 hover:shadow-[rgb(171,89,50)]/30",
        "copper-outline": "border-2 border-[rgb(171,89,50)] text-[rgb(171,89,50)] hover:bg-[rgb(255,200,180)] hover:text-[rgb(40,20,10)] hover:border-[rgb(255,200,180)] shadow-lg hover:shadow-[rgb(171,89,50)]/20 backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

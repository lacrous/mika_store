import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--nv-gold)] text-[#050505] hover:bg-[var(--nv-gold-bright)]",
        secondary:
          "border-transparent bg-[var(--nv-bg-surface)] text-[var(--nv-text-secondary)] hover:bg-[var(--nv-bg-elevated)]",
        destructive:
          "border-transparent bg-red-500/15 text-red-400 hover:bg-red-500/25",
        outline:
          "border-[var(--nv-border)] text-[var(--nv-text-secondary)] hover:border-[var(--nv-border-gold)] hover:text-[var(--nv-gold)]",
        gold: "border-[var(--nv-border-gold)] bg-[var(--nv-gold-glow)] text-[var(--nv-gold)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

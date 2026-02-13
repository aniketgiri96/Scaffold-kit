import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary/20 text-primary shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:bg-primary/30",
                secondary:
                    "border-transparent bg-secondary/40 text-secondary-foreground backdrop-blur-md hover:bg-secondary/60",
                destructive:
                    "border-transparent bg-destructive/20 text-destructive shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:bg-destructive/30",
                outline: "text-foreground border-white/20 backdrop-blur-sm hover:border-primary/50 hover:text-primary",
                neon: "bg-black/50 text-primary border-primary/50 shadow-[0_0_15px_var(--glow-primary)] hover:shadow-[0_0_25px_var(--glow-primary)]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }

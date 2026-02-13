import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-white/5 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]",
                className
            )}
            {...props}
        />
    )
}

export { Skeleton }

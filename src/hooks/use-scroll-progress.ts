"use client"

import { useEffect, useState } from "react"

/**
 * Returns scroll progress as 0–1 (0 = top, 1 = bottom).
 * Tracks window scroll; safe for SSR (returns 0 until mounted).
 */
export function useScrollProgress(): number {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let rafId: number

        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const maxScroll = scrollHeight - clientHeight
            const value = maxScroll <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / maxScroll))
            setProgress(value)
        }

        const onScroll = () => {
            rafId = requestAnimationFrame(update)
        }

        update()
        window.addEventListener("scroll", onScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", onScroll)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return progress
}

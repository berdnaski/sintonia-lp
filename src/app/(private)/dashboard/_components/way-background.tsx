"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function WavyBackground({
  className,
  colors = ["rgba(219, 179, 255, 0.3)", "rgba(255, 179, 217, 0.3)"],
  waveWidth = 50,
  backgroundFill = "transparent",
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}: {
  className?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  [key: string]: any
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    contextRef.current = context

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrameId: number
    let time = 0

    const speedFactor = speed === "fast" ? 1 : 0.5

    const render = () => {
      if (!contextRef.current) return
      time += speedFactor

      const { width, height } = canvas
      contextRef.current.clearRect(0, 0, width, height)
      contextRef.current.fillStyle = backgroundFill
      contextRef.current.fillRect(0, 0, width, height)

      const waveCount = Math.ceil(width / waveWidth) + 2

      colors.forEach((color, colorIndex) => {
        const waveHeight = height * 0.15
        const yOffset = height * 0.5 + colorIndex * waveHeight * 0.2

        contextRef.current!.fillStyle = color
        contextRef.current!.globalAlpha = waveOpacity
        contextRef.current!.beginPath()
        contextRef.current!.moveTo(0, height)

        for (let i = 0; i < waveCount; i++) {
          const x = i * waveWidth
          const y = yOffset + Math.sin(time * 0.1 + i * 0.5) * waveHeight
          contextRef.current!.lineTo(x, y)
        }

        contextRef.current!.lineTo(width, height)
        contextRef.current!.fill()
        contextRef.current!.closePath()
      })

      contextRef.current!.filter = `blur(${blur}px)`

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [backgroundFill, blur, colors, speed, waveOpacity, waveWidth])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 z-0", className)} {...props} />
}

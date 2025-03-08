import { cn } from "@/lib/utils"

interface DecorativeGridProps {
  className?: string
  variant?: "pink" | "light" | "dark"
  size?: "sm" | "md" | "lg"
  position?: "left" | "right" | "center"
}

export function DecorativeGrid({ className, variant = "pink", size = "md", position = "right" }: DecorativeGridProps) {
  const variantStyles = {
    pink: "border-[#FF006F]/30",
    light: "border-gray-200",
    dark: "border-gray-700/20",
  }

  const sizeStyles = {
    sm: "w-16 h-16 md:w-24 md:h-24",
    md: "w-24 h-24 md:w-32 md:h-32",
    lg: "w-32 h-32 md:w-48 md:h-48",
  }

  const positionStyles = {
    left: "-left-6 md:-left-12",
    right: "-right-6 md:-right-12",
    center: "mx-auto",
  }

  return (
    <div
      className={cn(
        "relative",
        position === "center" ? "flex justify-center" : "absolute",
        positionStyles[position],
        className,
      )}
    >
      <div className={cn("grid grid-cols-3 grid-rows-3", sizeStyles[size], "opacity-60 rotate-12")}>
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "border-[0.5px]",
              variantStyles[variant],
              i % 3 === 2 ? "border-r" : "",
              i < 3 ? "border-t" : "",
              i % 3 === 0 ? "border-l" : "",
              i > 5 ? "border-b" : "",
            )}
          ></div>
        ))}
      </div>
    </div>
  )
}

export function DecorativeDots({
  className,
  variant = "pink",
  rows = 3,
  cols = 3,
}: {
  className?: string
  variant?: "pink" | "light" | "dark"
  rows?: number
  cols?: number
}) {
  const variantStyles = {
    pink: "bg-[#FF006F]/30",
    light: "bg-gray-200",
    dark: "bg-gray-700/20",
  }

  return (
    <div className={cn("grid gap-2", `grid-cols-${cols} grid-rows-${rows}`, className)}>
      {[...Array(rows * cols)].map((_, i) => (
        <div key={i} className={cn("w-1.5 h-1.5 rounded-full", variantStyles[variant])}></div>
      ))}
    </div>
  )
}

export function WavyLine({
  className,
  variant = "pink",
}: {
  className?: string
  variant?: "pink" | "light" | "dark"
}) {
  const variantStyles = {
    pink: "stroke-[#FF006F]/30",
    light: "stroke-gray-200",
    dark: "stroke-gray-700/20",
  }

  return (
    <div className={cn("w-full h-12 overflow-hidden", className)}>
      <svg viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M0 30C200 30 200 55 400 55C600 55 600 5 800 5C1000 5 1000 30 1200 30"
          className={cn("stroke-2 fill-none", variantStyles[variant])}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}


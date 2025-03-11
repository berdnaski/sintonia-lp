import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideProps } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string,
  icon?:  React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon: Icon, ...props}, ref) => {
    return (
      <div>
        <div className="relative">
          { Icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icon size={16} className="text-gray-400" />
            </div>
          )}
          <input
            type={type}
            className={cn(
              "border-input file:text-foreground placeholder:text-gray-300 selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className
            )}
            ref={ref}
            {...props}
          />

        </div>

        {error && (
          <div className="mt-2">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }

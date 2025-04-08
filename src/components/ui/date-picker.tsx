"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ptBR } from "date-fns/locale"
import { DayPicker, PropsBase } from "react-day-picker"

export type DatePickerProps = Omit<PropsBase, 'mode' | 'required'> & {
  value?: Date
  label?: string,
  onSelect?: () => void
  error?: string
}

export function DatePicker({
  value,
  label,
  onSelect,
  error,
  ...props
}: DatePickerProps) {
  const now = new Date()

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {value ? format(value, "PPP", {
              locale: ptBR
            }) : <span>{label ?? 'Selecione uma data'}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex min-w-[300px] flex-col space-y-2 p-2 bg-white"
        >
          <div className="rounded-md w-full">
            <Calendar
              mode="single"
              selected={value ?? now}
              onSelect={onSelect}
              defaultMonth={value ?? now}
              startMonth={new Date(now.getFullYear() - 80)}
              {...props}
            />
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <div className="mt-2">
          <p className="text-sm font-medium text-red-500">{error}</p>
        </div>
      )}
    </>
  )
}

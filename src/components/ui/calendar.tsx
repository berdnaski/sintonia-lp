"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"

interface DropDownChildren {
  props: {
    value: string,
    children: string,
  }
  disabled: boolean
}

function Dropdown(props: DropdownProps & {
  children: DropDownChildren[]
}) {
  const { options, value, onChange } = props;

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue
        }
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <Select value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="justify-center pr-1">
        <SelectValue placeholder="Selecione o ano" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      mode="single"
      locale={ptBR}
      captionLayout="dropdown"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        month: "flex flex-col gap-4",
        dropdowns: "flex gap-1 items-center justify-center",
        caption_dropdowns: "flex gap-1 items-center",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium capitalize hidden",
        nav: "relative gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex"
        ),
        button_previous: "absolute left-0 mt-2",
        button_next: "absolute right-0 mt-2",
        month_grid: "w-full border-collapse space-x-1 flex justify-center items-center flex-col",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] capitalize mr-1",
        week: "flex w-full mt-2",
        day: cn(
          "relative rounded-md p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary [&:has([aria-selected].day-range-end)]:rounded-r-md mr-1",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        selected:
          "bg-primary rounded-md text-primary-foreground focus:bg-primary focus:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          console.log(props)
          if (props.orientation === "left") {
            return <ChevronLeft color={props.disabled ? "#fff1f2" : "#4a5565"} className={cn("size-4", className)} {...props} />
          }
          return <ChevronRight color={props.disabled ? "#fff1f2" : "#4a5565"} className={cn("size-4", className)} {...props} />
        },
        Dropdown
      }}
      {...props}
    />
  )
}

export { Calendar }

"use client"

import { useFormContext } from "react-hook-form"
import {
  FormField,
  FormItem,
} from "@/components/ui/form"
import { DatePicker as BaseDatePicker, DatePickerProps as BaseProps } from "../date-picker"
import { Label } from "../label"

type DatePickerProps = BaseProps & {
  name: string
  label?: string
}

export function DatePicker({ name, label, ...props }: DatePickerProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem className="flex flex-col">
            <Label htmlFor={name}>{label ?? "Selecione uma data"}</Label>
            <BaseDatePicker
              onSelect={field.onChange}
              value={field.value}
              error={error?.message}
              {...props}
            />

          </FormItem>
        )
      } }
    />
  )
}

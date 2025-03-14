import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from ".";
import { RadioGroup, RadioGroupItem, RadioGroupProps } from "../radio-group";
import { cn } from "@/lib/utils";

interface Option {
  value: string
  label: string
}

interface SelectProps extends RadioGroupProps {
  name: string
  options: Option[]
  label?: React.ReactNode
  isSrOnly?: boolean
  itemClassName?: string
}

const Radio = (
  ({ name, label, itemClassName, options, isSrOnly = false, ...props }: SelectProps) => {
    const { control } = useFormContext()
    
    return  (
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            {label && (
              <FormLabel>{label}</FormLabel>
            )}

            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
              {...props}
            >
              {options.map(option => (
                <FormItem className={cn("flex items-center space-x-3 space-y-0", itemClassName)}>
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      className={cn({
                        "p-0 sr-only": isSrOnly
                      })}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormItem>
        )}
      />
  )
})

export { Radio }
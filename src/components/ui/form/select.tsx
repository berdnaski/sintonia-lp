import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from ".";
import { Select as BaseSelect, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { SelectProps as BaseProps } from "@radix-ui/react-select";

interface Option {
  value: string
  label: string
}

interface SelectProps extends BaseProps {
  name: string
  label?: React.ReactNode
  trigger: string
  options: Option[]
}

const Select = (
  ({ name, label, trigger, options, ...props }: SelectProps) => {
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

              <BaseSelect
                {...props}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder={trigger} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(option => <SelectItem key={`select-option-${option.value}`} value={option.value}>{option.label}</SelectItem> )}
                </SelectContent>
              </BaseSelect>


              {error?.message && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-500">{error?.message}</p>
                </div>
              )}
          </FormItem>
        )}
      />
  )
})

export { Select }
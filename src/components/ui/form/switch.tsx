import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from ".";
import { Switch as BaseSwitch, SwitchProps as BaseProps } from "../switch";

interface SwitchProps extends BaseProps {
  name: string
  label?: React.ReactNode
}

const Switch = (
  ({ className, name, type, label, error, ...props }: SwitchProps) => {
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

            <BaseSwitch
              {...props}
              checked={field.value}
              onCheckedChange={field.onChange}
              error={error?.message}
            />
          </FormItem>
        )}
      />
  )
})

export { Switch }
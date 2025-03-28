import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from ".";
import { InputProps as BaseProps, Input as BaseInput } from "../input";
import { LucideProps } from "lucide-react";


interface InputProps extends BaseProps {
  label?: React.ReactNode
  icon?:  React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  children?: React.ReactNode
}

const Input = (
  ({ name, type, label, error, icon, children, ...props }: InputProps) => {
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

            <BaseInput
              id={name}
              error={error?.message}
              icon={icon}
              {...props}
              {...field}
            >
              {children}
            </BaseInput>
          </FormItem>
        )}
      />
  )
})

export { Input }

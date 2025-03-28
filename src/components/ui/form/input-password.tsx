import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { InputProps as BaseProps, Input } from "../input";
import { createElement, useState } from "react";

interface PasswordFieldProps extends  BaseProps {
  name?: string;
  placeholder?: string;
  description?: string;
};

export function InputPassword({
  name = "password",
  placeholder = "Digite sua senha",
  ...props
}: PasswordFieldProps) {
  const { control } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const Icon = passwordVisibility ? EyeOffIcon : EyeIcon
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
                error={error?.message}
                {...props}
              >
                <button
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors cursor-pointer"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                  type="button"
                >
                  <Icon size={16} className="text-gray-400 group-focus-within:text-pink-400" />
                </button>
              </Input>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

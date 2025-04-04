import { ActivityHistory } from "@/components/profile/activity-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/form/input";
import { InputPassword } from "@/components/ui/form/input-password";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { userMessages, userRepository } from "@/repositories/user-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { LockKeyhole, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const personalInformationSchema = z.object({
  name: z.string().min(3, {
    message: "Nome precisa ter pelo menos 3 letras"
  }).max(20, {
    message: "O nome deve ter no máximo 20 caracteres"
  }),
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres"
  }).or(z.literal('')),
  confirmPassword: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})

export function PersonalInformation() {
  const { toastError } = useResponseMessages();
  const { user, setUser } = useAuth();

  const form = useForm<z.infer<typeof personalInformationSchema>>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      name: user.name,
      password: "",
      confirmPassword: ""
    }
  });

  const handleUpdate = form.handleSubmit(async (data) => {
    try {
      const userUpdated = await userRepository.update(
        user.id,
        {
          name: data.name,
          password: data.password
        }
      );

      setUser(userUpdated)

      toast.success(userMessages.success.updated);
    } catch (error) {
      toastError(error, userMessages);
    }
  });

  return (
    <Form {...form}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleUpdate}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input name="name" placeholder="Seu nome completo" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Senha
              </Label>
              <InputPassword
                name="password"
                icon={LockKeyhole}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Senha
              </Label>
              <InputPassword
                name="confirmPassword"
                icon={LockKeyhole}
              />
            </div>

            <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white">
              <Save className="mr-2 h-4 w-4" />
              Salvar alterações
            </Button>
          </form>
        </Card>
      </motion.div>
    </Form>
  )
}

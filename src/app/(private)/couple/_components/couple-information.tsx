'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/form/date-picker";
import { Form } from "@/components/ui/form";
import { useCouple } from "@/hooks/use-couple";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { coupleMessages, coupleRepository, UpdateCoupleRequest, updateSchema } from "@/repositories/couple-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function CoupleInformation() {
  const { toastError } = useResponseMessages();
  const { couple, setCouple } = useCouple();

  const form = useForm<UpdateCoupleRequest>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      startAt: couple.startAt
    }
  });

  const handleUpdate = form.handleSubmit(async (data) => {
    try {
      const updated = await coupleRepository.update(
        data
      );

      setCouple(updated)

      toast.success(coupleMessages.success.updated);
    } catch (error) {
      toastError(error, coupleMessages);
    }
  });

  if (!couple) {
    return null
  }

  return (
    <Form {...form}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="p-6">
          <form className="space-y-6" onSubmit={handleUpdate}>
            <div className="space-y-2">
              <DatePicker
                name="startAt"
                label="Inicio do relacionamento"
                endMonth={new Date()}
              />
            </div>

            <Button type="submit">
              Salvar alterações
            </Button>
          </form>
        </Card>
      </motion.div>
    </Form>
  )
}

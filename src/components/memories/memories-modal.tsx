import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  memoriesMessages,
  memoriesRepository,
  type MemoriesRequest,
} from "@/repositories/memories-repository";
import { useAuth } from "@/hooks/use-auth";
import toast from "react-hot-toast";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { useCouple } from "@/hooks/use-couple";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memoriesSchema } from "@/repositories/memories-repository";

export function MemoriesModal({
  isOpen,
  onClose,
  onCreateMemory,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreateMemory: (memory: MemoriesRequest) => void;
}) {
  const { toastError } = useResponseMessages();
  const { user } = useAuth();
  const { couple } = useCouple();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MemoriesRequest>({
    resolver: zodResolver(memoriesSchema),
    defaultValues: {
      title: '',
      description: '',
    }
  });

  const handleCreateMemory = useCallback(async (data: MemoriesRequest) => {
    if (!user || !couple) {
      toast.error("Usuário ou casal não encontrado");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("createdByUserId", user.id);
      formData.append("coupleId", couple.id);

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const newMemory = await memoriesRepository.createMemory(formData);
      toast.success("Memória criada com sucesso!");
      onCreateMemory(newMemory);
      reset();
      setSelectedFile(null);
      onClose();
    } catch (error) {
      toastError(error, memoriesMessages);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, couple, selectedFile, onCreateMemory, onClose, reset, toastError]); // Changed dependency array

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova memória</DialogTitle>
          <DialogDescription>
            Adicione uma nova memória ao seu álbum
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateMemory)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input {...register("title")} />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title.message}</span>
              )}
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea {...register("description")} />
              {errors.description && (
                <span className="text-red-500 text-sm">{errors.description.message}</span>
              )}
            </div>

            <div>
              <Label htmlFor="avatar">Insira Fotos</Label>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleFileChange(e);
                      field.onChange(e.target.files?.[0] || null);
                    }}
                  />
                )}
              />
              {errors.avatar && (
                <span className="text-red-500 text-sm">{errors.avatar.message}</span>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

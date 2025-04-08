"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { memoriesMessages, memoriesRepository, type MemoriesRequest } from "@/repositories/memories-repository"
import { useAuth } from "@/hooks/use-auth"
import toast from "react-hot-toast"
import { useResponseMessages } from "@/hooks/use-response-messages"
import { useCouple } from "@/hooks/use-couple"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { memoriesSchema } from "@/repositories/memories-repository"
import { Camera, Heart, X } from "lucide-react"

export function MemoriesModal({
  isOpen,
  onClose,
  onCreateMemory,
}: {
  isOpen: boolean
  onClose: () => void
  onCreateMemory: (memory: MemoriesRequest) => void
}) {
  const { toastError } = useResponseMessages()
  const { user } = useAuth()
  const { couple } = useCouple()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MemoriesRequest>({
    resolver: zodResolver(memoriesSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const handleCreateMemory = useCallback(
    async (data: MemoriesRequest) => {
      if (!user || !couple) {
        toast.error("Usuário ou casal não encontrado")
        return
      }

      setIsSubmitting(true)

      try {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("createdByUserId", user.id)
        formData.append("coupleId", couple.id)

        if (selectedFile) {
          formData.append("avatar", selectedFile)
        }

        const newMemory = await memoriesRepository.createMemory(formData)
        toast.success("Memória criada com sucesso!")
        onCreateMemory(newMemory)
        handleResetForm()
        onClose()
      } catch (error) {
        toastError(error, memoriesMessages)
      } finally {
        setIsSubmitting(false)
      }
    },
    [user, couple, selectedFile, onCreateMemory, onClose, reset, toastError],
  )

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setSelectedFile(file)
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }, [])

  const handleResetForm = useCallback(() => {
    reset()
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }, [reset, previewUrl])

  const handleRemoveImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
  }, [previewUrl])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleResetForm()
          onClose()
        }
      }}
    >
      <DialogContent className="bg-gradient-to-br from-white to-pink-50 sm:max-w-md p-0 overflow-hidden rounded-xl shadow-lg border border-pink-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-pink-500"></div>

        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
              Nova Memória
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-500">
            Eternize momentos especiais do seu relacionamento
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateMemory)} className="px-6 pb-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 font-medium">
                Título
              </Label>
              <Input
                {...register("title")}
                className="border-pink-100 focus:border-pink-300 focus:ring-pink-200 rounded-lg shadow-sm"
                placeholder="Ex: Nosso primeiro encontro"
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 font-medium">
                Descrição
              </Label>
              <Textarea
                {...register("description")}
                className="border-pink-100 focus:border-pink-300 focus:ring-pink-200 rounded-lg shadow-sm h-24 resize-none"
                placeholder="Descreva esse momento especial..."
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar" className="text-gray-700 font-medium">
                Foto da memória
              </Label>

              {!previewUrl ? (
                <div className="mt-2">
                  <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-pink-200 rounded-lg cursor-pointer bg-pink-50/50 hover:bg-pink-100/50 transition-all duration-300 group"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                              <Camera className="w-8 h-8 text-pink-500" />
                            </div>
                            <p className="text-sm text-pink-600 font-medium">
                              <span className="font-bold">Clique para adicionar</span> ou arraste uma foto
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG ou JPEG</p>
                          </div>
                          <Input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              handleFileChange(e)
                              field.onChange(e.target.files?.[0] || null)
                            }}
                          />
                        </label>
                      </div>
                    )}
                  />
                </div>
              ) : (
                <div className="relative mt-2 rounded-lg overflow-hidden border border-pink-200 shadow-sm group">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-52 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-pink-50 transition-colors duration-200 cursor-pointer"
                  >
                    <X className="w-5 h-5 text-pink-600 cursor-pointer" />
                  </button>
                </div>
              )}

              {errors.avatar && <span className="text-red-500 text-sm">{errors.avatar.message}</span>}
            </div>
          </div>

          <DialogFooter className="mt-8 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-pink-200 text-pink-600 hover:bg-pink-50 rounded-full px-5 transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Salvando...
                </div>
              ) : (
                "Salvar memória"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


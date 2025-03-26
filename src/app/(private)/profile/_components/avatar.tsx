import { useAuth } from "@/hooks/use-auth";
import { userRepository } from "@/repositories/user-repository";
import { Avatar as AvatarComponent, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Avatar({ user }: { user: { id: string; name: string; avatarUrl?: string } }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setUser } = useAuth();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { key } = await userRepository.uploadAvatar(file);
      const updatedUser = await userRepository.update(user.id, {
        avatarUrl: key
      });

      setUser(updatedUser);
      toast.success('Avatar atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating avatar:', error);
      toast.error('Erro ao atualizar avatar');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative cursor-pointer"
      onClick={handleAvatarClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <AvatarComponent className="w-32 h-32 border-4 border-white shadow-lg">
        <AvatarImage
          src={user.avatarUrl ? `${user.avatarUrl}` : "/placeholder.svg?height=128&width=128"}
          className="object-cover w-full h-full"
          alt="Profile"
        />
        <AvatarFallback className="bg-[#FF006F] text-white text-2xl">
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </AvatarComponent>
      <div className="absolute -bottom-2 -right-2 bg-[#FF006F] text-white rounded-full p-2 shadow-md">
        <Zap size={20} />
      </div>
    </motion.div>
  );
}

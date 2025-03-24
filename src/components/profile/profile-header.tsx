import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  user: {
    name: string;
    stripeSubscriptionStatus?: string;
  };
  relationshipDuration: string;
  connectionScore: number;
}

function ProfileAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
        <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
        <AvatarFallback className="bg-[#FF006F] text-white text-2xl">
          {/* Use first letters of the name */}
          MC
        </AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-2 -right-2 bg-[#FF006F] text-white rounded-full p-2 shadow-md">
        <Zap size={20} />
      </div>
    </motion.div>
  );
}

function ProfileInfo({ user, relationshipDuration }: { user: { name: string; stripeSubscriptionStatus?: string }; relationshipDuration: string }) {
  return (
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-3xl font-bold text-[#302d2d]">{user.name}</h1>
      <p className="text-[#353434] mt-1">
        Buscando melhorar a comunicação no meu relacionamento
      </p>
      <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
        <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">
          {relationshipDuration}
        </Badge>
        <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">
          {user.stripeSubscriptionStatus === "active" ? "Plano Premium" : "Plano Inativo"}
        </Badge>
        <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">
          Comunicadora
        </Badge>
      </div>
    </div>
  );
}

function ConnectionScore({ score }: { score: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#F1DDE6" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#FF006F"
            strokeWidth="10"
            strokeDasharray={`${(2 * Math.PI * 45 * score) / 100} ${
              (2 * Math.PI * 45 * (100 - score)) / 100
            }`}
            strokeDashoffset={2 * Math.PI * 45 * 0.25}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold text-[#FF006F]">{score}</span>
          <span className="text-xs text-[#353434]">Sintonia</span>
        </div>
      </div>
      <p className="text-sm text-[#353434] mt-2">Nível de conexão</p>
    </motion.div>
  );
}

export function ProfileHeader({ user, relationshipDuration, connectionScore }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <ProfileAvatar />
      <ProfileInfo user={user} relationshipDuration={relationshipDuration} />
      <ConnectionScore score={connectionScore} />
    </div>
  );
}
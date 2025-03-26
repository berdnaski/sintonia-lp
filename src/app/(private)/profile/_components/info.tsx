import { Badge } from "@/components/ui/badge";

export default function Info({ user, relationshipDuration }: { user: { name: string; stripeSubscriptionStatus?: string }; relationshipDuration: string }) {
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

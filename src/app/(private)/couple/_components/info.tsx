import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useCouple } from "@/hooks/use-couple";

export default function Info() {
  const { name, durationFormatted } = useCouple();

  const coupleDurationFormatted = durationFormatted()

  return (
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-3xl font-bold text-[#302d2d]">{name}</h1>
      <p className="text-[#353434] mt-1">
        Buscando melhorar a comunicação no meu relacionamento
      </p>
      <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
        <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">
          {coupleDurationFormatted ? coupleDurationFormatted : "Relacionamento não iniciado"}
        </Badge>
        <Badge className="bg-[#FF006F]/10 text-[#FF006F] hover:bg-[#FF006F]/20">
          Comunicadora
        </Badge>
      </div>
    </div>
  );
}

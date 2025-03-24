import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Award } from "lucide-react";

interface SubscriptionDetailsProps {
  user: {
    stripeSubscriptionStatus?: string;
  };
  onManage: () => void;
}

function SubscriptionDetails({ user, onManage }: SubscriptionDetailsProps) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-[#FF006F] to-[#B42A76] text-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">Plano Premium</h3>
          <p className="text-white/80 text-sm mt-1">Renovação em 15 de Abril, 2025</p>
        </div>
        <Badge className="bg-white text-[#FF006F]">
          {user.stripeSubscriptionStatus === "active" ? "Ativo" : "Inativo"}
        </Badge>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Award size={12} className="text-white" />
          </div>
          <span className="text-sm">Análises avançadas de comunicação</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Award size={12} className="text-white" />
          </div>
          <span className="text-sm">Exercícios exclusivos de conexão</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Award size={12} className="text-white" />
          </div>
          <span className="text-sm">Suporte prioritário</span>
        </div>
      </div>

      <Button
        onClick={onManage}
        className="mt-6 hover:cursor-pointer bg-white text-[#FF006F] hover:bg-white/90"
      >
        Gerenciar Assinatura
      </Button>
    </div>
  );
}

interface SubscriptionCardProps {
  user: {
    stripeSubscriptionStatus?: string;
  };
  onManageSubscription: () => void;
}

export function SubscriptionCard({ user, onManageSubscription }: SubscriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plano e Assinatura</CardTitle>
        <CardDescription>Gerencie seu plano atual e veja os benefícios</CardDescription>
      </CardHeader>
      <CardContent>
        <SubscriptionDetails user={user} onManage={onManageSubscription} />
      </CardContent>
    </Card>
  );
}
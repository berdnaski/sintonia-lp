import { Progress } from "@/components/ui/progress";
import { useCouple } from "@/hooks/use-couple";

interface MetricItemProps {
  label: string;
  value: number;
}

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-[#FF006F] font-bold">{value}%</span>
      </div>
      <Progress value={value} className="h-2 bg-[#F1DDE6] [&>div]:bg-[#FF006F]" />
    </div>
  );
}

export function CoupleMetrics() {
  const { couple, metrics } = useCouple();
  const items = [
    {
      label: "Comunicação",
      value: metrics?.communication
    },
    {
      label: "Intensidade",
      value: metrics?.intensity
    },
    {
      label: "Conexão",
      value: metrics?.connection
    },
    {
      label: "Sintonia",
      value: metrics?.synchrony
    }
  ];

  if (!couple || !metrics) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map(({ label, value}) => (
        <MetricItem label={label} value={value} key={`${label}-${value}`} />
      ))}
    </div>
  );
}

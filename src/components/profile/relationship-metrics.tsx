import { Progress } from "@/components/ui/progress";

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

export function RelationshipMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricItem label="Comunicação" value={82} />
      <MetricItem label="Intimidade" value={68} />
      <MetricItem label="Resolução de Conflitos" value={75} />
    </div>
  );
}
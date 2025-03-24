import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, MessageCircle, Zap, ChevronRight, Calendar } from "lucide-react";

interface Activity {
  text: string;
  type: "Atividade" | "Diálogo" | "Insight";
  date: string;
}

interface ActivityListProps {
  activities: Activity[];
}

function ActivityList({ activities }: ActivityListProps) {
  return (
    <ul className="space-y-4">
      {activities.map((activity, index) => (
        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-[#FF006F]/10 flex items-center justify-center flex-shrink-0">
            {activity.type === "Atividade" ? (
              <Zap size={16} className="text-[#FF006F]" />
            ) : activity.type === "Diálogo" ? (
              <MessageCircle size={16} className="text-[#FF006F]" />
            ) : (
              <Award size={16} className="text-[#FF006F]" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.text}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs py-0 h-5">
                {activity.type}
              </Badge>
              <span className="text-xs text-gray-500">{activity.date}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <ChevronRight size={16} />
          </Button>
        </li>
      ))}
    </ul>
  );
}

interface NextStepsProps {
  activities: Activity[];
}

export function NextSteps({ activities }: NextStepsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#302d2d] flex items-center gap-2">
          <Calendar className="text-[#FF006F]" size={20} />
          Próximos Passos
        </CardTitle>
        <CardDescription>Atividades recomendadas para melhorar a sintonia</CardDescription>
      </CardHeader>
      <CardContent>
        <ActivityList activities={activities} />
      </CardContent>
    </Card>
  );
}
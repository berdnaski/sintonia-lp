// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// interface Activity {
//   title: string;
//   time: string;
//   points: number;
// }

// interface DayActivity {
//   date: string;
//   activities: Activity[];
// }

// export function ActivityHistory() {
//   const activities: DayActivity[] = [
//     {
//       date: "12 de Março, 2025",
//       activities: [
//         {
//           title: "Completou exercício de escuta ativa",
//           time: "19:30",
//           points: 15,
//         },
//         {
//           title: "Respondeu questionário semanal",
//           time: "10:15",
//           points: 10,
//         },
//       ],
//     },
//     {
//       date: "10 de Março, 2025",
//       activities: [
//         {
//           title: "Compartilhou sentimentos usando o modelo sugerido",
//           time: "21:45",
//           points: 20,
//         },
//         {
//           title: "Completou desafio de comunicação não-verbal",
//           time: "18:20",
//           points: 25,
//         },
//       ],
//     },
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-[#302d2d]">Histórico de Atividades</CardTitle>
//         <CardDescription>Acompanhe seu progresso e atividades realizadas</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-8">
//           {activities.map((day, dayIndex) => (
//             <div key={dayIndex}>
//               <h3 className="text-sm font-medium text-gray-500 mb-4">{day.date}</h3>
//               <div className="space-y-3">
//                 {day.activities.map((activity, activityIndex) => (
//                   <div
//                     key={activityIndex}
//                     className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                   >
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">{activity.title}</p>
//                       <p className="text-xs text-gray-500">{activity.time}</p>
//                     </div>
//                     <Badge className="bg-[#FF006F]/10 text-[#FF006F]">
//                       +{activity.points} pontos
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
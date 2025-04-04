import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { questionsRepository } from "@/repositories/questions-repository";
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react";
import { CardSkeleton } from "./skeletons/card-skeleton";

export function PendingQuestions() {
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const questions = await questionsRepository.findAllQuestions(user.id, {
          perPage: 3
        });

        setQuestions(questions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <CardSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row mb-2">
        <h2 className="font-bold text-lg">Perguntas pendentes</h2>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {questions.map(question => (
            <div key={question.id} className="p-2 bg-gray-50 rounded text-sm">"{question.question}"</div>
          ))}
        </div>
        <Button className="w-full">Responder</Button>
      </CardContent>
    </Card>
  )
}

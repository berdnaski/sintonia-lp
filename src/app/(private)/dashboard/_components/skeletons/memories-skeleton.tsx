import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export function MemoriesSkeleton() {
  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center gap-2 mb-4">
        <Skeleton className="h-6 w-24" />
        <ChevronRight className="h-5 w-5 text-gray-200" />
      </CardHeader>
      <CardContent className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="relative min-w-[150px] h-[150px] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <Skeleton className="h-3 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

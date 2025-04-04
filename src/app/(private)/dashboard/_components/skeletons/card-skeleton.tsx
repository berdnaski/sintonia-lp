import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row mb-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-full rounded" />
          ))}
        </div>
        <Skeleton className="h-10 w-full rounded" />
      </CardContent>
    </Card>
  )
}

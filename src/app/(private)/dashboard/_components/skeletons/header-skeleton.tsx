import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  const skeletonItems = Array.from({ length: 4 })

  return (
    <div className="flex justify-between items-center p-4 border-b mt-4 bg-white rounded-md">
      {skeletonItems.map((_, index) => (
        <div key={index} className="flex items-center gap-1">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>
      ))}

      <div className="flex items-center gap-1">
        <div className="relative">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="absolute -top-1 -right-1 w-4 h-4 rounded-full" />
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCouple } from "@/hooks/use-couple";
import { memoriesRepository } from "@/repositories/memories-repository";
import { formatDate } from "@/lib/date-fns";
import { ChevronRight, Delete } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MemoriesSkeleton } from "./skeletons/memories-skeleton";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { MemoriesEmpty } from "./empty/memories-empty";

export default function Memories() {
  const { couple } = useCouple();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasMemories = memories.length > 0;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (couple) {
      const fetchData = async () => {
        setIsLoading(true);

        try {
          const memories = await memoriesRepository.getMemories(couple.id, {
            perPage: 7,
          });

          setMemories(memories.data);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [couple]);

  if (!couple || isLoading) {
    return <MemoriesSkeleton />;
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <Link
          href={Routes.MEMORIES}
          className="flex flex-row items-center gap-2 mb-4 group"
        >
          <h2 className="font-bold text-lg">Memórias</h2>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
        </Link>
      </CardHeader>
      <CardContent
        className={cn("overflow-x-auto pb-4", hasMemories && "flex gap-4")}
      >
        {hasMemories ? (
          memories.map((item) => (
            <div
              key={item.id}
              className="relative min-w-[150px] h-[150px] rounded-lg overflow-hidden"
            >
              {item.avatarUrl && item.avatarUrl.trim() !== '' ? (
                <Image
                  src={item.avatarUrl}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,..." 
                  sizes="150px"
                  quality={75}
                />
              ) : (
                <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Sem imagem
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs font-medium">{item.title}</p>
                {hasMounted && (
                  <p className="text-white text-xs">
                    {formatDate(item.createdAt)}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <MemoriesEmpty />
        )}
      </CardContent>
    </Card>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const PokemonCardSkeleton = () => (
  <Card className="bg-pokemon-card p-4 border-pokemon-shadow/20">
    <div className="text-center space-y-3">
      <div className="aspect-square bg-pokemon-mint/30 rounded-lg p-4">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16 mx-auto" />
        <Skeleton className="h-5 w-20 mx-auto" />
      </div>
    </div>
  </Card>
);

interface PokemonSkeletonGridProps {
  count?: number;
}

const PokemonSkeletonGrid = ({ count = 20 }: PokemonSkeletonGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default PokemonSkeletonGrid;

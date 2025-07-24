import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PokemonGrid from "./PokemonGrid";
import type { Pokemon, PokemonListResponse, ViewMode } from "@/types/pokemon";
import PokemonSkeletonGrid from "./PokemonSkeletonGrid";
import ErrorMessage from "@/components/ErrorMessage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonsWithOffset } from "../api/getPokemonList";

const RenderInfiniteView = ({ viewMode }: { viewMode: ViewMode }) => {
  const infiniteQuery = useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ["pokemons", "infinite"],
    queryFn: ({ pageParam = 0 }) =>
      getPokemonsWithOffset(20, pageParam as number),
    enabled: viewMode === "loadMore",
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return pages.length * 20;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  if (infiniteQuery.isLoading) {
    return <PokemonSkeletonGrid />;
  }

  if (infiniteQuery.isError) {
    return (
      <ErrorMessage
        message="Failed to load Pokémon"
        onRetry={() => infiniteQuery.refetch()}
      />
    );
  }

  const allPokemons: Pokemon[] =
    infiniteQuery.data?.pages.flatMap((page) => page.results) || [];

  return (
    <>
      <PokemonGrid pokemons={allPokemons} />
      {infiniteQuery.hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => infiniteQuery.fetchNextPage()}
            disabled={infiniteQuery.isFetchingNextPage}
            className="bg-pokemon-text text-pokemon-card hover:bg-pokemon-text/90">
            {infiniteQuery.isFetchingNextPage ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Pokémon"
            )}
          </Button>
        </div>
      )}
    </>
  );
};
export default RenderInfiniteView;

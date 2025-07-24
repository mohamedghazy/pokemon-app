import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "./ErrorMessage";
import PaginationControls from "./PaginationControls";
import PokemonGrid from "./PokemonGrid";
import PokemonSkeletonGrid from "./PokemonSkeletonGrid";
import { getPokemonsList } from "../api/getPokemonList";
import type { ViewMode } from "@/types/pokemon";

const RenderPaginationView = ({
  currentPage,
  handlePageChange,
  viewMode,
}: {
  currentPage: number;
  handlePageChange: (page: number) => void;
  viewMode: ViewMode;
}) => {
  const paginationQuery = useQuery({
    queryKey: ["pokemons", "pagination", currentPage],
    queryFn: () => getPokemonsList(currentPage),
    enabled: viewMode === "pagination",
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  if (paginationQuery.isLoading) {
    return <PokemonSkeletonGrid />;
  }

  if (paginationQuery.isError) {
    return (
      <ErrorMessage
        message="Failed to load Pokémon"
        onRetry={() => paginationQuery.refetch()}
      />
    );
  }

  if (!paginationQuery.data?.results) {
    return <ErrorMessage message="No Pokémon found" />;
  }

  return (
    <>
      <PokemonGrid pokemons={paginationQuery.data.results} />
      <PaginationControls
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default RenderPaginationView;

import { useState } from "react";
import type { ViewMode } from "@/types/pokemon";
import ViewToggle from "@/features/PokemonList/components/ViewToggle";
import RenderInfiniteView from "@/features/PokemonList/components/RenderInfinitView";
import RenderPaginationView from "@/features/PokemonList/components/RenderPaginationView";

const PokemonList = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("pagination");
  const [currentPage, setCurrentPage] = useState(1);
  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView);
    if (newView === "pagination") {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-pokemon-mint">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pokemon-text mb-2">
            ⚡ Pokédex
          </h1>
          <p className="text-pokemon-text-light text-lg">
            Discover and explore Pokémon with infinite scroll
          </p>
        </div>

        {/* View Toggle */}
        <ViewToggle currentView={viewMode} onViewChange={handleViewChange} />

        {/* Pokemon Content */}
        {viewMode === "pagination" ? (
          <RenderPaginationView
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            viewMode={viewMode}
          />
        ) : (
          <RenderInfiniteView viewMode={viewMode} />
        )}
      </div>
    </div>
  );
};

export default PokemonList;

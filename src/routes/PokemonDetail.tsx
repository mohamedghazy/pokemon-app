import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TypeBadge from "@/features/PokemonDetail/components/TypeBadge";
import ErrorMessage from "@/components/ErrorMessage";
import { ArrowLeft, Weight, Ruler } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPokemonDetail } from "@/features/PokemonDetail/api/getPokemnon";
import { Badge } from "@/components/ui/badge";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonDetail(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pokemon-mint">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <Card className="bg-pokemon-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="text-center">
                <Skeleton className="w-64 h-64 mx-auto rounded-lg mb-4" />
                <Skeleton className="h-8 w-48 mx-auto mb-2" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="min-h-screen bg-pokemon-mint">
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mb-6 border-pokemon-shadow/40 hover:bg-pokemon-mint/50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <ErrorMessage
            message="Failed to load Pokémon details"
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  const formatPokemonName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formatPokemonId = (id: number) => {
    return `#${id.toString().padStart(3, "0")}`;
  };

  const getTypeGradient = (types: string[]) => {
    if (types.length === 0) return "bg-gradient-pokemon";

    const primaryType = types[0];
    const gradientMap: Record<string, string> = {
      fire: "bg-gradient-fire",
      water: "bg-gradient-water",
      grass: "bg-gradient-grass",
      electric: "bg-gradient-electric",
      psychic: "bg-gradient-psychic",
    };

    return gradientMap[primaryType] || "bg-gradient-pokemon";
  };

  const types = pokemon.types.map((t) => t.type.name);
  const headerGradient = getTypeGradient(types);

  return (
    <div className="min-h-screen bg-pokemon-mint">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6 border-pokemon-shadow/40 hover:bg-pokemon-mint/50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>

        {/* Pokemon Card */}
        <Card className="bg-pokemon-card overflow-hidden shadow-xl py-0">
          {/* Header with gradient */}
          <div className={`${headerGradient} p-8 text-center text-white`}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {formatPokemonName(pokemon.name)}
            </h1>
            <p className="text-xl opacity-90">{formatPokemonId(pokemon.id)}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pokemon Image & Basic Info */}
              <div className="text-center space-y-6">
                <div className="bg-pokemon-mint/30 rounded-full p-8 inline-block">
                  <img
                    src={
                      pokemon.sprites.other?.["official-artwork"]
                        ?.front_default || pokemon.sprites.front_default
                    }
                    alt={pokemon.name}
                    className="w-64 h-64 object-contain"
                  />
                </div>
                {/* Types */}
                <div className="flex justify-center">
                  <div className="flex flex-wrap gap-2">
                    {pokemon.types.map((type) => (
                      <TypeBadge key={type.slot} type={type.type.name} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pokemon-mint/20 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Ruler className="h-5 w-5 text-pokemon-text-light mr-2" />
                      <span className="text-sm text-pokemon-text-light font-medium">
                        Height
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-pokemon-text">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>

                  <div className="bg-pokemon-mint/20 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Weight className="h-5 w-5 text-pokemon-text-light mr-2" />
                      <span className="text-sm text-pokemon-text-light font-medium">
                        Weight
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-pokemon-text">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats & Details */}
              <div className="space-y-6">
                {/* Base Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-pokemon-text mb-4">
                    Base Stats
                  </h3>
                  <div className="space-y-3">
                    {pokemon.stats.map((stat) => {
                      const statName = stat.stat.name
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase());

                      return (
                        <div key={stat.stat.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-pokemon-text">
                              {statName}
                            </span>
                            <span className="text-sm font-bold text-pokemon-text">
                              {stat.base_stat}
                            </span>
                          </div>
                          <Progress
                            value={(stat.base_stat / 255) * 100}
                            className="h-2"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Abilities */}
                <div>
                  <h3 className="text-lg font-semibold text-pokemon-text mb-3">
                    Abilities
                  </h3>
                  <div className="space-y-2">
                    {pokemon.abilities.map((ability) => (
                      <div
                        key={ability.slot}
                        className="flex items-center space-x-2">
                        <Badge className="bg-accent text-black">
                          {ability.ability.name.replace("-", " ")}
                        </Badge>
                        {ability.is_hidden && (
                          <span className="text-xs  px-2 py-1 rounded">
                            (Hidden)
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Base Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-pokemon-text mb-2">
                    Base Experience
                  </h3>
                  <p className="text-2xl font-bold text-pokemon-text">
                    {pokemon.base_experience} XP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PokemonDetail;

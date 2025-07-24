import type { Pokemon } from "@/types/pokemon";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getPokemonId, getPokemonImageUrl } from "../utils/getPokemonAssets";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigate = useNavigate();
  const pokemonId = getPokemonId(pokemon.url);
  const imageUrl = getPokemonImageUrl(pokemonId);

  const handleClick = () => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const formatPokemonName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formatPokemonId = (id: number) => {
    return `#${id.toString().padStart(3, "0")}`;
  };

  return (
    <Card
      className="bg-pokemon-card hover:shadow-lg transition-all duration-300 cursor-pointer group border-pokemon-shadow/20 hover:border-pokemon-shadow/40 p-4 animate-fade-in hover:scale-105"
      onClick={handleClick}>
      <div className="text-center space-y-3">
        <div className="aspect-square bg-pokemon-mint/30 rounded-lg p-4 group-hover:bg-pokemon-mint/50 transition-colors">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-pokemon-text-light font-medium">
            {formatPokemonId(pokemonId)}
          </p>
          <h3 className="font-semibold text-pokemon-text text-lg">
            {formatPokemonName(pokemon.name)}
          </h3>
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;

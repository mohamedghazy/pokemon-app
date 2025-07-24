import { Badge } from "@/components/ui/badge";

interface TypeBadgeProps {
  type: string;
}

const typeColors: Record<string, string> = {
  fire: "bg-fire text-white",
  water: "bg-water text-white",
  grass: "bg-grass text-white",
  electric: "bg-electric text-pokemon-text",
  psychic: "bg-psychic text-white",
  ice: "bg-ice text-pokemon-text",
  dragon: "bg-dragon text-white",
  dark: "bg-dark text-white",
  fairy: "bg-fairy text-pokemon-text",
  normal: "bg-normal text-pokemon-text",
  fighting: "bg-fighting text-white",
  poison: "bg-poison text-white",
  ground: "bg-ground text-white",
  flying: "bg-flying text-pokemon-text",
  bug: "bg-bug text-white",
  rock: "bg-rock text-white",
  ghost: "bg-ghost text-white",
  steel: "bg-steel text-pokemon-text",
};

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const colorClass = typeColors[type] || "bg-muted text-muted-foreground";

  return (
    <Badge className={`${colorClass} capitalize font-medium px-3 py-1`}>
      {type}
    </Badge>
  );
};

export default TypeBadge;

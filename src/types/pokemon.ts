export interface Pokemon {
  id: number;
  name: string;
  url: string;
}
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
export interface PokemonSprite {
  front_default: string;
  front_shiny?: string;
  other?: {
    "official-artwork"?: {
      front_default: string;
    };
  };
}
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprite;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  base_experience: number;
}
export type ViewMode = "pagination" | "loadMore";

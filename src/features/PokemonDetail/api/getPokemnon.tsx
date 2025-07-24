import type { PokemonDetail } from "@/types/pokemon";

export const getPokemonDetail = async (
  idOrName: string | number
): Promise<PokemonDetail> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${idOrName}`);
  }

  return response.json();
};

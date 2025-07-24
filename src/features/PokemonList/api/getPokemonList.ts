import type { PokemonListResponse } from "@/types/pokemon";

export const getPokemonsList = async (
  page: number = 1
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
  );
  return response.json();
};
export const getPokemonsWithOffset = async (
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  return response.json();
};
export const TOTAL_POKEMON = 1010;
export const POKEMON_PER_PAGE_CONSTANT = 20;

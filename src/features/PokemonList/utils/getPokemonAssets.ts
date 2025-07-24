export const getPokemonId = (url: string): number => {
  const urlParts = url.split("/");
  return parseInt(urlParts[urlParts.length - 2]);
};
export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

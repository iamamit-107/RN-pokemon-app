export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  stats?: any;
  sprites?: any;
}

export const getPokemons = async (limit = 15): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();
  return data.results.map((item: Pokemon, index: number) => ({
    ...item,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
};

export const getPokemonDetails = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
};

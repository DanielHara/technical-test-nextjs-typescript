import Pokemons from '../pages/api/data/pokemon.json';
import type { Pokemon } from '../interfaces/pokemon';

const id2PokemonMap: Record<number, Pokemon> = {};

Pokemons.forEach(pokemon => {
  id2PokemonMap[pokemon.id] = pokemon;
});

const ListLength = Pokemons.length;

export { ListLength };

export default id2PokemonMap;

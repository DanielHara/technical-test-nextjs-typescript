import { useState } from 'react';
import { calculatePower } from '../utils';

import type { Pokemon } from '../../interfaces/pokemon';
import PokemonTable from './PokemonTable';

const Main = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [powerThreshold, setPowerThreshold] = useState(0);

  const filteredPokemons = pokemons
    .filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(pokemon => calculatePower(pokemon) > powerThreshold);

  const powers = filteredPokemons.map(pokemon => calculatePower(pokemon));
  const max = powers.length > 0 ? Math.max(...powers) : '-';
  const min = powers.length > 0 ? Math.min(...powers) : '-';
  
  return <section>
    <h1>Pokemon List</h1>
    <label htmlFor="search">Search</label>
    <input id="search" type="text" value={searchTerm} onChange={({ target }) => setSearchTerm(target.value) }/>

    <label htmlFor="power_threshold">Power threshold</label>
    <input id="power_threshold" type="number" value={powerThreshold || ''} onChange={({ target }) => setPowerThreshold(Number(target.value)) }></input>

    <span>{`Count over threshold: ${filteredPokemons.length}`}</span>
    <span>{`Min: ${min}`}</span>
    <span>{`Max: ${max}`}</span>

    <PokemonTable pokemons={filteredPokemons}/>
  </section>;
};

export default Main;

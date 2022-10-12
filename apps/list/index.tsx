import { useState } from 'react';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { calculatePower } from '../utils';
import TableHead from './TableHead';
import Row from './Row';

import type { Pokemon } from '../../interfaces/pokemon';

const ListPage = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [powerThreshold, setPowerThreshold] = useState(0);

  const filteredPokemons = pokemons
    .filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(pokemon => calculatePower(pokemon) > powerThreshold);
  
  return (
    <>
      <Head>
        <title>Technical test next.js and typescript</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Pokemon list</h1>

      <div>
        <label htmlFor="search">Search</label>
        <input id="search" type="text" value={searchTerm} onChange={({ target }) => setSearchTerm(target.value) }/>

        <label htmlFor="power_threshold">Power threshold</label>
        <input id="power_threshold" type="number" value={powerThreshold || ''} onChange={({ target }) => setPowerThreshold(Number(target.value)) }></input>

        <div>Count over threshold: </div>
        <div>Min: </div>
        <div>Max: </div>

        <table>
          <TableHead />
          <tbody>
            {filteredPokemons.map((pokemon) => <Row key={pokemon.id} {...pokemon} />)}
          </tbody>
        </table>
      </div>
    </>
  );
};

ListPage.getLayout = Layout;

export default ListPage;

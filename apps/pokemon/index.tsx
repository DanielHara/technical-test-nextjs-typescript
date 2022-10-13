import React from 'react';
import Image from 'next/image';

import { Pokemon } from '../../interfaces/pokemon';
import { calculatePower } from '../utils';

const PokemonPage = (pokemon: Pokemon) => {
  const { name, id,  type, hp, attack, defense, special_attack, special_defense, speed, next, previous } = pokemon;
  const power = calculatePower(pokemon);

  return <article>
    <h1>{name}</h1>

    <Image src={`/images/${name.toLowerCase()}.jpg`} alt={name} width="100px" height="100px" />
  
    <div>
      {`ID: ${id}`}
    </div>
    <div>
      {`Name: ${name}`}
    </div>
    <div>
      {`Type: ${type.join(', ')}`}
    </div>
    <div>
      {`hp: ${hp}`}
    </div>
    <div>
      {`Attack: ${attack}`}
    </div>
    <div>
      {`Defense: ${defense}`}
    </div>
    <div>
      {`Special Attack: ${special_attack}`}
    </div>
    <div>
      {`Special Defense: ${special_defense}`}
    </div>
    <div>
      {`Speed: ${speed}`}
    </div>

    <div>
      {`Power: ${power}`}
    </div>

    {previous && <button  onClick={() => {
      window.location.href= `/pokemon/${previous}`;
    }}>{'< Previous'}</button>}
    {next && <button onClick={() => {
      window.location.href= `/pokemon/${next}`;
    }}>{'Next >'}</button>}
  </article>;
};


export default PokemonPage;

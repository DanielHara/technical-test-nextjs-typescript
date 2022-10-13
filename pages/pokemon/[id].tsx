import React from 'react';
import Head from 'next/head';

import { Pokemon } from '../../interfaces/pokemon';
import { Layout } from '../../components/Layout';

const PokemonPage = ({ name, id,  type, hp, attack, defense, special_attack, special_defense, speed }: Pokemon) => {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <article>
        <h1>{name}</h1>
        
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
      </article>

      <button>{'< Previous'}</button>
      <button>{'Next >'}</button>
    </>
  );
};

PokemonPage.getLayout = Layout;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: number };
}) {
  try {
    // Implement new endpoint in /api/pokemon/[id].ts and use it here
    const pokemon = await fetch(`http://localhost:3000/api/pokemons/${id}`).then(
      (resp) => resp.json()
    );

    return { props: pokemon };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default PokemonPage;

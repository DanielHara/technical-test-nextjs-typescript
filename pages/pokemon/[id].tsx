import React from 'react';
import Head from 'next/head';

import { Pokemon } from '../../interfaces/pokemon';
import { Layout } from '../../components/Layout';

const PokemonPage = (props: Pokemon) => {
  return (
    <>
      <Head>
        <title>{props.name}</title>
      </Head>
      <h1>{props.name}</h1>
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
    const pokemonExample: Pokemon = {
      id: id,
      name: 'Bulbasaur',
      type: ['Grass', 'Poison'],
      hp: 45,
      attack: 49,
      defense: 49,
      special_attack: 65,
      special_defense: 65,
      speed: 45,
    };
    return { props: pokemonExample };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default PokemonPage;

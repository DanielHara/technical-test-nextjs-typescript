import React from 'react';
import Head from 'next/head';

import { Pokemon } from '../../interfaces/pokemon';
import { Layout } from '../../components/Layout';
import PokemonArticle from '../../apps/pokemon';

const PokemonPage = (pokemon: Pokemon) => {
  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <PokemonArticle {...pokemon} />
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
    const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);

    if (!response.ok) {
      return {
        notFound: true,
      };
    }

    return { props: response.json() };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default PokemonPage;

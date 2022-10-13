import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { Pokemon } from '../../interfaces/pokemon';
import { Layout } from '../../components/Layout';

const PokemonPage = (pokemon: Pokemon) => {
  const { name, id,  type, hp, attack, defense, special_attack, special_defense, speed, next, previous } = pokemon;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <article>
        <h1>{name}</h1>

        <Image src={`/../public/images/${name.toLowerCase()}.jpg`} alt={name} width="100px" height="100px" />
        
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

      <button  onClick={() => {
        if (previous) {
          window.location.href= `/pokemon/${previous}`;
        }
      }}>{'< Previous'}</button>
      <button onClick={() => {
        if (next) {
          window.location.href= `/pokemon/${next}`;
        }
      }}>{'Next >'}</button>
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

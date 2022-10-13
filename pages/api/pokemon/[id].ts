// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import Id2PokemonMap, { ListLength } from '../data/pokemonMap';
import { Pokemon } from '../../../interfaces/pokemon';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon>
) {
  if (!req.query.id) {
    res.status(400);
    return;
  }
  
  const id = Number(req.query.id);

  if (!Id2PokemonMap[id]) {
    res.status(404);
    return;
  }

  const pokemon = Id2PokemonMap[id];

  res.status(200).json({
    ...pokemon,
    next: pokemon.id < ListLength ? pokemon.id + 1 : null,
    previous: pokemon.id > 1 ? pokemon.id - 1 : null,
  });
}

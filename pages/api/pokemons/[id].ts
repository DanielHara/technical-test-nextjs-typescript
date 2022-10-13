// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import Id2PokemonMap, { ListLength } from '../../../backend/pokemonMap';
import { Pokemon } from '../../../interfaces/pokemon';

interface IError {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon | IError>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  } 
  
  if (!req.query.id) {
    res.status(400).json({ error: 'id is required' });
    return;
  }
  
  const id = Number(req.query.id);

  if (!Id2PokemonMap[id]) {
    res.status(404).json({ error: 'pokemon does not exist' });
    return;
  }

  const pokemon = Id2PokemonMap[id];

  res.status(200).json({
    ...pokemon,
    next: pokemon.id < ListLength ? pokemon.id + 1 : null,
    previous: pokemon.id > 1 ? pokemon.id - 1 : null,
  });
}

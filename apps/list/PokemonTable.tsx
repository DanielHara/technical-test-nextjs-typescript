import { Pokemon } from '../../interfaces/pokemon';
import TableHead from './TableHead';
import Row from './Row';

interface IProps {
    pokemons: Pokemon[]
}

const PokemonTable = ({pokemons }: IProps) => <table>
  <TableHead />
  <tbody>
    {pokemons.map((pokemon) => <Row key={pokemon.id} {...pokemon} />)}
  </tbody>
</table>;

export default PokemonTable;

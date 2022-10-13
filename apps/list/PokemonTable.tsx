import type { Pokemon } from '../../interfaces/pokemon';
import TableHead from './TableHead';
import Row from './Row';
import styled from 'styled-components';

interface IProps {
    pokemons: Pokemon[]
}

const StyledTable = styled.table`
  tbody td{
    padding: 10px;
  }
  tbody tr:nth-child(odd){
    background-color: #4C8BF5;
    color: #fff;
  }
  table-layout:fixed;
  width: 1000px;
`;

const PokemonTable = ({pokemons }: IProps) => <StyledTable>
  <TableHead />
  <tbody>
    {pokemons.map((pokemon) => <Row key={pokemon.id} {...pokemon} />)}
  </tbody>
</StyledTable>;

export default PokemonTable;

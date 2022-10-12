import { render, screen, within }  from '@testing-library/react';
import tableQueries from 'testing-library-table-queries';
import ListPage from '../pages';

const mockPokemons = [{
  'id': 1,
  'name': 'Bulbasaur',
  'type': [
    'Grass',
    'Poison'
  ],
  'hp': 45,
  'attack': 49,
  'defense': 49,
  'special_attack': 65,
  'special_defense': 65,
  'speed': 45
},
{
  'id': 2,
  'name': 'Ivysaur',
  'type': [
    'Grass',
    'Poison'
  ],
  'hp': 60,
  'attack': 62,
  'defense': 63,
  'special_attack': 80,
  'special_defense': 80,
  'speed': 60
}];

describe('ListPage', () => {
  it('renders table with the Bulbasaur, whose id is 1, with Name and hp', () => {
    const { getCellByRowAndColumnHeaders} = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...tableQueries }}  );

    const row = screen.getByRole('cell', {name: '1'}).closest('tr');

    if (!row) {
      throw Error('row not found');
    }

    expect(getCellByRowAndColumnHeaders('1', 'Name', undefined)).toHaveTextContent('Bulbasaur');
    expect(getCellByRowAndColumnHeaders('1', 'hp', undefined)).toHaveTextContent('45');
  });
});

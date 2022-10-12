import { render, screen, within }  from '@testing-library/react';
import ListPage from '../index';

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
  it('renders table with the Bulbasaur, whose id is 1', () => {
    render(<ListPage pokemons={mockPokemons}/>);

    const row = screen.getByRole('cell', {name: '1'}).closest('tr');

    if (!row) {
      throw Error('row not found');
    }

    const utils = within(row);
    expect(utils.getByText('Bulbasaur')).toBeInTheDocument();
  });
});

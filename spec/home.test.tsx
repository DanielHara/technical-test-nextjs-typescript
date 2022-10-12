import { render }  from '@testing-library/react';
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

describe('home Page', () => {
  describe('table', () => {
    it('shows all information about Bulbasaur', () => {
      const { getCellByRowAndColumnHeaders } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...tableQueries }}  );

      expect(getCellByRowAndColumnHeaders('1', 'Name', undefined)).toHaveTextContent('Bulbasaur');
      expect(getCellByRowAndColumnHeaders('1', 'Type', undefined)).toHaveTextContent('Grass, Poison');
      expect(getCellByRowAndColumnHeaders('1', 'hp', undefined)).toHaveTextContent('45');
      expect(getCellByRowAndColumnHeaders('1', 'Attack', undefined)).toHaveTextContent('49');
      expect(getCellByRowAndColumnHeaders('1', 'Defense', undefined)).toHaveTextContent('49');
      expect(getCellByRowAndColumnHeaders('1', 'Special Attack', undefined)).toHaveTextContent('65');
      expect(getCellByRowAndColumnHeaders('1', 'Special Defense', undefined)).toHaveTextContent('65');
      expect(getCellByRowAndColumnHeaders('1', 'Speed', undefined)).toHaveTextContent('45');
    });

    it('shows all information about Ivysaur', () => {
      const { getCellByRowAndColumnHeaders } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...tableQueries }}  );

      expect(getCellByRowAndColumnHeaders('2', 'Name', undefined)).toHaveTextContent('Ivysaur');
      expect(getCellByRowAndColumnHeaders('2', 'Type', undefined)).toHaveTextContent('Grass, Poison');
      expect(getCellByRowAndColumnHeaders('2', 'hp', undefined)).toHaveTextContent('60');
      expect(getCellByRowAndColumnHeaders('2', 'Attack', undefined)).toHaveTextContent('62');
      expect(getCellByRowAndColumnHeaders('2', 'Defense', undefined)).toHaveTextContent('63');
      expect(getCellByRowAndColumnHeaders('2', 'Special Attack', undefined)).toHaveTextContent('80');
      expect(getCellByRowAndColumnHeaders('2', 'Special Defense', undefined)).toHaveTextContent('80');
      expect(getCellByRowAndColumnHeaders('2', 'Speed', undefined)).toHaveTextContent('60');
    });
  });
});

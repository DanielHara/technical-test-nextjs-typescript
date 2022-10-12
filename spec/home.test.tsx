import { fireEvent, render, queries, waitFor }  from '@testing-library/react';
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
      const { getCellByRowAndColumnHeaders } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );

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
      const { getCellByRowAndColumnHeaders } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );

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

  describe('Search functionality', () => {
    it('contains input where you can search Pokemon', () => {
      const { getByLabelText } = render(<ListPage pokemons={mockPokemons}/>);

      expect(getByLabelText('Search')).toBeInTheDocument();
    });

    it('searching for "Bulbasaur" will include only the Bulbasaur Pokemon in the result', () => {
      const { getByLabelText, getAllRows, getRowByFirstCellText, queryAllRowsByFirstCellText } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );

      fireEvent.change(getByLabelText('Search'), { target: { value: 'Bulbasaur' } });

      // getAllRows also includes header rows, so we need to expect (1 + 1) rows.
      expect(getAllRows()).toHaveLength(2);
      
      const bulbasaurRow = getRowByFirstCellText('1');
      expect(bulbasaurRow).toHaveTextContent('Bulbasaur');

      expect(queryAllRowsByFirstCellText('2')).toHaveLength(0);
    });
  });
});

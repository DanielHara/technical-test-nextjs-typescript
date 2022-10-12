import { fireEvent, render, queries, within }  from '@testing-library/react';
import tableQueries from 'testing-library-table-queries';
import ListPage from '../pages';

import { getMockPokemons } from './fixtures'; 

const mockPokemons = getMockPokemons();

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

  describe('Filtering', () => {
    describe('by name', () => {
      it('contains input where you can search Pokemon', () => {
        const { getByLabelText } = render(<ListPage pokemons={mockPokemons}/>);
  
        expect(getByLabelText('Search')).toBeInTheDocument();
      });
  
      it('searching for "Bulbasaur" will include only the Bulbasaur Pokemon in the result', () => {
        const { getByLabelText, getByRowgroupType,  } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
  
        fireEvent.change(getByLabelText('Search'), { target: { value: 'Bulbasaur' } });
  
        const tbody = getByRowgroupType('tbody');
        const { getAllRows, getRowByFirstCellText, queryAllRowsByFirstCellText } = within(tbody, { ...queries, ...tableQueries } );
  
        expect(getAllRows()).toHaveLength(1);
        
        const bulbasaurRow = getRowByFirstCellText('1');
        expect(bulbasaurRow).toHaveTextContent('Bulbasaur');
  
        expect(queryAllRowsByFirstCellText('2')).toHaveLength(0);
      });
  
  
      it('searching for "char" will include "Charmander", "Charmeleon" and "Charizard"', () => {
        const { getByLabelText, getByRowgroupType } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
  
        fireEvent.change(getByLabelText('Search'), { target: { value: 'char' } });
  
        const tbody = getByRowgroupType('tbody');
        const { getAllRows, getRowByFirstCellText, queryAllRowsByFirstCellText } = within(tbody, { ...queries, ...tableQueries } );
  
        expect(getAllRows()).toHaveLength(3);
        
        const charmanderRow = getRowByFirstCellText('4');
        expect(charmanderRow).toHaveTextContent('Charmander');
  
        const charmeleonRow = getRowByFirstCellText('5');
        expect(charmeleonRow).toHaveTextContent('Charmeleon');
  
        const charizardRow = getRowByFirstCellText('6');
        expect(charizardRow).toHaveTextContent('Charizard');
  
        expect(queryAllRowsByFirstCellText('2')).toHaveLength(0);
      });
    });

    describe('by power threshold', () => {
      it('contains input where you can search a number for Power Threshold', () => {
        const { getByLabelText } = render(<ListPage pokemons={mockPokemons}/>);
  
        const powerThresholdInput = getByLabelText('Power threshold');
        expect(powerThresholdInput).toBeInTheDocument();
        expect(powerThresholdInput).toHaveAttribute('type', 'number');
      });
    });
  });
});

import { fireEvent, render, queries, within }  from '@testing-library/react';
import tableQueries, { queryAllRows } from 'testing-library-table-queries';
import { calculatePower } from '../apps/utils';
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

      it('by entering 0, all Pokemons are shown', () => {
        const { getByLabelText, getByRowgroupType } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 0 } });

        const tbody = getByRowgroupType('tbody');
        const { getAllRows } = within(tbody, { ...queries, ...tableQueries } );

        expect(getAllRows()).toHaveLength(mockPokemons.length);
      });
      
      it('by entering 190, "Caterpie" (id: 10) is shown', () => {
        const { getByLabelText, getByRowgroupType } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 190 } });

        const tbody = getByRowgroupType('tbody');
        const { getRowByFirstCellText } = within(tbody, { ...queries, ...tableQueries } );

        expect(getRowByFirstCellText('10')).toBeInTheDocument();
      });

      it('by entering 200, "Caterpie" (id: 10) is not shown', () => {
        const { getByLabelText, getByRowgroupType } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 200 } });

        const tbody = getByRowgroupType('tbody');
        const { queryRowByFirstCellText } = within(tbody, { ...queries, ...tableQueries } );

        expect(queryRowByFirstCellText('10')).toBeNull();
      });

      it('by entering 300, only all and Pokemons with total power > 300 are shown', () => {
        const { getByLabelText, getByRowgroupType, getCellByRowAndColumnHeaders } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 300 } });

        const tbody = getByRowgroupType('tbody');
        const { getAllRows } = within(tbody, { ...queries, ...tableQueries } );

        const pokemonsAboveThreshold = mockPokemons.filter(pokemon => calculatePower(pokemon) > 300);

        pokemonsAboveThreshold.forEach(({ id, name }) => {
          expect(getCellByRowAndColumnHeaders(`${id}`, 'Name', undefined)).toHaveTextContent(name);
        });

        expect(pokemonsAboveThreshold.length).toBeGreaterThan(0);
        expect(pokemonsAboveThreshold.length).toBeLessThan(mockPokemons.length);
        expect(getAllRows()).toHaveLength(pokemonsAboveThreshold.length);
      });

      it('by entering 533, only all and Pokemons with total power > 533 are shown', () => {
        const { getByLabelText, getByRowgroupType, getCellByRowAndColumnHeaders } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 533 } });

        const tbody = getByRowgroupType('tbody');
        const { getAllRows } = within(tbody, { ...queries, ...tableQueries } );

        const pokemonsAboveThreshold = mockPokemons.filter(pokemon => calculatePower(pokemon) > 533);

        pokemonsAboveThreshold.forEach(({ id, name }) => {
          expect(getCellByRowAndColumnHeaders(`${id}`, 'Name', undefined)).toHaveTextContent(name);
        });

        // In our fixtures, only one Pokemon, "Charizard", has power > 533
        expect(pokemonsAboveThreshold).toHaveLength(1);
        expect(getAllRows()).toHaveLength(pokemonsAboveThreshold.length);
      });

      it('by entering 100000, no Pokemons are shown', () => {
        const { getByLabelText, getByRowgroupType } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 100000 } });

        const tbody = getByRowgroupType('tbody');
        const { queryAllRows } = within(tbody, { ...queries, ...tableQueries } );

        expect(queryAllRows()).toHaveLength(0);
      });
    });

    describe('Search and Power Threshold work together' , () => {
      it('by entering 533 and searching for "char", then "Charizard" is shown', () => {
        const { getByLabelText, getByRowgroupType, getCellByRowAndColumnHeaders } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Search'), { target: { value: 'char' } });
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 533 } });

        const tbody = getByRowgroupType('tbody');
        const { getAllRows } = within(tbody, { ...queries, ...tableQueries } );

        // In our fixtures, only one Pokemon, "Charizard" (id: 6) has power > 533
        expect(getCellByRowAndColumnHeaders('6', 'Name', undefined)).toHaveTextContent('Charizard');
        expect(getAllRows()).toHaveLength(1);
      });

      it('by entering 533 and searching for "abc", then no Pokemon is shown', () => {
        const { getByLabelText, getByRowgroupType } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Search'), { target: { value: 'abc' } });
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 533 } });

        const tbody = getByRowgroupType('tbody');
        const { queryAllRows } = within(tbody, { ...queries, ...tableQueries } );

        expect(queryAllRows()).toHaveLength(0);
      });
    });

    describe('Count, max and min', () => {
      it('no filters', () => {
        const { getByText } = render(<ListPage pokemons={mockPokemons}/>);
  
        expect(getByText(`Count over threshold: ${mockPokemons.length}`)).toBeInTheDocument();
        expect(getByText('Min: 195')).toBeInTheDocument();
        expect(getByText('Max: 534')).toBeInTheDocument();
      });
  
      it('searching for "Bulbasaur"', () => {
        const { getByLabelText, getByText } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
  
        fireEvent.change(getByLabelText('Search'), { target: { value: 'Bulbasaur' } });
  
        expect(getByText('Count over threshold: 1')).toBeInTheDocument();
        expect(getByText('Min: 318')).toBeInTheDocument();
        expect(getByText('Max: 318')).toBeInTheDocument();
      });
      
      it('searching for "char"', () => {
        const { getByLabelText, getByText } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
  
        fireEvent.change(getByLabelText('Search'), { target: { value: 'char' } });
  
        // "Charmander", "Charmeleon", "Charizard"
        expect(getByText('Count over threshold: 3')).toBeInTheDocument();
        expect(getByText('Min: 309')).toBeInTheDocument();
        expect(getByText('Max: 534')).toBeInTheDocument();
      });

      it('searching for "soapsoaksoaksoaks"', () => {
        const { getByLabelText, getByText } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
  
        fireEvent.change(getByLabelText('Search'), { target: { value: 'soapsoaksoaksoaks' } });
  
        expect(getByText('Count over threshold: 0')).toBeInTheDocument();
        expect(getByText('Min: -')).toBeInTheDocument();
        expect(getByText('Max: -')).toBeInTheDocument();
      });

      it('Pokemons with total power > 300', () => {
        const { getByLabelText, getByText } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 300 } });

        const pokemonsAboveThreshold = mockPokemons.filter(pokemon => calculatePower(pokemon) > 300);
        
        expect(getByText(`Count over threshold: ${pokemonsAboveThreshold.length}`)).toBeInTheDocument();
        expect(getByText('Min: 309')).toBeInTheDocument();
        expect(getByText('Max: 534')).toBeInTheDocument();
        expect(pokemonsAboveThreshold.length).toBeGreaterThan(0);
      });

      it('Searching with total power > 10000', () => {
        const { getByLabelText, getByText } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 10000 } });

        expect(getByText('Count over threshold: 0')).toBeInTheDocument();
        expect(getByText('Min: -')).toBeInTheDocument();
        expect(getByText('Max: -')).toBeInTheDocument();
      });

      it('Searching for "char" and with total power > 310', () => {
        const { getByLabelText, getByText } = render(<ListPage pokemons={mockPokemons}/>, { queries: { ...queries, ...tableQueries }}  );
        
        fireEvent.change(getByLabelText('Search'), { target: { value: 'char'} });
        fireEvent.change(getByLabelText('Power threshold'), { target: { value: 310 } });

        // "Charmeleon", "Charizard"
        expect(getByText('Count over threshold: 2')).toBeInTheDocument();
        expect(getByText('Min: 405')).toBeInTheDocument();
        expect(getByText('Max: 534')).toBeInTheDocument();
      });
    });

    it('clicking on the row, redirects to the Pokemon', () => {
      const mockWindowOpen = jest.fn();
      window.open = mockWindowOpen;
      
      const { getByText } = render(<ListPage pokemons={mockPokemons}/>);
  
      fireEvent.click(getByText('Bulbasaur'));
      
      expect(mockWindowOpen).toHaveBeenCalledWith('/pokemon/1');
    });
  });
});

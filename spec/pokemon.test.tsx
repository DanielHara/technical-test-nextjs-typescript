import { fireEvent, render, screen }  from '@testing-library/react';
import PokemonDisplay from '../pages/pokemon/[id]';

import { getMockPokemon } from './fixtures';

describe('Pokemon Page', () => {
  it('shows all information about the pokemon', () => {
    const pokemon = getMockPokemon();

    render(<PokemonDisplay {...pokemon} />);

    expect(screen.getByText('ID: 2')).toBeInTheDocument();
    expect(screen.getByText('Name: Ivysaur')).toBeInTheDocument();
    expect(screen.getByText('Type: Grass, Poison')).toBeInTheDocument();
    expect(screen.getByText('hp: 60')).toBeInTheDocument();
    expect(screen.getByText('Attack: 62')).toBeInTheDocument();
    expect(screen.getByText('Defense: 63')).toBeInTheDocument();
    expect(screen.getByText('Special Attack: 80')).toBeInTheDocument();
    expect(screen.getByText('Special Defense: 80')).toBeInTheDocument();
    expect(screen.getByText('Speed: 60')).toBeInTheDocument();

    expect(screen.getByText('Power: 405')).toBeInTheDocument();
  });

  it('shows pokemon image with alt which equals the name of the Pokemon', () => {
    const pokemon = getMockPokemon();

    render(<PokemonDisplay {...pokemon} />);

    const image = screen.getByAltText('Ivysaur');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });

  describe('next and previous logic', () => {
    describe('some random Pokemon in the middle of the list', () => {
      it('clicking on next, goes to the next Pokemon', () => {
        delete window.location;
        window.location = {};
    
        const pokemon = getMockPokemon();
    
        render(<PokemonDisplay {...pokemon} />);
    
        const nextButton = screen.getByText('Next >');
    
        fireEvent.click(nextButton);
    
        expect(window.location.href).toBe('/pokemon/3');
      });
  
      it('clicking on previous, goes to the previous Pokemon', () => {
        delete window.location;
        window.location = {};
    
        const pokemon = getMockPokemon();
        render(<PokemonDisplay {...pokemon} />);
    
        const previousButton = screen.getByText('< Previous');
    
        fireEvent.click(previousButton);
    
        expect(window.location.href).toBe('/pokemon/1');
      });
    });
    
    it('first Pokemon has next button, but no previous button', () => {
      const pokemon = getMockPokemon({ previous: null });
      render(<PokemonDisplay {...pokemon} />);

      expect(screen.queryByText('< Previous')).toBeNull();
      expect(screen.getByText('Next >')).toBeInTheDocument();
    });

    it('last Pokemon has previous button, but no next button', () => {
      const pokemon = getMockPokemon({ next: null });
      render(<PokemonDisplay {...pokemon} />);

      expect(screen.getByText('< Previous')).toBeInTheDocument();
      expect(screen.queryByText('Next >')).toBeNull();
    });
  });
});

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
  });

  it('shows pokemon image with alt which equals the name of the Pokemon', () => {
    const pokemon = getMockPokemon();

    render(<PokemonDisplay {...pokemon} />);

    const image = screen.getByAltText('Ivysaur');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });

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
  });
});

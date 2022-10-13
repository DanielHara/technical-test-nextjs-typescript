import { createMocks } from 'node-mocks-http';
import getPokemon from '../pages/api/pokemon/[id]';

describe('/pokemon/[id]', () => {
  describe('returns a Pokemon when the id exists',  () => {
    it('some random Pokemon', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '2',
        },
      });
          
      await getPokemon(req, res);
          
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toStrictEqual({
        'id': 2,
        'name': 'Ivysaur',
        'type': ['Grass', 'Poison'],
        'hp': 60,
        'attack': 62,
        'defense': 63,
        'special_attack': 80,
        'special_defense': 80,
        'speed': 60,
        'next': 3,
        'previous': 1,
      });
    });

    it('the first Pokemon', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '1',
        },
      });
            
      await getPokemon(req, res);
            
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toStrictEqual({
        'id': 1,
        'name': 'Bulbasaur',
        'type': ['Grass', 'Poison'],
        'hp': 45,
        'attack': 49,
        'defense': 49,
        'special_attack': 65,
        'special_defense': 65,
        'speed': 45,
        next: 2,
        previous: null
      });
    });

    it('the last Pokemon', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '809',
        },
      });
              
      await getPokemon(req, res);
              
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toStrictEqual({
        'id': 809,
        'name': 'Melmetal',
        'type': ['Steel'],
        'hp': 135,
        'attack': 143,
        'defense': 143,
        'special_attack': 80,
        'special_defense': 65,
        'speed': 34,
        next: null,
        previous: 808
      });
    });
  });
});

import type { Pokemon } from '../../interfaces/pokemon';

const Row = ({id, name, type, hp, attack, defense, special_attack, special_defense, speed}: Pokemon) => {
  const handleClick = () => {
    window.open(`/pokemon/${id}`);
  };

  return  <tr onClick={handleClick}>
    <td>
      {id}
    </td>
    <td>
      {name}
    </td>
    <td>
      {type.join(', ')}
    </td>
    <td>
      {hp}
    </td>
    <td>
      {attack}
    </td>
    <td>
      {defense}
    </td>
    <td>
      {special_attack}
    </td>
    <td>
      {special_defense}
    </td>
    <td>
      {speed}
    </td>
  </tr>;
};

export default Row;

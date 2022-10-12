import HomePage from '../apps/home';

export async function getServerSideProps() {
  try {
    const pokemons = await fetch("http://localhost:3000/api/pokemons").then(
      (resp) => resp.json()
    );
    return { props: { pokemons } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default HomePage;

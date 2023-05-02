import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Button = styled.button`
  padding: 8px;
  background-color: #4e47d1;
  border-radius: 16px;
  color: black;
  width: 120px;
  text-align: center;
  box-shadow: 3px 3px 8px #888888;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button onClick={() => onSelect(pokemon)}>Select!</Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map(key => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};
const Title = styled.h1`
  text-align: center;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function App() {
  const [filter, setFilter] = React.useState("");
  const [selectPokemon, setSelectPokemon] = React.useState(null);
  const [pokemon, setPokemon] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/react-works/pokemon.json")
      .then(resp => resp.json())
      .then(data => setPokemon(data));
  }, []);

  return (
    <Container>
      <Title>Pokemon Search</Title>

      <TwoColumnLayout>
        <div>
          <Input value={filter} onChange={e => setFilter(e.target.value)} />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter(pokemon =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .slice(0, 20)
                .map(item => (
                  <PokemonRow
                    key={item.id}
                    pokemon={item}
                    onSelect={item => setSelectPokemon(item)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {selectPokemon && <PokemonInfo {...selectPokemon} />}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;

import React from 'react';
import {Component} from 'react';
import "./App.css"
import Header from './components/Header'
import PokeCard from './components/PokeCard'

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons : [], // Liste des pokemons
      pokemonDetails : [], // Liste des détails de chaque pokemon, récupérés depuis son URL
      offset: 0,
      loadNumber: 24      
    }
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  getNextOffset() {
    return this.state.offset+this.state.loadNumber;
  }

  handleMoreClick(event) {
    const newOffset = this.getNextOffset();
    this.setState({offset: newOffset}, () => {
      console.log("Offset: " + this.state.offset)
      this.getMorePokemon();
    });
    
  }
  
  componentDidMount() {
    this.getMorePokemon();
  }

  //Permet de récupérer les pokemons et leur détails
  getMorePokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=" + this.state.loadNumber + "&offset=" + this.state.offset)
        .then((res) => res.json())
        .then(pokemons => {
          this.setState({
            pokemons: pokemons.results
          });
          this.state.pokemons.map(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(data => {
                  if (data) {
                    var temp = this.state.pokemonDetails
                    temp.push(data)
                    this.setState({pokemonDetails: temp})
                  }
                })
          })
        });
  }

  render() {
    const {pokemonDetails} = this.state;

    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
      return (<PokeCard pokemon={pokemon} />);
    });

    return (
      <div>
        <Header />
        <div className="container">
          <div className="card-columns">
            {renderedPokemonList}
          </div>
        </div>
        <button type="button" className="btn btn-secondary btn-block" key="more-button" id="more-button" onClick={this.handleMoreClick}>Load More</button>
      </div>
    );
  }
}

export default App;

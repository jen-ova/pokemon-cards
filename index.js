const poke_container = document.getElementById('poke_container');
const kantoPokemon = 151;
const colours = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
};

const mainType = Object.keys(colours);
console.log(mainType);

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
	console.log(pokemon);
};

const fetchPokemon = async () => {
	for (let i = 1; i <= kantoPokemon; i++) {
		await getPokemon(i);
	}
};

fetchPokemon();

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const pokeType = pokemon.types.map((type) => type.type.name);
	const type = mainType.find((type) => pokeType.indexOf(type) > -1);

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

	const colour = colours[type];

	pokemonEl.style.backgroundColor = colour;

	const pokeInnerHTML = `
	<div class="img-container">
	<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
		pokemon.id
	}.png" />
	</div>
	<div class="info">
	<span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
	<h3 class="name">${name}</h3>
	<small class="type">Type: <span>${type}</span></small>
	</div`;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

getPokemon(1);

function formatTypes(type) {
    let typeFr;
    switch(type) {
        case 'grass' : typeFr = ['https://www.pokepedia.fr/images/thumb/d/d9/Miniature_Type_Plante_EV.png/80px-Miniature_Type_Plante_EV.png', '#78c850'];
        break;
        
        case 'poison' : typeFr = ['https://www.pokepedia.fr/images/thumb/1/1c/Miniature_Type_Poison_EV.png/80px-Miniature_Type_Poison_EV.png', '#966DA3'];
        break;

        case 'fire' : typeFr = ['https://www.pokepedia.fr/images/thumb/c/c7/Miniature_Type_Feu_EV.png/80px-Miniature_Type_Feu_EV.png', '#F58271'];
        break;

        case 'flying' : typeFr = ['https://www.pokepedia.fr/images/thumb/9/99/Miniature_Type_Vol_EV.png/80px-Miniature_Type_Vol_EV.png', '#A98FF3'];
        break;

        case 'bug' : typeFr = ['https://www.pokepedia.fr/images/thumb/a/a9/Miniature_Type_Insecte_EV.png/80px-Miniature_Type_Insecte_EV.png', '#B3F594'];
        break;

        case 'normal' : typeFr = ['https://www.pokepedia.fr/images/thumb/b/bf/Miniature_Type_Normal_EV.png/80px-Miniature_Type_Normal_EV.png', '#D9D5D8'];
        break;

        case 'electric' : typeFr = ['https://www.pokepedia.fr/images/thumb/6/6d/Miniature_Type_%C3%89lectrik_EV.png/80px-Miniature_Type_%C3%89lectrik_EV.png', '#F7D02C'];
        break;

        case 'ground' : typeFr = ['https://www.pokepedia.fr/images/thumb/4/40/Miniature_Type_Sol_EV.png/80px-Miniature_Type_Sol_EV.png', '#E2BF65'];
        break;

        case 'fairy' : typeFr = ['https://www.pokepedia.fr/images/thumb/5/58/Miniature_Type_F%C3%A9e_EV.png/80px-Miniature_Type_F%C3%A9e_EV.png', '#D685AD'];
        break;

        case 'water' : typeFr = ['https://www.pokepedia.fr/images/thumb/3/3d/Miniature_Type_Eau_EV.png/80px-Miniature_Type_Eau_EV.png', '#6390F0'];
        break;

        case 'fighting' : typeFr = ['https://www.pokepedia.fr/images/thumb/9/96/Miniature_Type_Combat_EV.png/80px-Miniature_Type_Combat_EV.png', '#C25956'];
        break;

        case 'psychic' : typeFr = ['https://www.pokepedia.fr/images/thumb/8/81/Miniature_Type_Psy_EV.png/80px-Miniature_Type_Psy_EV.png', '#F95587'];
        break;

        case 'rock' : typeFr = ['https://www.pokepedia.fr/images/thumb/f/fe/Miniature_Type_Roche_EV.png/80px-Miniature_Type_Roche_EV.png', '#B6A136'];
        break;
        
        case 'steel' : typeFr = ['https://www.pokepedia.fr/images/thumb/2/27/Miniature_Type_Acier_EV.png/80px-Miniature_Type_Acier_EV.png', 'silver'];
        break;

        case 'ghost' : typeFr = ['https://www.pokepedia.fr/images/thumb/4/43/Miniature_Type_Spectre_EV.png/80px-Miniature_Type_Spectre_EV.png', '#735797'];
        break;

        case 'dragon' : typeFr = ['https://www.pokepedia.fr/images/thumb/3/3d/Miniature_Type_Dragon_EV.png/80px-Miniature_Type_Dragon_EV.png', '#6F35FC'];
        break;

        case 'dark' : typeFr = ['https://www.pokepedia.fr/images/thumb/b/bc/Miniature_Type_T%C3%A9n%C3%A8bres_EV.png/80px-Miniature_Type_T%C3%A9n%C3%A8bres_EV.png', '#000'];
        break;

        case 'ice' : typeFr = ['https://www.pokepedia.fr/images/thumb/e/e7/Miniature_Type_Glace_EV.png/80px-Miniature_Type_Glace_EV.png', '#96D9D6'];
        break;

        default : typeFr = ['https://www.pokepedia.fr/images/thumb/0/0f/Miniature_Type_Inconnu_EV.png/80px-Miniature_Type_Inconnu_EV.png', '#D9D5D8'];
    }
    return typeFr;
}

function formatId(id) {
    if(id < 10) { return {'id': id, 'full':`00${id}`}; }
    else if(id < 100) { return {'id': id, 'full': `0${id}` }; }
    else { return {'id': id, 'full': `${id}`}; }
}

const BASE_URL = 'https://pokeapi.co/api/v2';

function getAllPokemons(limit) {
    const RESPONSE = fetch(`${BASE_URL}/pokemon/?limit=${limit}`).then(res => res.json());
    return RESPONSE;
}

function getSpecies(name, types) {
    const RESPONSE = fetch(`${BASE_URL}/pokemon-species/${name}`).then(res => res.json())
    return RESPONSE;
}

function getInfosPkmn(name) {
    const RESPONSE = fetch(`${BASE_URL}/pokemon/${name}`).then(res => res.json());
    return RESPONSE;
}

const pokedex = (limit) => getAllPokemons(limit).then(async data => {
    let getPokedex = [];
    const allPokemons = await data.results.map(async pkmn => {
        const pokemon = await getInfosPkmn(pkmn.name).then(async dataPkmn => {
            
            const types = dataPkmn.types.length > 1 
            ? [formatTypes(dataPkmn.types[0].type.name), formatTypes(dataPkmn.types[1].type.name)]
            : [formatTypes(dataPkmn.types[0].type.name)];
            const sprites = { 
                /* Sprites pokeAPI */
                // default : dataPkmn.sprites.front_default,
                // shiny: dataPkmn.sprites.front_shiny

                /* Sprites Pokebip */
                default : `https://www.pokebip.com/pokedex-images/300/${dataPkmn.id}.png`,
                shiny: `https://www.pokebip.com/pages/jeuxvideo/dossier_shasse/imagerie/home/${dataPkmn.id}.png`
            };
            const species = await getSpecies(pkmn.name, types, sprites).then(dataPkmn => {           
                return {
                    id: formatId(dataPkmn.id), 
                    name: {'en': dataPkmn.name, 'fr': dataPkmn.names[4].name}, 
                    types: types, 
                    sprites : sprites
                };
            }) 
            return species;
        });
        getPokedex.push(pokemon)
    });
    await Promise.all(allPokemons);
    getPokedex.sort((a, b) => a.id.id - b.id.id);
    return getPokedex;
});

if(document.querySelector('.containerHome')) {

    const containerCards = document.querySelector('.container-cards');

    pokedex(151).then(pokemons => {
        pokemons.forEach(pokemon => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            containerCards.appendChild(card);

            let toggle = true;

            const sprite = document.createElement('img');
            sprite.setAttribute('class', 'sprite');
            sprite.setAttribute('src', `${pokemon.sprites.default}`);
            sprite.addEventListener('click', () => {
                if(toggle) { 
                    toggle = false; 
                    sprite.setAttribute('src', `${pokemon.sprites.shiny}`);
                } else { 
                    toggle = true;
                    sprite.setAttribute('src', `${pokemon.sprites.default}`);
                };
            });
            
            const desc = document.createElement('a');
                desc.setAttribute('class', 'flex-center')
                desc.classList.add('desc');
                desc.setAttribute('href', `pokemon.html?name=${pokemon.name.en}`);

                const number = document.createElement('strong');
                number.innerHTML = `#${pokemon.id.full}`;
                desc.appendChild(number);

                const name = document.createElement('strong');
                name.innerHTML = `${pokemon.name.fr}`;
                desc.appendChild(name);

                pokemon.types.length > 1
                ? card.style.background = `linear-gradient(90deg,${pokemon.types[0][1]}, ${pokemon.types[1][1]})`
                : card.style.background = `${pokemon.types[0][1]}`;
                
                card.appendChild(sprite);
                card.appendChild(desc);
        })
        
    })

}

//https://www.pokebip.com/pokedex-images/300/${pkmn.id}.png
//https://www.pokebip.com/pages/jeuxvideo/dossier_shasse/imagerie/home/${pkmn.id}.png
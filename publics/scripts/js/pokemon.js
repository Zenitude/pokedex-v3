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

function switchSprite(sprite, toggle, phase1, phase2) {
    sprite.addEventListener('click', () => {
        if(toggle) { 
            toggle = false; 
            sprite.setAttribute('src', `${phase1}`);
        } else { 
            toggle = true;
            sprite.setAttribute('src', `${phase2}`);
        };
    });
}

const BASE_URL = 'https://pokeapi.co/api/v2';

function getAllPokemons(limit) {
    const RESPONSE = fetch(`${BASE_URL}/pokemon/?limit=${limit}`).then(res => res.json());
    return RESPONSE;
}

function getSpecies(name, types = {}) {
    const RESPONSE = fetch(`${BASE_URL}/pokemon-species/${name}`).then(res => res.json())
    return RESPONSE;
}

function getInfosPkmn(name) {
    const RESPONSE = fetch(`${BASE_URL}/pokemon/${name}`).then(res => res.json());
    return RESPONSE;
}

function getEvolutions(url) {
    const RESPONSE = fetch(`${url}`).then(res => res.json());
    return RESPONSE;
}

const pokemon = (name) => getInfosPkmn(name).then(async dataPkmn => {
    const types = dataPkmn.types.length > 1 
        ? [formatTypes(dataPkmn.types[0].type.name), formatTypes(dataPkmn.types[1].type.name)]
        : [formatTypes(dataPkmn.types[0].type.name)];

    const sprites = { 
        /* Sprites PokeAPI */
        // front_default : dataPkmn.sprites.front_default,
        // front_shiny: dataPkmn.sprites.front_shiny,
        // back_default : dataPkmn.sprites.back_default,
        // back_shiny : dataPkmn.sprites.back_shiny

        /* Sprites pokebip */
        front_default : `https://www.pokebip.com/pokedex-images/300/${dataPkmn.id}.png`,
        front_shiny: `https://www.pokebip.com/pages/jeuxvideo/dossier_shasse/imagerie/home/${dataPkmn.id}.png`
    };

    const measures = {'height': dataPkmn.height, 'weight': dataPkmn.weight};
    
    const species = await getSpecies(dataPkmn.name, types, sprites, measures).then(async dataPkmn => {          
        const id = formatId(dataPkmn.id);

        const names = {'en': dataPkmn.name, 'fr': dataPkmn.names[4].name}
        
        let evolves = []; 

        if(dataPkmn.evolution_chain !== null) {
            await getEvolutions(dataPkmn.evolution_chain.url).then(dataEvolutions => {
                evolves.push({
                    'name': dataEvolutions.chain.species.name,
                    'id': parseInt((dataEvolutions.chain.species.url).substr(42).replace('/', '')),
                })
                
                const evolves_to = dataEvolutions.chain.evolves_to;

                if(evolves_to && evolves_to.length === 1) {
                    
                    evolves.push({
                        'name' : evolves_to[0].species.name, 
                        'id' : parseInt((evolves_to[0].species.url).substr(42).replace('/', '')),
                        'level' : evolves_to[0].evolution_details[0].min_level
                    });
                                     
                    if(evolves_to[0].evolves_to && evolves_to[0].evolves_to.length === 1){
                        evolves.push({
                            'name' : evolves_to[0].evolves_to[0].species.name, 
                            'id' : parseInt((evolves_to[0].evolves_to[0].species.url).substr(42).replace('/', '')),
                            'level' : evolves_to[0].evolves_to[0].evolution_details[0].min_level
                        });
                    }

                    if(evolves.length > 1 ) {
                        evolves.forEach(async pokemon => {
                            pokemon.sprites = await getInfosPkmn(pokemon.name).then(data => {
                                return {'front_default': data.sprites.front_default, 'front_shiny': data.sprites.front_shiny}
                            })
                            pokemon.name = await getSpecies(pokemon.name).then(data => {
                                return { 'en' : data.name, 'fr': data.names[4].name}
                            }) 
                        });  
                    }
                }

                
            });
        }

        return {
            id: id,
            name: names,
            types: types,
            sprites : sprites,
            measures: measures, 
            evolutionChain : evolves
        }
    });
    return species;

});

if(document.querySelector('.containerPokemon')) {
    const namePkmn = new URL(window.location.href).searchParams.get("name").toLowerCase();
    const containerPkmn = document.querySelector('.pokemon');
    
    pokemon(namePkmn).then(pkmn => {
        
        // Background color
        pkmn.types.length > 1
        ? containerPkmn.style.background = `linear-gradient(90deg, ${pkmn.types[0][1]}, ${pkmn.types[1][1]})`
        : containerPkmn.style.background = `${pkmn.types[0][1]}`;

        // Name & Number
        const containerNameNumber = document.createElement('div');
        containerNameNumber.setAttribute('class', 'flex-center');
        containerNameNumber.classList.add('nameAndNumber');

        const number = document.createElement('h2');
        number.setAttribute('class', 'number');
        number.innerHTML = `#${pkmn.id.full}`;

        const name = document.createElement('h1');
        name.setAttribute('class', 'name');
        name.innerHTML = `${pkmn.name.fr}`;
        
        containerNameNumber.appendChild(number);
        containerNameNumber.appendChild(name);
        
        // Sprites
        const titleSprites = document.createElement('h3');
        titleSprites.innerText = 'Formes';

        const containerSprites = document.createElement('div');
        containerSprites.setAttribute('class', 'flex-center');
        containerSprites.classList.add('sprites');

        const spriteDefault = document.createElement('img');
        spriteDefault.setAttribute('src', `${pkmn.sprites.front_default}`);

        const spriteShiny = document.createElement('img');
        spriteShiny.setAttribute('src', `${pkmn.sprites.front_shiny}`);

        let toggleDefault = true;
        let toggleShiny = true;

        /* Switch Front/Back with Sprites PokeApi */
        // switchSprite(spriteDefault, toggleDefault, pkmn.sprites.back_default, pkmn.sprites.front_default);
        // switchSprite(spriteShiny, toggleShiny, pkmn.sprites.back_shiny, pkmn.sprites.front_shiny);
        
        
        containerSprites.appendChild(titleSprites);
        containerSprites.appendChild(spriteDefault);
        containerSprites.appendChild(spriteShiny);

        // Types
        const titleTypes = document.createElement('h3');
        titleTypes.innerText = 'Types';

        const types = document.createElement('p');
        types.setAttribute('class', 'flex-center');
        types.classList.add('types');
        types.innerHTML = pkmn.types.length > 1 
        ? `<img src="${pkmn.types[0][0]}"> <img src="${pkmn.types[1][0]}">`
        : `<img src="${pkmn.types[0][0]}">`; 
        
        // Measures
        const titleMeasures = document.createElement('h3');
        titleMeasures.innerText = 'Mesures';

        const measures = document.createElement('p');
        measures.setAttribute('class', 'measures');
        measures.innerHTML = 
        `<ul>
            <li><strong>Taille</strong> : ${pkmn.measures.height / 10} m
            <li><strong>Poids</strong> :  ${pkmn.measures.weight / 10} kg   
        </ul>`;

        
        pkmn.evolutionChain.forEach(pokemon => {
            console.log(pokemon)
            console.log(pokemon.sprites)
            const pkmn = document.createElement('img');
            // pkmn.setAttribute('src', `${pokemon.sprites.front_default}`)
            // evolutions.push(pkmn);
            // containerPkmn.appendChild(pkmn);
        })
        containerPkmn.appendChild(containerNameNumber);
        containerPkmn.appendChild(containerSprites);
        containerPkmn.appendChild(titleTypes);
        containerPkmn.appendChild(types);
        containerPkmn.appendChild(titleMeasures);
        containerPkmn.appendChild(measures);
    });
}


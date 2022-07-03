let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon) {
  if (
    "name" in pokemon &&
    "detailsUrl" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
//new^

function getAll() {
  return pokemonList; 
  console.log(pokemonList);
}
function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list"); //use the . to select a class from the html
  let listpokemon = document.createElement('li'); // created li element
  let button = document.createElement("button"); //created button element or tag, but need to render it in
  //button.innerText = "placeholder"; //currently placeholder text until text is chosen for the button
  button.innerText = pokemon.name;
  button.classList.add("button-class"); //pulls the css properties from the class "button-class"
  listpokemon.appendChild(button); //appended the button into li, nests the button as a child into the li
  pokemonList.appendChild(listpokemon); //appended the li into the ul, which is the parent
// User activates button, button functionality is to show pokemon details
    button.addEventListener ("click", function(event){
    showDetails(pokemon);
  });
}
//this function is the promise function, fetches the apiUrl and the response is converted to json then run a forEach loop for the json result which is the entire api
  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon); //already created an add function above on line 5 
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //code below adds the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  return {
   add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});




// pokemonList.forEach(function(pokemon) {
//   console.log(pokemon.name + pokemon.type + pokemon.height);
// });

// for (let i=0; i < pokemonList.length; i++){
//   if (pokemonList[i].height>4){
//     document.write("<p>" + pokemonList[i].name + pokemonList[i].height + " Wow that is a big Pokemon!" + "</p>");
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //this function is the promise function, fetches the apiUrl and the response is converted to json then run a forEach loop for the json result which is the entire api
    function loadList () {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon); 
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
    }
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
    function getAll() {
      return pokemonList; 
    }
    // DOM methodology; javascript code
    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list"); //use the . to select a class from the html
      let listItem = document.createElement('li'); // created li element
      let button = document.createElement("button"); //created button element or tag, but need to render it in
      
      button.innerText = pokemon.name;
      button.classList.add("button-class"); //pulls the css properties from the class "button-class"

      listItem.appendChild(button); //appended the button into li, nests the button as a child into the li
      pokemonList.appendChild(listItem); //appended the li into the ul, which is the parent
      listButtonEventlistener(listItem, pokemon); //this calls the function event listener (passing list item and pokemon values as parameters)
    } 

    // User activates button, button functionality is to show pokemon details
    function listButtonEventlistener (button, pokemon) {
      button.addEventListener ("click", function(){
        showDetails(pokemon);
      });
    }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() { 
      showModal(item);
    });
  }
  // API pokemon details; use a promise
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    })
    .then(function (details) {
      //code below adds the details to the item
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
    })
    .catch(function (e) {
      console.error(e);
    });
  }
  
  // //modal written in jquery
  // function showModal (pokemon) {
  //   let modalBody = $('.modal-body');
  //   let modalTitle = $('.modal-title');

  //   modalTitle.empty();
  //   modalBody.empty();

  //   let nameElement = $("<h1>" + pokemon.name + "</h1>");
  //   let pokeImageFront = $("<img class='modal-img");
  //   let pokeImageBack = $("<img class='modal-img");
  //   let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
  //   let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
  //   let typeElement = $("<p>" + "type : " + pokemon.type + "</p>");
  //   let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>")
 
  //   modalTitle.append(nameElement);
  //   modalBody.append(pokeImageFront);
  //   modalBody.append(pokeImageBack);
  //   modalBody.append(heightElement);
  //   modalBody.append(weightElement);
  //   modalBody.append(typeElement);
  //   modalBody.append(abilitiesElement);
  // }

  return {
   add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});

//creates a function to show the modal only if it has the 'is-visible' class
function showModal(title, text) { //enable specifying a title and content for the 'showModal' function
  let modalContainer = document.querySelector('#modal-container');

  //clears all existing modal content
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');
 
  //adds new modal content
  //for the close button
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title; 

  let contentElement = document.createElement('p');
  contentElement.innerText = text;


  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  
  modalContainer.classList.add('is-visible');
  
}
  let dialogPromiseReject; // this can be set later, by show dialog

//a way to close the modal via close button, esc-key, and clicking outside the modal
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

function showDialog(title, text) {
  showModal(title, text);

  //adds a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';
  
  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  //focus on the confirm button so the user can can simply press Enter
  confirmButton.focus();
  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null; // Reset this
      hideModal();
      resolve();
    });
  //this can be used to reject from other functions
  dialogPromiseReject = reject;
});
}

document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
    alert('confirmed!');
  }, () => {
    alert('not confirmed');
  });
});

//for Esc-key close, key down predefined listener that will take the model container and select it
window.addEventListener('keydown', (e) =>{
  let modalContainer = document.querySelector('#modal-container');
  //if the key is escape then it will run the hideModal function 
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
    hideModal();
  }
});

let modalContainer = document.querySelector('#modal-container');
//for clicking outside the modal
modalContainer.addEventListener('click', (e) => {
  //this is also triggered when INSIDE the modal
  //we only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

//when you click on the button, the modal will be shown
document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});
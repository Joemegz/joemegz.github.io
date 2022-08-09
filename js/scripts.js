
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');



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
          add(pokemon); //adds to the pokemonList 
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
    function getAll() {//added getAll function to get all pokemon
      return pokemonList;//return function takes pokemon from the array 
    }
   
   
  
    function addListItem(pokemon) {//function addListItem is used for DOM 
      let pokemonList = document.querySelector(".pokemon-list"); //.pokemon-list is ul in index
      let listItem = document.createElement('li'); // created li element
      let button = document.createElement("button"); //created button element or tag, but need to render it in
      
      button.innerText = pokemon.name;
      button.classList.add("button-class"); //pulls the css properties from the class "button-class"

      listItem.appendChild(button); //appended the button into li, nests the button as a child into the li
      pokemonList.appendChild(listItem); //appended the li into the ul, which is the parent
      listButtonEventlistener(button, pokemon); //this calls the function event listener (passing list item and pokemon values as parameters)
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
      item.imageUrlFront = details.sprites.front_default;//adds details to the item
      item.imageUrlBack = details.sprites.back_default;//adds details to the item
      item.height = details.height;//adds details to the item
      item.weight = details.weight;//adds details to the item
      item.types = details.types;//adds details to the item
      item.abilities = details.abilities;//adds details to the item
    })
    .catch(function (e) {
      console.error(e);
    });
  }

  //this is where you export the functions to access them globally
  return {
   add: add,//calling add function
    getAll: getAll,//calling getAll function
    addListItem: addListItem,//calling addListItem function
    loadList: loadList,//calling loadList function
    loadDetails: loadDetails,//calling loadDetails function
    showDetails: showDetails//calling showDetails function
  };
})();
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});

//      <!---------------------------------------------- Modal --------------------------------------------------------->

function showModal(item) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');
  
  modalTitle.empty();//clears existing content of the model
  modalBody.empty();//clears existing content of the modal

  let nameElement = $("<h1>" + item.name + "</h1>"); //creating element for name in modal content
  
  let imageElementFront = $('<img class="modal-img" style="width:50%">'); //creating img front in modal content
  imageElementFront.attr("src", item.imageUrlFront);
  
  let imageElementBack = $('<img class="modal-img" style="width:50%">');//creating img back in modal content
  imageElementBack = $("src", item.imageElementBack);

  let heightElement = $("<p>" + "height : " + item.height + "</p>");//creating element for height in modal content
  let weightElement = $("<p>" + "weight : " + item.weight + "</p>");//creating element for weight in modal content
  let typesElement = $("<p>" + "types : " + item.types + "</p>");//creating element for types in modal content
  let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");//creating element for abilities in modal content


  modalTitle.append(nameElement);//appends the name element to the modal title
  modalBody.append(imageElementFront);//appends front img to the modal body
  modalBody.append(imageElementBack);//appends back img to the modal body
  modalBody.append(heightElement);//appends height to the modal body
  modalBody.append(weightElement);//appends weight to the modal body
  modalBody.append(typesElement);//appends types to the modal body
  modalBody.append(abilitiesElement);//appends abilities to the modal body
  }


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
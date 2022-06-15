let pokemonList=[
  {name: 'Mudkip', 
  height: 1.04, 
  type: ['Water']},
  
  {name: 'Charmander', 
  height: 2.00 , 
  type: ['Fire']},
  
  {name: 'Mew', 
  height: 1.04, 
  type: ['psychic']},
  
  {name: 'Psyduck', 
  height: 2.07, 
  type: ['water']},
  
  {name: 'Charizard', 
  height: 5.07, 
  type: ['fire', 'flying']}
];

let pokemonRepository = (function () {
  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();


pokemonRepository.add({ name: 'Mew' });
console.log(pokemonRepository.getAll());

pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + pokemon.type + pokemon.height);
});



// for (let i=0; i < pokemonList.length; i++){
//   if (pokemonList[i].height>4){
//     document.write("<p>" + pokemonList[i].name + pokemonList[i].height + " Wow that is a big Pokemon!" + "</p>");
//   } else {
//     document.write("<p>" + pokemonList[i].name + pokemonList[i].height + "</p>");
//   }
// }

// function myLoopFunction(pokemon) {
//   console.log(pokemon.name + pokemon.type + pokemon.height);
// }
// pokemonList.forEach(myLoopFunction);



//function divide(dividend, divisor){
  //if(divisor === 0){
    //return "you're trying to divide by zero."}
    //else{
      //let result = dividend / divisor;
      //return result;
  //}
//}

//console.log(divide(4,2));
//console.log(divide(6,2));
//console.log(divide(7,0));


//  a function without a return statement
//function add(number1, number2) {
  //console.log(number1 + number2);
//}
//let result2 = add(1.2);
//console.log(result2)

// a function with a return statement
//function multiply(number1, number2) {
 // return number1 * number2;
//}
//let result = multiply(3,5);
//console.log(result);



//let dog = {
  //type: 'pug',
  //age: 3,
  //name: 'buster',
  //breed: function() {
    //console.log('wooof wooof! I am a ' + this.type);
  //}
//};

//dog.breed();
 /*used 'this' keyword*/

//  function getFullName(person){
//   return(person.firstName + person.lastName);
//  }

//  let character = {firstName: 'Joe', lastName: "Megyery"}
//  let fullName = getFullName(character);

//  console.log(fullName);
function largestInt(a,b){
  // Create a function that takes two integers and displays the largest one. 
  return Math.max(a, b);
}

// Write a function that will tell us is if we have monkey trouble based on two arguments. We are in trouble if both monkeys are smiling or if neither of them is smiling. Return true if we are in trouble, false if we are not.

function monkeyTrouble(monka,monkb){

// decided that no matter what is passed, if the values are the same, we are in trouble
  return monka === monkb ? true : false;

}

// Implement the function **stringsplosion** Given a string like "Code" return a string like "CCoCodCode"

function stringsplosion(s) {
  let arrayFromString = s.split('');
  let result = '';
  for (let i = 0; i < arrayFromString.length; i++) {
    result += arrayFromString.slice(0, i + 1).join('');

  }
  return result; 
}

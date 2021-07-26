function numRange(num) {
  // Write a function that prints whether a number is between 0 and 50 (inclusive), between 51 and 100 (inclusive), greater than 100, or less than 0.
  if (num < 0) console.log(`${num} is less than 0`);
  else if (num >= 0 && num <= 50) console.log(`${num} is between 0 and 50`);
  else if (num > 50 && num <= 100) console.log(`${num} is between 51 and 100`);
  else console.log(`${num} is greater than 100`)
}

function peopleWithAgeDrink(old) {
    // https://www.codewars.com/kata/56170e844da7c6f647000063/train/javascript
    if(old < 14){
      return "drink toddy";}
    else if(old < 18){
      return "drink coke";}
    else if(old < 21){
      return "drink beer";}
    else{
      return"drink whisky";
    }
};

// code study 7_26
//
//
// Priya will attend only if Ming goes.
// David loves popcorn and will go to the movies under any circumstance
// Alex will automatically go to the movies if David goes, and will automatically not go to the movies if David does not go
// Ming will not attend if David has already said he is attending and Ming will say yes if Priya says yes.
// Breanna loves to be around people and will only go if there are at least 2 others going
function movieNight(arr) {
  const names = {}
  let newArray = [];

  if (arr.includes('David')) {
    newArray.push('David', 'Alex');
    names['David'] = true;
    names['Alex'] = true;
    names['Ming'] = false;
  }
  if (!newArray.includes('David')) {
    newArray.push('Priya', 'Ming');
    names['Priya'] = true;
    names['Ming'] = true;
  }


newArray.length >= 2 ? newArray.push('Breanna') : names['Breanna'] = false;

return newArray;
}

// ['P', 'D', 'A'] = ['D', 'A', 'B']
// movieNight(['Priya', 'David', 'Alex']);
// ['P', 'D', 'M'] = ['D', 'A', 'B']
// movieNight(['Priya', 'David', 'Ming']);
// ['P', 'B', 'A'] = ['P', 'M', 'B']
// movieNight(['Priya', 'Breanna', 'Alex']);
// ['P', 'B', 'M'] = ['P', 'M', 'B']
// movieNight(['Priya', 'Breanna', 'Ming']);
// ['B', 'A', 'M'] = ['P', 'M', 'B']
// movieNight(['Breanna', 'Alex', 'Ming']);
// ['D', 'B', 'A'] = ['D', 'A', 'B']
// movieNight(['David', 'Breanna', 'Alex']);
// ['D', 'A', 'M'] = ['D', 'A', 'B']
// movieNight(['David', 'Alex', 'Ming']);
// ['A', 'M', 'P'] = ['P', 'M', 'B']
// movieNight(['Alex', 'Ming', 'Priya']);
// ['D', 'B', 'M'] = ['D', 'A', 'B']
// movieNight(['David', 'Breanna', 'Ming']);
// ['P', 'D', 'B'] = ['D', 'A', 'B']
//movieNight(['Priya', 'David', 'Breanna']);

// https://www.hackerrank.com/challenges/js10-if-else/problem
function getGrade(score) {
  if (score <= 5) return 'F';
  else if (score <= 10) return 'E';
  else if (score <= 15) return 'D';
  else if (score <= 20) return 'C';
  else if (score <= 25) return 'B';
  else return 'A';
}


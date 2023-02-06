const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const foods = JSON.parse(urlParams.get('foods'));
console.log(foods);

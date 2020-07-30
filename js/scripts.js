let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = null;
let countFavorites = null;

let totalPopulationList = null;
let totalPopulationFavorites = null;

let numberFormat = null;

window.addEventListener('load', () => {
  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  json.forEach(function (country) {
    let object = {
      name: country.name,
      flag: country.flag,
      population: country.population,
      id: country.numericCode,
    };
    allCountries.push(object);
  });

  render();
}

function render() {
  renderCountries();
  renderFavorites();
}

function createButton(arrayIn, arrayOut, id) {
  function switchGroup() {
    for (let index = 0; index < arrayOut.length; index++) {
      if (arrayOut[index].id == id) {
        arrayIn.push(arrayOut[index]);
        arrayOut.splice(index, 1);
      }
    }
    render();
  }

  let button = document.createElement('button');

  button.classList.add('waves-effect');
  button.classList.add('waves-light');
  button.classList.add('btn');

  button.addEventListener('click', switchGroup);

  return button;
}

function renderCountries() {
  let countPopulation = 0;

  countCountries = document.querySelector('#countCoutries');
  countCountries.textContent = allCountries.length;

  totalPopulationList = document.querySelector('#totalPopulationList');

  tabCountries = document.querySelector('#tabCountries');
  tabCountries.innerHTML = '';

  allCountries.sort((a, b) => a.name.localeCompare(b.name));

  allCountries.forEach((country) => {
    countPopulation += country.population;

    let divElement = document.createElement('div');
    let button = createButton(favoriteCountries, allCountries, country.id);
    let flag = document.createElement('img');
    let divData = document.createElement('div');
    let countryName = document.createElement('div');
    let countryPopulation = document.createElement('div');

    divElement.appendChild(button);
    divElement.appendChild(flag);
    divElement.appendChild(divData);
    divData.appendChild(countryName);
    divData.appendChild(countryPopulation);

    divElement.classList.add('divElement');

    button.textContent = '+';

    divData.classList.add('divData');
    flag.classList.add('flag');

    flag.src = country.flag;
    countryName.textContent = country.name;
    countryPopulation.textContent = country.population;

    tabCountries.appendChild(divElement);
  });

  totalPopulationList.textContent = countPopulation;
}

function renderFavorites() {
  let countFavoritePopulation = 0;

  countFavorites = document.querySelector('#countFavorites');
  countFavorites.textContent = favoriteCountries.length;

  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );

  tabFavorites = document.querySelector('#tabFavorites');
  tabFavorites.innerHTML = '';

  favoriteCountries.sort((a, b) => a.name.localeCompare(b.name));

  favoriteCountries.forEach((country) => {
    countFavoritePopulation += country.population;

    let divElement = document.createElement('div');
    let button = createButton(allCountries, favoriteCountries, country.id);
    let flag = document.createElement('img');
    let divData = document.createElement('div');
    let countryName = document.createElement('div');
    let countryPopulation = document.createElement('div');

    divElement.appendChild(button);
    divElement.appendChild(flag);
    divElement.appendChild(divData);
    divData.appendChild(countryName);
    divData.appendChild(countryPopulation);

    divElement.classList.add('divElement');

    button.textContent = '-';
    button.classList.add('removeButton');

    divData.classList.add('divData');
    flag.classList.add('flag');

    flag.src = country.flag;
    countryName.textContent = country.name;
    countryPopulation.textContent = country.population;

    tabFavorites.appendChild(divElement);
  });

  totalPopulationFavorites.textContent = countFavoritePopulation;
}

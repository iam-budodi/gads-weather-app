import {weatherApi, oneCallApi} from './dom-weather-parameter.js';

const openWeatherApis = [
  'https://api.openweathermap.org/data/2.5/weather',
  'https://api.openweathermap.org/data/2.5/onecall',
];
const apiKey = '61c0b8d025af6c4c2676b7c2bac4ade1';

export function onSuccess(position) {
  let icon = document.getElementById('icon');
  let byCitySearch = document.querySelector('#by-city');
  let getCity = document.getElementById('getCity');

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const urls =
    openWeatherApis[1] +
    '?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&appid=' +
    apiKey +
    '&units=metric';

  getCity.addEventListener('click', (event) => {
    event.preventDefault();
    let userCity = byCitySearch.value;
    let url =
      openWeatherApis[0] +
      '?q=' +
      userCity +
      '&appid=' +
      apiKey +
      '&units=metric';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        icon.setAttribute(
          'src',
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        weatherApi(data);
      });
  });

  (function instantWeather() {
    fetch(urls)
      .then((response) => response.json())
      .then((data) => {
        icon.setAttribute(
          'src',
          `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
        );
        oneCallApi(data);
      });
  })();
}

export function onFailure() {
  let locations = document.getElementsByClassName('location');

  for (let i = 0; i < locations.length; i++) {
    locations[i].innerHTML =
      'We are unable to retrieve your location, Kindly check your internet connection';
    break;
  }
}

let timestamp = document.getElementById('timestamp');
let temperature = document.getElementsByClassName('temperature');
let feels_like = document.getElementById('feels_like');
let description = document.getElementById('description');
let locations = document.getElementsByClassName('location');
let city = document.getElementById('city');
let country = document.getElementById('country');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let dewPoint = document.getElementById('dew-point');
let clouds = document.getElementById('clouds');
let index = document.getElementById('index');
let pressure = document.getElementById('pressure');
let visibility = document.getElementById('visibility');
let sunset = document.getElementById('sunset');


const ipInfoApi = 'https://ipinfo.io?token=7e99cfe9676057';


export function weatherApi(data) {
    const time = new Date(data.dt*1000)
    const sunrise = new Date(data.sys.sunrise*1000)
    const sunsets = new Date(data.sys.sunset*1000)

    city.innerHTML = data.name
    country.innerHTML = data.sys.country + ' | ' + '&degC'
    timestamp.innerHTML = `as of ${ time.toDateString() }, ${ time.toLocaleTimeString() }`
    feels_like.innerHTML = 'feels like ' + data.main.feels_like + '&deg';
    description.innerHTML = `${ data.weather[0].description }`
    wind.innerHTML = (data.wind.speed / 1000).toFixed(2) + 'Km/s'
    humidity.innerHTML = data.main.humidity + '%'
    //dewPoint.innerHTML = data.current.dew_point + '&deg'
    clouds.innerHTML = data.clouds.all + '%'
    pressure.innerHTML = data.main.pressure + 'mb'
    //index.innerHTML = data.current.uvi
    visibility.innerHTML = data.visibility / 1000 + 'Km'
    sunset.innerHTML = `sunrise at ${ sunrise.toLocaleTimeString() }, sets at ${ sunsets.toLocaleTimeString()}`

    for (let i = 0; i < locations.length; i++) {
        locations[i].innerHTML = `${ data.name }, ${ data.sys.country }  ( ${data.coord.lat + ', ' + data.coord.lon} )`
        
    }

    for (let i = 0; i < temperature.length; i++){
        temperature[i].innerHTML = data.main.temp + '&deg';
    }
  
}


export function oneCallApi(data) {
    citySummary();
    const time = new Date(data.current.dt*1000)
    const sunrise = new Date(data.current.sunrise*1000)
    const sunsets = new Date(data.current.sunset*1000)

    timestamp.innerHTML = `as of ${ time.toDateString() }, ${ time.toLocaleTimeString() }`
    feels_like.innerHTML = 'feels like ' + data.current.feels_like + '&deg';
    description.innerHTML = `${ data.current.weather[0].description }`
    wind.innerHTML = (data.current.wind_speed / 1000).toFixed(2) + 'Km/s'
    humidity.innerHTML = data.current.humidity + '%'
    dewPoint.innerHTML = data.current.dew_point + '&deg'
    clouds.innerHTML = data.current.clouds + '%'
    pressure.innerHTML = data.current.pressure + 'mb'
    index.innerHTML = data.current.uvi
    visibility.innerHTML = data.current.visibility / 1000 + 'Km'
    sunset.innerHTML = `sunrise at ${ sunrise.toLocaleTimeString() }, sets at ${ sunsets.toLocaleTimeString()}`


    for (let i = 0; i < temperature.length; i++){
        temperature[i].innerHTML = data.current.temp + '&deg';
    } 
      
  }


function citySummary() {
    fetch(ipInfoApi)
        .then((res) => res.json())
        .then((data) => {
            city.innerHTML = data.city
            country.innerHTML = data.country + ' | ' + '&degC'

            for (let i = 0; i < locations.length; i++) {
                locations[i].innerHTML = `${ data.city + ', ' +  data.country + ' (' + data.loc + ')' }`    
            } 
    })
}
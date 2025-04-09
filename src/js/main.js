import { modalInformation } from '../js/modal.js';

window.addEventListener('DOMContentLoaded', async function () {

  let province = document.querySelector('.container-search-selects-provis');
  let city = document.querySelector('.container-search-selects-city');
  let main = document.getElementsByTagName('body')[0]
  let loader = document.querySelector('.container-loader');
  loader.classList.add('hidden')
  const weekday = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

  const icons = {
    "rain": "../src/assets/img/raining.png",
    "clear-day": "../src/assets/img/sun.png",
    "cloudy": "../src/assets/img/cloudy.png",
    "partly-cloudy-day": "../src/assets/img/cloudy-day.png"
  };

  function meteo(data, selectedCityLabel) {
    let dataContainer = document.querySelector(".container-data");
    let div = document.createElement("div");
    let date = new Date()
    let day = weekday[date.getUTCDay()];
    const [thisDay] = data.days;
    const {icon, temp, precipprob} = thisDay;
    dataContainer.innerHTML = '';
    main.className = '';
    const img = icons[icon];
    const modal = modalInformation;
    const content = `<div class='container-data-time'>
      <span><strong>Tiempo para el dia ${day} en ${selectedCityLabel}</strong></span>
        <div class='container-data-time-information-icon'>
            <div class='container-data-time-information-icon-icon'>
              <img src=${img}>
            </div>
            <div class='container-data-time-information-icon-bar'></div>
            <div class='container-data-time-information-icon-information'>
              <p class='container-data-time-information-icon-information-temp'>${temp} ºC</p>
              <p class='container-data-time-information-icon-information-other'>${precipprob}%</p>
              <button id='more'>Más información</button>
            </div>
          </div>
      </div>`
    div.innerHTML = content;
    dataContainer.appendChild(div);
    loader.classList.remove('show');
    loader.classList.add('hidden');
    const button = document.getElementById('more');
    button.addEventListener('click', () => modal(thisDay, main, selectedCityLabel, data));
    main.classList.add(icon)
  };

  const provinces = async () => {
    try {
      const response = await fetch('../src/files/provincias.json');
      if (response.ok) {
        const data = await response.json();
        return data
      }
    } catch (e) {
      alert(e)
    }
  }

  const provincesData = async () => {
    try {
      const response = await provinces();
      if (response) {
        const data = await response;
        data.forEach(element => {
          let option = document.createElement('option');
          option.value = element.slug;
          option.textContent = element.name;
          province.appendChild(option);
        });
      }
    } catch (e) {
      alert(e)
    }
  }

  province.addEventListener('change', async function () {
    city.textContent = '';
    const data = await provinces();
    const selectedProvince = data.find(prov => prov.slug === province.value);
    const {poblaciones} = selectedProvince;
    const optionSelected = document.createElement('option');
    optionSelected.disabled = true;
    optionSelected.textContent = 'Selecciona una población';
    city.appendChild(optionSelected);
    Object.keys(poblaciones).forEach(cities => {
      const option = document.createElement('option');
      option.value = poblaciones[cities].slug;
      option.textContent = poblaciones[cities].name;
      city.appendChild(option);
    });
  });

  document.querySelector(".container-search-button").addEventListener('click', async function () {
    const selectedCity = city.value;
    const selectedProvince = province.value;
    if (selectedCity && selectedProvince) {
      try {
        const selectedCityLabel = city.options[city.selectedIndex].text;
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedCity}?unitGroup=metric&elements=datetime%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Cprecipprob%2Cprecipcover%2Cpreciptype%2Cwindspeed%2Ccloudcover%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&key=EWHVTY27Y4QF72GG5BD9R6EXE&contentType=json`);
        const data = await response.json();
        loader.classList.remove('hidden')
        loader.classList.add('show')
        setTimeout(() => {
          meteo(data, selectedCityLabel);
        }, 1000)
      } catch (e) {
        alert(e)  
      }
    } else {
      alert("Por favor, seleccione una provincia y población")
    }
  });

  provincesData()

});
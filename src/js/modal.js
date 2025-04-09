export const modalInformation = (thisDay, main, selectedCityLabel, data, loader) => {
  const modal = document.createElement('div');
  const {timezone} = data
  const {tempmax, tempmin, sunrise, sunset, moonphase} = thisDay
  const contentHTML = `
    <div class='modal'>
      <div class='modal-icon'>
        <i class='fa-solid fa-xmark' id='close'></i>
      </div>
      <div class='modal-content'>
        <h2>Mas información sobre el tiempo en ${selectedCityLabel}</h2>
        <p><b>Zona Horaria</b>: ${timezone} 🌎</p>
        <p><b>Temperatura máxima</b>: ${tempmax} 🌡️</p>
        <p><b>Temperatura mínima</b>: ${tempmin} 🌡️</p>
        <p><b>Amanecer</b>: ${sunrise} 🌅</p>
        <p><b>Atardecer</b>: ${sunset} 🌇</p>
        <p><b>Fase lunar</b>: ${moonphase === 0 || moonphase === 1 ? 'Luna nueva 🌑' : moonphase > 0 && moonphase < 0.25 ? 'Luna creciente 🌒' : moonphase === 0.25 ? 'Cuarto creciente 🌓' : moonphase > 0.25 && moonphase < 0.5 ? 'Gibosa creciente 🌔' : moonphase === 0.5 ? 'Luna llena 🌕' : moonphase > 0.5 && moonphase < 0.75 ? 'Gibosa menguante 🌖' : moonphase === 0.75 ? 'Cuarto menguante 🌗' : moonphase > 0.75 && moonphase < 1 ? 'Luna menguante 🌘' : ''}</p>
    </div>
  `;
  modal.classList.add('opacity');
  modal.innerHTML = contentHTML;
  main.appendChild(modal);

  document.getElementById('close').addEventListener('click', function () {
    modal.remove();
  });
}


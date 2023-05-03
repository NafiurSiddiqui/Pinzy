'use strict';
import '/tailwind.css';

class Pin {
  // del date and id if they are coming from DB
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
  }

  _setDescription() {
    // prettier-ignore
    //DEL the months and render from DB when BE is succesffully implemented
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

///////////////////////////////////////
// APPLICATION ARCHITECTURE
const inputPopUp = document.querySelector('.user-input-bg');
const pinContainer = document.querySelector('.user-pin-container');
const eventType = document.getElementById('eventType');
const message = document.getElementById('message');
const btnSubmit = document.querySelector('.btn-user-input');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #pins = [];

  constructor() {
    // Get user's position
    this._getPosition();

    //query for data

    // Get data from local storage
    // this._getLocalStorage();

    // Attach event handlers
    //move view to the related pin
    // pinContainer.addEventListener('click', this._moveToPopup.bind(this));
    //submit to db
    btnSubmit.addEventListener('click', this._submitToDb);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showInputPopUP.bind(this));

    this.#pins.forEach(pin => {
      this._renderWorkoutMarker(pin);
    });
  }

  _showInputPopUP(mapE) {
    this.#mapEvent = mapE;

    inputPopUp.classList.remove('hidden');
    eventType.focus();
  }

  _submitToDb(e) {
    e.preventDefault();
    const event = eventType.value;
    const text = message?.value;
  }

  _newPin(e) {
    e.preventDefault();

    // Get data from form
    // const type = inputType.value;

    const { lat, lng } = this.#mapEvent.latlng;

    console.log(lat, lng);

    let pin;

    // // If pin running, create running object
    // if (type === 'alert') {
    //   pin = new Alert([lat, lng]);
    // }

    // If pin cycling, create cycling object
    // if (type === 'event') {
    //   pin = new Event([lat, lng], distance, duration, elevation);
    // }

    // Add new object to pin array
    // this.#pins.push(pin);

    // // Render pin on map as marker
    // this._renderPinMarker(pin);

    // // Render pin on the list
    // this._renderPin(pin);

    // // Hide form + clear input fields
    // this._hideForm();

    // // Set local storage to all pins
    // this._setLocalStorage();
  }

  _renderPinMarker(pin) {
    L.marker(pin.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${pin.type}-popup`,
        })
      )
      .setPopupContent(` ${pin.description}`)
      .openPopup();
  }

  _renderPin(pin) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${pin.id}">
        <h2 class="workout__title">${pin.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            pin.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
        </div>
    `;

    pinContainer.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
    if (!this.#map) return;

    const pinEl = e.target.closest('.user-pin');

    if (!pinEl) return;

    const pin = this.#pins.find(work => work.id === pinEl.dataset.id);

    this.#map.setView(pin.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // pin.click();
  }

  _setLocalStorage() {
    localStorage.setItem('pins', JSON.stringify(this.#pins));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('pins'));

    if (!data) return;

    this.#pins = data;

    this.#pins.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('pins');
    location.reload();
  }
}

const app = new App();

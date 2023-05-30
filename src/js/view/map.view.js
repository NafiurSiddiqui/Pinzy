import { helper } from '../helper.js';
import Pin from './pin.view.js';

export default class Map extends Pin {
  mapInitiated = false;
  map;
  mapZoomLevel = 13;
  mapEvent;
  coords;
  showform;
  guestPins = [];
  userPins = [];
  globalPins = [];
  userType;

  constructor(guestPins, userPins, globalPins, showForm, renderSpinner) {
    super();

    this.guestPins = guestPins;
    this.userPins = userPins;
    this.globalPins = globalPins;
    this.showForm = showForm;
    this.renderSpinner = renderSpinner;
    this.loadMap = this.loadMap.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.renderPinOnMap = this.renderPinOnMap.bind(this);
    this.userType = helper.checkUserLoggedIn() === true ? 'user' : 'guest';
  }

  //load the map - V

  getPosition(callback) {
    if (navigator.geolocation) {
      const mapToThis = this.loadMap.bind(this);
      navigator.geolocation.getCurrentPosition(
        position => {
          const map = mapToThis(position);
          callback(map); // Invoke the callback with the map instance
        },
        function () {
          alert('Please allow locating your position.');
          callback(null); // Invoke the callback with null if there's an error
        }
      );
    } else {
      callback(null); // Invoke the callback with null if geolocation is not supported
    }
  }

  loadMap(position) {
    this.mapInitiated = false;
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.coords = coords;
    // this.map = L.map('map').setView(coords, this.mapZoomLevel);
    const map = L.map('map').setView(coords, this.mapZoomLevel);
    this.map = map;
    if (this.map) {
      this.mapInitiated = true;
      this.renderSpinner();
    }

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Handling clicks on map
    this.map.on('click', this.showForm.bind(this));

    //check the user logger

    if (this.userType === 'guest') {
      this.handlePinRenderer(this.guestPins, 'guest', this.guestPinContainer);
    } else {
      this.handlePinRenderer(this.userPins, 'user', this.userPinContainer);
    }

    //render global marker

    return map;
  }

  //move to pop up -V
  moveToPopup(e) {
    if (!this.map) return;
    const pinEl = e.target.closest('.user-pin');

    if (!pinEl) return;

    //convert ID to number since data-id is string
    const pin = this.guestPins.find(pin => pin.id === +pinEl.dataset.id);

    this.map.setView(pin.coords, this.mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

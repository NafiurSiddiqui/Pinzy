import { helper } from '../helper.js';
import Pin from './pin.view.js';

// extends Pin
export default class Map extends Pin {
  mapInitiated = false;
  map;
  mapZoomLevel = 13;
  mapEvent;
  coords;
  showForm;
  guestPins = [];
  userPins = [];
  globalPins = [];
  userType;
  formEditor;

  constructor(
    guestPins,
    userPins,
    globalPins,
    showForm,
    renderSpinner,
    formEditor
  ) {
    super();

    this.guestPins = guestPins;
    this.userPins = userPins;
    this.globalPins = globalPins;
    this.formEditor = formEditor;
    this.showForm = showForm;
    this.renderSpinner = renderSpinner;
    this.loadMap = this.loadMap.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.renderPinOnMap = this.renderPinOnMap.bind(this);
    this.userType = helper.checkUserLoggedIn() === true ? 'user' : 'guest';
    this.moveToPopup = this.moveToPopup.bind(this);
    this.isGlobalPinPage
      ? this.globalPinContainer?.addEventListener('click', this.moveToPopup)
      : this.userType === 'user'
      ? this.userPinContainer?.addEventListener('click', this.moveToPopup)
      : this.guestPinContainer?.addEventListener('click', this.moveToPopup);
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
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.coords = coords;
    const map = L.map('map').setView(coords, this.mapZoomLevel);
    this.map = map;

    if (this.map) {
      this.mapInitiated = true;
      this.renderSpinner(false);
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
    if (this.isGlobalPinPage) {
      this.handleGlobalPinRenderer();
    }
    return map;
  }

  //move to pop up -V
  moveToPopup(e) {
    if (!this.map) return;

    const pinEl = e.target.closest('.user-pin');

    if (!pinEl) return;

    // const coords = [this.userPins.pin_lat, this.userPins.pin_lng];

    let pin = null;
    let globalPin = null;

    //check the user type
    if (this.isGlobalPinPage) {
      // pin = this.findPinId(this.globalPins, pinEl);
      globalPin = this.findPinId(this.globalPins, pinEl);
    } else {
      pin =
        this.userType === 'user'
          ? this.findPinId(this.userPins, pinEl)
          : this.findPinId(this.guestPins, pinEl);
    }

    let coords = this.isGlobalPinPage
      ? [globalPin.pin_lat, globalPin.pin_lng]
      : [pin.pin_lat, pin.pin_lng];

    this.map.setView(coords, this.mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  //helper DRY
  findPinId(pins, pinEl) {
    return pins.find(pin => pin.id === +pinEl.dataset.id);
  }
}

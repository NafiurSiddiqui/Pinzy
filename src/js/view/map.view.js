import Pin from './pin.view.js';

export default class Map extends Pin {
  mapInitiated = false;
  map;
  mapZoomLevel = 13;
  mapEvent;
  coords;
  showform;
  guestPins;
  constructor(guestPins, showForm, renderSpinner) {
    super();

    this.guestPins = guestPins;
    this.showForm = showForm;
    this.renderSpinner = renderSpinner;
    this.loadMap = this.loadMap.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.renderPinOnMap = this.renderPinOnMap.bind(this);
    // this.newMapEvHandler = this.newMapEvHandler.bind(this);
    console.log(this.guestPins);
  }

  //get position - C
  // getPosition() {
  //   let map;
  //   if (navigator.geolocation) {
  //     const mapToThis = this.loadMap.bind(this);
  //     navigator.geolocation.getCurrentPosition(mapToThis, function () {
  //       alert('Please allow to locate your position.');
  //     });

  //     map = mapToThis;
  //   }

  //   return map;
  // }

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

    //!need to detect the userType or pageType later before renering pins
    //render marker for guest
    this.guestPins.forEach(pin => {
      //render pin on map
      this.renderPinOnMap(pin);
      //render pin on profile
      this.renderPinOnProfile(this.guestPins, pin, this.guestPinContainer);
    });

    //render marker for user

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

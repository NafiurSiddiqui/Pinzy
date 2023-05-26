export default class Map {
  mapInitiated = false;
  map;
  mapZoomLevel = 13;
  mapEvent;
  showform;
  pins;
  constructor(pins, showForm, renderSpinner) {
    this.pins = pins;
    this.showForm = showForm;
    this.renderSpinner = renderSpinner;
    this.loadMap = this.loadMap.bind(this);
    this.getPosition = this.getPosition.bind(this);
    // this.newMapEvHandler = this.newMapEvHandler.bind(this);
  }

  //get position - C
  getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.loadMap.bind(this),
        function () {
          alert('Please allow to locate your position.');
        }
      );
  }

  //load the map - V
  loadMap(position) {
    this.mapInitiated = false;
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.map = L.map('map').setView(coords, this.mapZoomLevel);

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
    //render marker
    // this.pins.forEach(pin => {
    //   this.renderPinMarker(pin);
    // });
  }

  // newMapEvHandler(mapEvent) {
  //   this.mapEvent = mapEvent;

  // }

  //move to pop up -V
  moveToPopup(e) {
    if (!this.map) return;
    const pinEl = e.target.closest('.user-pin');

    if (!pinEl) return;

    //convert ID to number since data-id is string
    const pin = this.pins.find(pin => pin.id === +pinEl.dataset.id);

    this.map.setView(pin.coords, this.mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

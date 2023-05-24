export default class Map {
  mapInitiated = false;
  map;
  mapZoomLevel = 13;
  mapEvent;
  spinner = document.querySelector('.spinner');

  constructor(pins, showForm) {
    this.pins = pins;
    this.showInputPopUP = showForm;
  }

  //get position
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.loadMap.bind(this),
        function () {
          alert('Please allow to locate your position.');
        }
      );
  }

  //load the map
  loadMap(position) {
    this.mapInitiated = false;
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.map = L.map('map').setView(coords, this.mapZoomLevel);

    if (this.map) {
      this.mapInitiated = true;
      spinner.classList.add('hidden');
      spinner.classList.remove('spin');
      spinner.classList.remove('z-20');
    }

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Handling clicks on map
    this.map.on('click', this.showForm.bind(this));

    //render marker
    this.pins.forEach(pin => {
      this._renderPinMarker(pin);
    });
  }

  //renderPinMarker
  _renderPinMarker(values) {
    L.marker(values.coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${values.event}-popup`,
        })
      )
      .setPopupContent(` ${values.message}`)
      .openPopup();
  }

  //move to pop up
  _moveToPopup(e) {
    if (!this.map) return;
    const pinEl = e.target.closest('.user-pin');

    if (!pinEl) return;

    //convert ID to number since data-id is string
    const pin = this.#pins.find(pin => pin.id === +pinEl.dataset.id);

    this.#map.setView(pin.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

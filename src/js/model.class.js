class Model {
  pins = [];

  constructor(mapEvent) {
    this.eventTypeEl = document.getElementById('eventType');
    this.messageEl = document.getElementById('message');
    this.mapEvent = mapEvent;
  }

  //submit form
  submitToDb(pins) {
    //DID not prevent default refresh, since without refresh the content editor does not work.

    //get the values
    const event = eventTypeEl.value;
    const message = messageEl.value;

    const eventTypeIcon =
      eventTypeEl.options[eventTypeEl.selectedIndex].dataset.icon;
    const eventTypeColor =
      eventTypeEl.options[eventTypeEl.selectedIndex].dataset.color;
    const { lat, lng } = this.#mapEvent.latlng;

    //sanitize input
    const sanitizedTextAreaValue = message.trim().replace(/<[^>]*>/g, '');

    //values would be different if user
    /**
     * id: user? from Db : generateId
     */
    const values = {
      event,
      id: Math.floor(Math.random() * 100) + 1,
      icon: eventTypeIcon,
      color: eventTypeColor,
      message: sanitizedTextAreaValue,
      coords: [lat, lng],
    };

    //check the usertype
    // this.userType === 'user'? //send to connectToDb(user):connectToDb(guest);

    // Add new object to pin array
    pins.push(values);

    //set to local storage
    this._setLocalStorage();

    // Render pin on map as marker
    this._renderPinMarker(values);

    // Render pin on the list
    this._renderPin(values);
    //clear inputs
    eventTypeEl.value = messageEl.value = '';
    //render pin count
    this._renderPinCount();

    //hideInput
    this._hideInput();
  }
}

type mapEvent {
  lat:string,
  lng:string,
}

class Model {
  pins: [] = [];
  eventTypeEl;
  messageEl;
  mapEvent;

  constructor(mapEvent: object) {
    this.eventTypeEl = document.getElementById('eventType') as HTMLSelectElement;
    this.messageEl = document.getElementById('message') as HTMLInputElement;
    this.mapEvent = mapEvent;
  }

  //submit form
  submitToDb() {
    //DID not prevent default refresh, since without refresh the content editor does not work.

    //get the values
    const event = this.eventTypeEl.value;
    const message = this.messageEl.value;

    const eventTypeIcon =
      this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.icon;
    const eventTypeColor =
      this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.color;
    const { lat, lng } = this.mapEvent.latlng;

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
    this.eventTypeEl.value = messageEl.value = '';
    //render pin count
    this._renderPinCount();

    //hideInput
    this._hideInput();
  }
}

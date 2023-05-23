class Form {
  #mapEvent;

  constructor() {
    this.formBg = document.querySelector('.user-input-bg');
    this.form = document.querySelector('.user-input-form');
    this.btnSubmit = document.querySelector('.btn-user-input');
    this.eventTypeEl = document.getElementById('eventType');
    this.messageEl = document.getElementById('message');
  }

  //show Form
  showForm(mapE) {
    this.#mapEvent = mapE;

    this.formBg.classList.remove('hidden');
    if (!this.btnSubmit.hasAttribute('disabled')) {
      this.btnSubmit.setAttribute('disabled', '');
    }
  }
  //hide form
  hideForm() {
    this.formBg.addEventListener('click', event => {
      // Check if the clicked element is the user-input form or not

      if (!this.form.contains(event.target)) {
        // Close the user-input
        this.formBg.classList.add('hidden');
      }
    });
  }

  //   //submit form
  //   submitToDb(pins) {
  //     //DID not prevent default refresh, since without refresh the content editor does not work.

  //     //get the values
  //     const event = eventTypeEl.value;
  //     const message = messageEl.value;

  //     const eventTypeIcon =
  //       eventTypeEl.options[eventTypeEl.selectedIndex].dataset.icon;
  //     const eventTypeColor =
  //       eventTypeEl.options[eventTypeEl.selectedIndex].dataset.color;
  //     const { lat, lng } = this.#mapEvent.latlng;
  //     //sanitize input
  //     const sanitizedTextAreaValue = message.trim().replace(/<[^>]*>/g, '');

  //     const values = {
  //       event,
  //       id: Math.floor(Math.random() * 100) + 1,
  //       icon: eventTypeIcon,
  //       color: eventTypeColor,
  //       message: sanitizedTextAreaValue,
  //       coords: [lat, lng],
  //     };

  //     //check the usertype
  //     // this.userType === 'user'? //send to connectToDb(user):connectToDb(guest);

  //     // Add new object to pin array
  //     pins.push(values);

  //     //set to local storage
  //     this._setLocalStorage();

  //     // Render pin on map as marker
  //     this._renderPinMarker(values);

  //     // Render pin on the list
  //     this._renderPin(values);
  //     //clear inputs
  //     eventTypeEl.value = messageEl.value = '';
  //     //render pin count
  //     this._renderPinCount();

  //     //hideInput
  //     this._hideInput();
  //   }
}

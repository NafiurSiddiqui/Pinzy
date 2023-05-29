class GuestEdit extends FormEditorView {
  #pinEdited = false;

  constructor() {
    super();
    //need individual elements
    // this.eventTypeEl = eventTypeEl;
    // this.messageEl = messageEl;
    // this.btnSubmitEdit = btnSubmitEdit;
    //Bind listeners to the formEditor Els
    this.eventTypeEl?.addEventListener('input', this.debounceValidation());
    this.messageEl?.addEventListener('input', this.debounceValidation());
    this.eventTypeEl.addEventListener('change', this.getEventIcon.bind(this));
    //methods
    this.selectedEventIcon = this.getEventIcon();
    this.formEditUiHandler();
  }

  getEventIcon() {
    let selectedEventIcon =
      this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.icon;
    this.selectedEventIcon = selectedEventIcon;

    return selectedEventIcon;
  }

  editMessage(id) {
    //get the items from localStorage
    const data = JSON.parse(localStorage.getItem(`guest`));

    const item = data.find(item => item.id === +id);

    //popup edit-input-form
    this._showEditForm();

    //autoselect eventType and fill up the text area
    eventTypeEl.value = item.event;
    messageEl.value = item.message;

    //get the newInput
    btnSubmitEdit?.addEventListener('click', e => {
      e.preventDefault();
      //get the newInput
      event = eventTypeEl.value;
      message = messageEl.value;
      //if event or message value changes
      if (event !== item.event || message !== item.message) {
        this.#pinEdited = true;
      }

      //create a new object
      const newItem = {
        ...item,
        event: event,
        icon: this.selectedEventIcon || item.icon,
        message: message,
      };
      //update localStorage
      localStorage.setItem(
        `guest`,
        JSON.stringify(data.map(item => (item.id === +id ? newItem : item)))
      );

      // Update the corresponding event icon on the pin
      const listItemSelector = `li[data-id="${id}"]`; // Selector for the specific <li> element
      const listItem = document.querySelector(listItemSelector); // Get the specific <li> element
      if (listItem) {
        const eventIconEl = listItem.querySelector(
          '.pin-card-header_event-icon'
        );
        // Find the event icon element within the <li> element
        if (eventIconEl) {
          eventIconEl.textContent = this.selectedEventIcon;
        }
      }
      //clear inputs
      eventTypeEl.value = messageEl.value = '';

      //hideInput
      this._hideEditForm();

      //refresh in a sec to make sure the UI updates
      this.watchForPinChanges();
    });
  }

  watchForPinChanges() {
    //see if pinEdited
    if (this.#pinEdited) {
      console.log('pin changed');
      //roll out timer and refresh the content
      setTimeout(() => {
        app.refreshContent();
      }, 100);

      //set edited to false
      this.#pinEdited = false;
    } else {
      //refresh anyway otherwise if submitted, page does not refresh
      setTimeout(() => {
        app.refreshContent();
      }, 100);
    }
  }

  deletePin(id) {
    //get the item from localStorage
    const data = JSON.parse(localStorage.getItem('guest'));
    //filter the item
    const filteredData = data.filter(item => item.id !== +id);

    // update localStorage
    localStorage.setItem('guest', JSON.stringify(filteredData));
    //refresh window to update the pins
    location.reload();
    // app.refreshContent();
  }

  deleteAllPin() {
    //get the item from localStorage
    const data = JSON.parse(localStorage.getItem('guest'));
    //delete all from local storage
    localStorage.removeItem('guest');
    //refresh window to update the pins
    location.reload();
    // app.refreshContent();
  }

  editBoxHandler() {
    const editBoxes = document.querySelectorAll('.pin-edit-box');

    editBoxes.forEach(editBox => {
      //get the parent on click
      const pin = editBox.closest('.user-pin');
      //get the id
      const pinId = pin.dataset.id;
      //assign the parent id to this of pin
      editBox.dataset.id = pinId;
      //listen to the editBox
      editBox.addEventListener('click', e => {
        const li = e.target.tagName === 'LI';
        const id = editBox.dataset.id;

        const action = e.target.textContent.trim();
        const isGuest = this.detectUserType() === 'guest';

        if (li) {
          // const li = e.target;
          const cardId = editBox.dataset.id;

          //without trim, spaces prevents from a match
          if (action === 'edit') {
            if (isGuest) {
              this.editMessage(cardId);
            }
          }

          if (action === 'delete') {
            createModal({
              title: 'Delete Pin',
              message: 'Are you sure you want to delete this pin?',
              confirmText: 'Delete',
              cancelText: 'Cancel',
            }).then(res => {
              if (res) {
                if (isGuest) {
                  this.deletePin(id);
                }
              } else {
                return;
              }
            });
          }

          if (action === 'delete all') {
            createModal({
              title: 'Delete All Pins',
              message: 'Are you sure you want to delete all your pins?',
              confirmText: 'Delete',
              cancelText: 'Cancel',
            }).then(res => {
              if (res) {
                if (isGuest) {
                  this.deleteAllPin();
                }
              } else {
                return;
              }
            });
          }
        }
      });
    });
  }
}

const guestEdit = new GuestEdit(eventTypeEl, messageEl, btnSubmitEdit);

export { guestEdit };

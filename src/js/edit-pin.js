import createModal from './modal.js';
import app from './app.js';

//perform the corresponding operation
const editForm = document.querySelector('.user-input-bg__edit');
const eventTypeEl = document.getElementById('eventType__edit');
const messageEl = document.getElementById('message__edit');
let event = eventTypeEl?.value;
let message = messageEl?.value;

const btnSubmitEdit = document.querySelector('.btn-user-input__edit');
const userInputBgEdit = document.querySelector('.user-input-bg__edit');
const userInputFormEdit = document.querySelector('.user-input-form__edit');

// ---------- CLASSES

// class FormValidator {
//   formEditIsopen = false;

//   constructor(eventTypeEl, messageEl) {
//     this.eventTypeEl = eventTypeEl;
//     this.messageEl = messageEl;
//     this.btnSubmitEdit = btnSubmitEdit;
//     this.debounceValidation = this.debounceValidation.bind(this);
//   }

//   showEditForm() {
//     this.setFormEditIsOpen(true);
//     editForm.classList.remove('hidden');
//     this.btnSubmitEdit?.removeAttribute('disabled');
//   }

//   hideEditForm() {
//     this.setFormEditIsOpen(false);
//     editForm.classList.add('hidden');
//   }

//   //USER INPUT EDIT POPUP
//   formEditUiHandler() {
//     userInputBgEdit?.addEventListener('click', event => {
//       // Check if the clicked element is the user-input form or not

//       if (!userInputFormEdit?.contains(event.target)) {
//         this.setFormEditIsOpen(false);
//         // Close the user-input
//         userInputBgEdit?.classList.add('hidden');
//       }
//     });
//   }

//   setFormEditIsOpen(value) {
//     this.formEditIsopen = value;
//   }

//   validateEventType() {
//     const event = this.eventTypeEl.value;

//     if (event === 'none') {
//       this.eventTypeEl.classList.add('validation-error');
//     } else {
//       this.eventTypeEl.classList.remove('validation-error');
//     }
//   }

//   validateMessage() {
//     const text = this.messageEl.value;

//     if (text === '') {
//       this.messageEl.classList.add('validation-error');
//       // this.btnSubmitEdit?.setAttribute('disabled', true);
//     } else {
//       this.messageEl.classList.remove('validation-error');
//       // this.btnSubmitEdit?.removeAttribute('disabled');
//     }
//   }

//   validateInput() {
//     this.validateEventType();
//     this.validateMessage();

//     const event = this.eventTypeEl?.value;
//     const text = this.messageEl?.value;

//     if ((event === 'none' && text === '') || event === 'none' || text === '') {
//       this.btnSubmitEdit?.setAttribute('disabled', 'disabled');
//     } else {
//       this.btnSubmitEdit?.removeAttribute('disabled');
//     }
//   }

//   debounceValidation() {
//     let timer;

//     const validateInput = this.validateInput.bind(this);

//     return function () {
//       clearTimeout(timer);

//       timer = setTimeout(() => {
//         validateInput();
//       }, 1000);
//     };
//   }

//   detectUserType() {
//     return app.userType;
//   }
// }

class GuestEdit extends FormValidator {
  #pinEdited = false;

  constructor() {
    super(event, messageEl);
    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.btnSubmitEdit = btnSubmitEdit;
    this.selectedEventIcon = this.getEventIcon();
    this.eventTypeEl?.addEventListener('input', this.debounceValidation());
    this.messageEl?.addEventListener('input', this.debounceValidation());
    this.eventTypeEl.addEventListener('change', this.getEventIcon.bind(this));

    this.formEditUiHandler();
  }

  getEventIcon() {
    let selectedEventIcon =
      this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.icon;
    this.selectedEventIcon = selectedEventIcon;

    return selectedEventIcon;
  }
  _editMessage(id) {
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
              this._editMessage(cardId);
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

//USER CLASS
class UserEdit extends FormValidator {
  #pinEdited = false;

  constructor() {
    super(eventTypeEl, messageEl);
    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.selectedEventIcon = this.getEventIcon();
    this.btnSubmitEdit = btnSubmitEdit;
    this.eventTypeEl?.addEventListener('input', this.debounceValidation());
    this.messageEl?.addEventListener('input', this.debounceValidation());
    this.eventTypeEl.addEventListener('change', this.getEventIcon.bind(this));
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
    const data = JSON.parse(localStorage.getItem(`user`));

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
      // Update the corresponding event icon element
      // Selector for the specific <li> element
      const listItemSelector = `li[data-id="${id}"]`;
      // Get the specific <li> element
      const listItem = document.querySelector(listItemSelector);
      if (listItem) {
        const eventIconEl = listItem.querySelector(
          '.pin-card-header_event-icon'
        );
        // Find the event icon element within the <li> element
        if (eventIconEl) {
          eventIconEl.textContent = this.selectedEventIcon;
        }
      }

      //update localStorage
      localStorage.setItem(
        `user`,
        JSON.stringify(data.map(item => (item.id === +id ? newItem : item)))
      );
      //clear inputs
      eventTypeEl.value = messageEl.value = '';

      //hideInput
      this._hideEditForm();

      //refresh window to update the pins
      this.watchForPinChanges();
    });
  }

  watchForPinChanges() {
    //see if pinEdited
    if (this.#pinEdited) {
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
    const data = JSON.parse(localStorage.getItem('user'));
    //filter the item
    const filteredData = data.filter(item => item.id !== +id);

    // update localStorage
    localStorage.setItem('user', JSON.stringify(filteredData));
    //refresh window to update the pins
    location.reload();
    // app.refreshContent();
  }

  deleteAllPin() {
    //get the item from localStorage
    const data = JSON.parse(localStorage.getItem('user'));
    //delete all from local storage
    localStorage.removeItem('user');
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

        if (li) {
          const cardId = editBox.dataset.id;
          //without trim, spaces prevents from a match
          if (action === 'edit') {
            this.editMessage(cardId);
          }

          if (action === 'delete') {
            createModal({
              title: 'Delete Pin',
              message: 'Are you sure you want to delete this pin?',
              confirmText: 'Delete',
              cancelText: 'Cancel',
            }).then(res => {
              if (res) {
                this.deletePin(id);
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
                this.deleteAllPin();
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

let isGuest = window.location.pathname.includes('guest');

//to prevent blocking of execution if guest.

function generateUserInstance() {
  if (isGuest) {
    return;
  } else {
    const userEdit = new UserEdit(eventTypeEl, messageEl);

    return userEdit;
  }
}

const userEdit = generateUserInstance();

export { userEdit };

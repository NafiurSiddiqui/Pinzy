import app from './app.js';
import createModal from './modal.js';

//dertermine the user
const isGuest = app?.userType === 'guest';

//guest op and signed user should have diff operations.

//which btn is clicked?

const editBoxes = document.querySelectorAll('.pin-edit-box');

editBoxes?.forEach(editBox => {
  const card = editBox?.closest('.user-pin');
  const id = card.dataset.id;
  editBox.dataset.id = id;

  editBox.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      const li = e.target;
      const cardId = editBox.dataset.id;

      //without trim, spaces prevents from a match
      if (li.textContent.trim() === 'edit') {
        if (isGuest) {
          guestEdit.editMessage(cardId);
        }
      }

      if (li.textContent.trim() === 'delete') {
        console.log('delete');
        if (isGuest) {
          guestEdit.deletePin(cardId);
        }
      }

      if (li.textContent.trim() === 'delete all') {
        console.log('delete All');
        createModal({
          title: 'Delete All Pins',
          message: 'Are you sure you want to delete all your pins?',
          confirmText: 'Delete',
          cancelText: 'Cancel',
        }).then(res => {
          if (res) {
            if (isGuest) {
              guestEdit.deleteAllPin();
            }
          } else {
            return;
          }
        });

        // if (confirm) {
        //   if (isGuest) {
        //     guestEdit.deleteAllPin();
        //   }
        // }
      }
    }
  });
});

//perform the corresponding operation
const editForm = document.querySelector('.user-input-bg__edit');

const eventTypeEl = document.getElementById('eventType__edit');
const messageEl = document.getElementById('message__edit');
let event = eventTypeEl.value;
let message = messageEl.value;
const eventTypeIcon =
  eventTypeEl.options[eventTypeEl.selectedIndex].dataset.icon;
const eventTypeColor =
  eventTypeEl.options[eventTypeEl.selectedIndex].dataset.color;

const btnSubmitEdit = document.querySelector('.btn-user-input__edit');

class FormValidator {
  constructor(eventTypeEl, messageEl, btnSubmitEdit) {
    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.btnSubmitEdit = btnSubmitEdit;

    // Add event listeners for input events on the form fields
    this.eventTypeEl?.addEventListener('input', this.validateInput?.bind(this));
    this.messageEl?.addEventListener('input', this.validateInput.bind(this));
  }

  validateEventType() {
    const event = this.eventTypeEl.value;

    if (event === 'none') {
      this.eventTypeEl.classList.add('validation-error');
    } else {
      this.eventTypeEl.classList.remove('validation-error');
    }
  }

  validateMessage() {
    const text = this.messageEl.value;

    if (text === '') {
      this.messageEl.classList.add('validation-error');
    } else {
      this.messageEl.classList.remove('validation-error');
    }
  }

  validateInput() {
    this.validateEventType();
    this.validateMessage();

    const event = this.eventTypeEl.value;
    const text = this.messageEl.value;

    if (event !== 'none' && text !== '') {
      this.btnSubmitEdit.removeAttribute('disabled');
    } else {
      this.btnSubmitEdit.setAttribute('disabled', true);
    }
  }
}

class GuestEdit extends FormValidator {
  constructor() {
    super();

    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.btnSubmitEdit = btnSubmitEdit;
    this.eventTypeEl.addEventListener('input', this.validateInput.bind(this));
    this.messageEl.addEventListener('input', this.validateInput.bind(this));
  }

  _editMessage(id) {
    //get the items from localStorage
    const data = JSON.parse(localStorage.getItem(`guest`));

    const item = data.find(item => item.id === +id);
    console.log(item.event);
    console.log(item.message);

    let newMsg = '';
    let newEventType = '';
    let prevEventType = item.event;
    let prevMsg = item.message;
    //popup edit-input-form
    this._showEditForm();

    //autoselect eventType and fill up the text area
    eventTypeEl.value = item.event;
    messageEl.value = item.message;
    //get the newInput
    btnSubmitEdit.addEventListener('click', e => {
      e.preventDefault();

      //get the newInput
      event = eventTypeEl.value;
      message = messageEl.value;
      console.log(event, message);
      //create a new object
      const newItem = {
        ...item,
        event: event,
        message: message,
      };
      //update localStorage
      localStorage.setItem(
        `guest`,
        JSON.stringify(data.map(item => (item.id === +id ? newItem : item)))
      );
      //clear inputs
      eventTypeEl.value = messageEl.value = '';

      //hideInput
      this._hideEditForm();

      //refresh window to update the pins
      location.reload();
      //how do I keep the scroll point to the same point after window refresh?
    });
  }

  _showEditForm() {
    editForm.classList.remove('hidden');
  }

  _hideEditForm() {
    editForm.classList.add('hidden');
  }
  deletePin(id) {
    //get the item from localStorage
    const data = JSON.parse(localStorage.getItem('guest'));
    //filter the item
    const filteredData = data.filter(item => item.id !== +id);
    console.log(data.filter(item => item.id !== +id));
    // update localStorage
    localStorage.setItem('guest', JSON.stringify(filteredData));
    //refresh window to update the pins
    location.reload();
  }

  deleteAllPin() {
    //alert user
    // alert('Are you sure you want to delete all pins?');

    //get the item from localStorage
    const data = JSON.parse(localStorage.getItem('guest'));
    //delete all from local storage
    localStorage.removeItem('guest');
    //refresh window to update the pins
    location.reload();
  }
}

const guestEdit = new GuestEdit();

export default guestEdit;

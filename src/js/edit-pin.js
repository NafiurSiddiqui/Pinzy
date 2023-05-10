import app from './app.js';

const btnEditPin = document.querySelector('.fa-ellipsis');
const editBox = document.querySelector('.pin-edit-box');
// console.log(editBox);

//dertermine the user
const isGuest = app?.userType === 'guest';

//guest op and signed user should have diff operations.

//which btn is clicked?
editBox.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    const li = e.target;
    const id = li.closest('.user-pin').dataset.id;

    //without trim, spaces prevents from match
    if (li.textContent.trim() === 'edit') {
      if (isGuest) {
        guestEdit.editMessage(id);
      }
    }
  }
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

class GuestEdit {
  editMessage(id) {
    //get the id of the target
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
    this.showEditForm();

    //autoselect eventType and fill up the text area
    eventTypeEl.value = item.event;
    messageEl.value = item.message;
    //get the newInput
    btnSubmitEdit.addEventListener('click', () => {});
    //render pin
  }

  showEditForm() {
    editForm.classList.remove('hidden');
  }

  hideEditForm() {
    editForm.classList.add('hidden');
  }
}

const guestEdit = new GuestEdit();

export default guestEdit;

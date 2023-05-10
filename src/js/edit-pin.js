import app from './app.js';

const btnEditPin = document.querySelector('.fa-ellipsis');
const editBox = document.querySelector('.pin-edit-box');

//dertermine the user
const isGuest = app.userType === 'guest';

//guest op and signed user should have diff operations.

//which btn is clicked?
editBox?.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    const li = e.target;
    const id = li.closest('.user-pin').dataset.id;

    //withotu trim, spaces prevents from match
    if (li.textContent.trim() === 'edit') {
      if (isGuest) {
        guestEdit.editMessage(id);
      }
    }
  }
});
//perform the corresponding operation

class GuestEdit {
  editMessage(id) {
    //get the id of the target
    //get the items from localStorage
    const data = JSON.parse(localStorage.getItem(`guest`));

    const item = data.find(item => item.id === id);

    let newMsg = '';
    let newEventType = '';

    //popup inputform
    app.showInputPopUP();
    //autoselect eventType and fill up the text area
    //get the newInput
    //render pin
  }
}

const guestEdit = new GuestEdit();

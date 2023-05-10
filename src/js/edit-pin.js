import app from './app.js';

const btnEditPin = document.querySelector('.fa-ellipsis');
const editBox = document.querySelector('.pin-edit-box');

//dertermine the user
const isGuest = app.userType === 'guest';

//guest op and signed user should have diff operations.

//which btn is clicked?
editBox.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    const li = e.target;
    const id = li.closest('.user-pin').dataset.id;

    console.log(li, `id: ${id}`);
  }
});
//perform the corresponding operation

class GuestEdit {
  editMessage(id) {
    //get the id of the target
    //popup inputform
    //autoselect eventType and fill up the text area
    //get the newInput
    //render pin
  }
}

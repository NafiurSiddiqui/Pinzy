import createModal from '../modal.js';
import app from '../app.js';
import FormEditorView from './formEditor.view.js';

// class Editor extends FormEditorView {
//   #pinEdited = false;

//   constructor() {
//     super();
//     this.eventTypeEl = eventTypeEl;
//     this.messageEl = messageEl;
//     this.selectedEventIcon = this.getEventIcon();
//     this.btnSubmitEdit = btnSubmitEdit;
//     this.eventTypeEl?.addEventListener('input', this.debounceValidation());
//     this.messageEl?.addEventListener('input', this.debounceValidation());
//     this.eventTypeEl.addEventListener('change', this.getEventIcon.bind(this));
//     this.formEditUiHandler();
//   }

//   getEventIcon() {
//     let selectedEventIcon =
//       this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.icon;
//     this.selectedEventIcon = selectedEventIcon;

//     return selectedEventIcon;
//   }
//   editMessage(id) {
//     //get the items from localStorage
//     const data = JSON.parse(localStorage.getItem(`user`));

//     const item = data.find(item => item.id === +id);

//     //popup edit-input-form
//     this._showEditForm();

//     //autoselect eventType and fill up the text area
//     eventTypeEl.value = item.event;
//     messageEl.value = item.message;

//     //get the newInput
//     btnSubmitEdit?.addEventListener('click', e => {
//       e.preventDefault();
//       //get the newInput
//       event = eventTypeEl.value;
//       message = messageEl.value;

//       //if event or message value changes
//       if (event !== item.event || message !== item.message) {
//         this.#pinEdited = true;
//       }

//       //create a new object
//       const newItem = {
//         ...item,
//         event: event,
//         icon: this.selectedEventIcon || item.icon,
//         message: message,
//       };
//       // Update the corresponding event icon element
//       // Selector for the specific <li> element
//       const listItemSelector = `li[data-id="${id}"]`;
//       // Get the specific <li> element
//       const listItem = document.querySelector(listItemSelector);
//       if (listItem) {
//         const eventIconEl = listItem.querySelector(
//           '.pin-card-header_event-icon'
//         );
//         // Find the event icon element within the <li> element
//         if (eventIconEl) {
//           eventIconEl.textContent = this.selectedEventIcon;
//         }
//       }

//       //update localStorage
//       localStorage.setItem(
//         `user`,
//         JSON.stringify(data.map(item => (item.id === +id ? newItem : item)))
//       );
//       //clear inputs
//       eventTypeEl.value = messageEl.value = '';

//       //hideInput
//       this._hideEditForm();

//       //refresh window to update the pins
//       this.watchForPinChanges();
//     });
//   }

//   watchForPinChanges() {
//     //see if pinEdited
//     if (this.#pinEdited) {
//       //roll out timer and refresh the content
//       setTimeout(() => {
//         app.refreshContent();
//       }, 100);

//       //set edited to false
//       this.#pinEdited = false;
//     } else {
//       //refresh anyway otherwise if submitted, page does not refresh
//       setTimeout(() => {
//         app.refreshContent();
//       }, 100);
//     }
//   }

//   deletePin(id) {
//     //get the item from localStorage
//     const data = JSON.parse(localStorage.getItem('user'));
//     //filter the item
//     const filteredData = data.filter(item => item.id !== +id);

//     // update localStorage
//     localStorage.setItem('user', JSON.stringify(filteredData));
//     //refresh window to update the pins
//     location.reload();
//     // app.refreshContent();
//   }

//   deleteAllPin() {
//     //get the item from localStorage
//     const data = JSON.parse(localStorage.getItem('user'));
//     //delete all from local storage
//     localStorage.removeItem('user');
//     //refresh window to update the pins
//     location.reload();
//     // app.refreshContent();
//   }

//   editBoxHandler() {
//     const editBoxes = document.querySelectorAll('.pin-edit-box');

//     editBoxes.forEach(editBox => {
//       //get the parent on click
//       const pin = editBox.closest('.user-pin');
//       //get the id
//       const pinId = pin.dataset.id;
//       //assign the parent id to this of pin
//       editBox.dataset.id = pinId;
//       //listen to the editBox
//       editBox.addEventListener('click', e => {
//         const li = e.target.tagName === 'LI';
//         const id = editBox.dataset.id;

//         const action = e.target.textContent.trim();

//         if (li) {
//           const cardId = editBox.dataset.id;
//           //without trim, spaces prevents from a match
//           if (action === 'edit') {
//             this.editMessage(cardId);
//           }

//           if (action === 'delete') {
//             createModal({
//               title: 'Delete Pin',
//               message: 'Are you sure you want to delete this pin?',
//               confirmText: 'Delete',
//               cancelText: 'Cancel',
//             }).then(res => {
//               if (res) {
//                 this.deletePin(id);
//               } else {
//                 return;
//               }
//             });
//           }

//           if (action === 'delete all') {
//             createModal({
//               title: 'Delete All Pins',
//               message: 'Are you sure you want to delete all your pins?',
//               confirmText: 'Delete',
//               cancelText: 'Cancel',
//             }).then(res => {
//               if (res) {
//                 this.deleteAllPin();
//               } else {
//                 return;
//               }
//             });
//           }
//         }
//       });
//     });
//   }
// }

import { formElements, helper } from '../helper.js';
import BaseForm from './BaseForm.view.js';
import createModal from './modal.view.js';

const {
  eventTypeEditEl,
  messageEditEl,
  btnEditSubmit,
  formEditBgEl,
  formEditEl,
} = formElements;

/**
 * @params {HTMLelements} - Which are only relevant to the form__edit elements.
 */
export default class FormEditorView extends BaseForm {
  formEditIsopen = false;
  eventTypeEditEl = eventTypeEditEl;
  messageEditEl = messageEditEl;
  btnEditSubmit = btnEditSubmit;
  formEditBgEl = formEditBgEl;
  formEditEl = formEditEl;
  userType = '';
  guestEditor;
  pinEdited = false;
  constructor() {
    super();
    this.baseValidateForm.bind(this);
    this.baseFormValidationHandler(
      this.eventTypeEditEl,
      this.messageEditEl,
      this.btnEditSubmit
    );
    this.toggleEditBox = this.toggleEditBox.bind(this);

    this.editBtnHandlerGlobal();
    this.baseHideForm(this.formEditBgEl, this.formEditEl);
    helper.checkUserLoggedIn()
      ? (this.userType = 'user')
      : (this.userType = 'guest');
    this.actionHandler = this.actionHandler.bind(this);
    this.actionHandler(this.userType);
  }

  setFormEditIsOpen(value) {
    this.formEditIsopen = value;
  }

  //editBtn listener on card
  editBtnHandler(editBtn) {
    editBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const editBox = e.currentTarget.nextElementSibling;
      editBox.classList.toggle('hidden');
    });
  }

  //close the edit on global click
  editBtnHandlerGlobal() {
    document.body.addEventListener('click', e => {
      !e.target.classList.contains('.pin-edit-box_item')
        ? this.toggleEditBox(close)
        : null;
    });
  }

  toggleEditBox(closeBox = false) {
    // to prevent from toggling and simply hide if closeBox
    if (closeBox) {
      const editBoxes = document.querySelectorAll('.pin-edit-box');
      editBoxes.forEach(box => box.classList.add('hidden'));
    } else {
      const editBox = document.querySelector('.pin-edit-box:not(.hidden)');

      if (editBox) {
        editBox.classList.add('hidden');
      }
    }
  }

  //editor logic
  getEventIcon() {
    let selectedEventIcon =
      this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.icon;
    this.selectedEventIcon = selectedEventIcon;

    return selectedEventIcon;
  }

  showEditFormHandler(mapEvent, newMapEvhandler) {
    this.baseShowForm(mapEvent, newMapEvhandler);
  }

  //MODEL CONCERNS
  editMessage(id, userType) {
    //get the items from localStorage
    const data = JSON.parse(localStorage.getItem(userType));

    const item = data.find(item => item.id === +id);

    //popup edit-input-form
    // this.showEditForm();
    this.baseShowForm(null, this.formEditBgEl);

    //autoselect eventType and fill up the text area
    this.eventTypeEditEl.value = item.event;
    this.messageEditEl.value = item.message;

    //get the newInput
    this.btnEditSubmit?.addEventListener('click', e => {
      e.preventDefault();
      const newEventType = this.eventTypeEditEl.value;
      const newMessage = this.messageEditEl.value;
      //if event or message value changes
      if (newEventType !== item.event || newMessage !== item.message) {
        this.pinEdited = true;
      }

      //create a new object
      const newItem = {
        ...item,
        event: newEventType,
        icon: this.selectedEventIcon || item.icon,
        message: newMessage,
      };
      // Update the corresponding event icon element
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

      //!update localStorage - MODEL CONCERN

      localStorage.setItem(
        userType,
        JSON.stringify(data.map(item => (item.id === +id ? newItem : item)))
      );

      //clear inputs

      this.eventTypeEditEl.value = this.messageEditEl.value = '';

      //hideInput
      this.baseHideForm(this.formEditBgEl, this.formEditEl);
      //refresh window to update the pins
      this.watchForPinChanges();
    });
  }

  deletePin(id, userType) {
    //!get the item from localStorage - MODELs concern
    const data = JSON.parse(localStorage.getItem(userType));
    //filter the item
    const filteredData = data.filter(item => item.id !== +id);

    // update localStorage
    localStorage.setItem(userType, JSON.stringify(filteredData));
    //refresh window to update the pins
    this.baseRefreshContent();
    // app.refreshContent();
  }

  deleteAllPin(userType) {
    //get the item from localStorage
    const data = JSON.parse(localStorage.getItem(userType));
    //delete all from local storage
    localStorage.removeItem(userType);
    //refresh window to update the pins
    this.baseRefreshContent();
    // app.refreshContent();
  }
  //MODEL CONCERNS ENDS

  watchForPinChanges() {
    //see if pinEdited
    if (this.pinEdited) {
      //roll out timer and refresh the content
      setTimeout(() => {
        this.baseRefreshContent();
      }, 100);

      //set edited to false
      this.pinEdited = false;
    } else {
      //refresh anyway otherwise if submitted, page does not refresh
      setTimeout(() => {
        this.baseRefreshContent();
      }, 100);
    }
  }

  actionHandler(userType) {
    const editBoxes = document.querySelectorAll('.pin-edit-box');
    // console.log('action handler runs');

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

        const actionType = e.target.textContent.trim();
        if (li) {
          const cardId = editBox.dataset.id;

          //without trim, spaces prevents from a match
          if (actionType === 'Edit') {
            this.editMessage(cardId, userType);
          }

          if (actionType === 'Delete') {
            createModal({
              title: 'Delete Pin',
              message: 'Are you sure you want to delete this pin?',
              confirmText: 'Delete',
              cancelText: 'Cancel',
            }).then(res => {
              if (res) {
                this.deletePin(id, userType);
              } else {
                return;
              }
            });
          }

          if (actionType === 'Delete all') {
            createModal({
              title: 'Delete All Pins',
              message: 'Are you sure you want to delete all your pins?',
              confirmText: 'Delete',
              cancelText: 'Cancel',
            }).then(res => {
              if (res) {
                this.deleteAllPin(userType);
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

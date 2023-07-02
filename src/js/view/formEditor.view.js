import controller from '../controller.class.js';
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
  userPins;
  guestPins;

  constructor(userPins, guestPins) {
    super();
    this.userPins = userPins;
    this.guestPins = guestPins;
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
    this.actionHandler();
  }

  setFormEditIsOpen(value) {
    this.formEditIsopen = value;
  }

  //editBtn listener on card
  editBtnHandler(editBtn) {
    editBtn?.addEventListener('click', e => {
      e.stopPropagation();

      const editBox = e.currentTarget.nextElementSibling;
      editBox.classList.remove('hidden');
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
    console.log(this.eventTypeEditEl);
    let selectedEventIcon =
      this.eventTypeEditEl?.options[this.eventTypeEditEl.selectedIndex].dataset
        .icon;

    return selectedEventIcon;
  }

  getEventColor() {
    let selectedEventColor =
      this.eventTypeEditEl?.options[this.eventTypeEditEl.selectedIndex]?.dataset
        ?.color;

    return selectedEventColor;
  }

  showEditFormHandler(mapEvent, newMapEvhandler) {
    this.baseShowForm(mapEvent, newMapEvhandler);
  }

  editMessage(id) {
    //get the item that mateches with this id
    let item =
      this.userType === 'user'
        ? this.userPins?.find(item => item.id === +id)
        : this.guestPins?.find(item => item.id === +id);

    //popup edit-input-form
    this.baseShowForm(null, this.formEditBgEl);

    //autoselect eventType and fill up the text area
    this.eventTypeEditEl.value = item.pin_event;
    this.messageEditEl.value = item.pin_message;
    //get the newInput
    this.btnEditSubmit?.addEventListener('click', e => {
      e.preventDefault();
      const newEventType = this.eventTypeEditEl.value;
      const newMessage = this.messageEditEl.value;

      //create a new object
      let newItem = {
        ...item,
        pin_event: newEventType,
        pin_color: this.getEventColor() || item.pin_color,
        pin_icon: this.getEventIcon() || item.pin_icon,
        pin_message: newMessage.trim(),
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

      //send new item to the backend whose id matches this id
      controller.controlEditData(newItem, id);

      //clear inputs
      this.eventTypeEditEl.value = this.messageEditEl.value = '';

      //hideInput
      this.baseHideForm(this.formEditBgEl, this.formEditEl);

      //refresh window to update the pins
      this.baseRefreshContent();
    });
  }

  deletePin(id) {
    controller.controlDelReq('single', id);
  }

  deleteAllPin() {
    controller.controlDelReq('all');
  }

  actionHandler() {
    const editBoxes = document.querySelectorAll('.pin-edit-box');

    editBoxes.forEach(editBox => {
      //get the parent on click
      const pin = editBox.closest('.user-pin');

      //get the id
      const pinId = pin.dataset.id;
      //assign the parent id to this instance of pin
      editBox.dataset.id = pinId;
      //listen to the editBox
      editBox.addEventListener('click', e => {
        const li = e.target.tagName === 'LI';
        const id = editBox.dataset.id;
        const actionType = e.target.textContent.trim();

        try {
          if (li) {
            const cardId = editBox.dataset.id;

            //without trim, spaces prevents from a match
            if (actionType === 'Edit') {
              this.editMessage(cardId);
            }

            if (actionType === 'Delete') {
              createModal({
                title: 'Delete Pin',
                message: 'Are you sure you want to delete this pin?',
                confirmText: 'Delete',
                cancelText: 'Cancel',
              }).then(res => {
                if (res) {
                  this.deletePin(id);
                  this.baseRefreshContent();
                  // if (this.userType === 'guest') {
                  //   this.baseRefreshContent();
                  // }
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
                  this.deleteAllPin();
                  this.baseRefreshContent();
                  // if (this.userType === 'guest') {
                  //   this.baseRefreshContent();
                  // }
                } else {
                  return;
                }
              });
            }
          }
        } catch (error) {
          console.error('something went wrong with the editor ', error);
        }
      });
    });
  }
}

import { sidebarElements } from '../helper.js';
import GuestEditor from '../user/guest.editor.js';
import FormView from './form.view.js';
import FormEditorView from './formEditor.view.js';
import Map from './map.view.js';
import Pin from './pin.view.js';

const {
  sidebar,
  sidebarContent,
  sidebarFooter,
  btnSidebar,
  btnSidebarMobile,
  btnLogout,
} = sidebarElements;

let sidebarIsOpen = false;

/**
 * form UI
 * Sidebar UI
 * map
 */
export default class View {
  guestEditor;
  form;
  formEditor;
  map;
  guestPins = [];
  userPins = [];
  globalPins = [];
  pinClass;
  userType;
  constructor(guestState, userPins, globalPins) {
    this.renderSpinner(true);
    this.form = new FormView();
    this.formEditor = new FormEditorView();
    this.guestEditor = new GuestEditor();
    this.guestPins = guestState;
    this.userPins = userPins;
    this.globalPins = globalPins;
    this.renderForm = this.renderForm.bind(this);
    this.hideForm = this.hideForm.bind(this);

    this.map = new Map(
      this.guestPins,
      this.userPins,
      this.globalPins,
      this.renderForm,
      this.renderSpinner
    );
    this.newEvHandler = this.map.newMapEvHandler;
    this.hideForm();
    this.sidebarHanlder();
    this.sidebarHanlderMobile();
  }

  renderMap() {
    this.map.getPosition(map => {
      if (map) {
        this.pinClass = new Pin(
          map,
          this.guestPins,
          this.usrePins,
          this.globalPins,
          this.map.userType
        );
      } else {
        console.log('No map');
        // Handle the case where map is not available
      }
    });
  }

  renderForm(mapEvent) {
    this.form.showFormHandler(mapEvent, this.newEvHandler);
  }

  hideForm() {
    this.form.hideFormHandler();
  }

  renderEditFormHandler() {
    this.formEditor.showForm();
  }

  renderSpinner(render = false) {
    const spinnerWrapper = document.querySelector('.loader-wrapper');
    const spinner = document.querySelector('.spinner');
    const defaultMsgEl = document.querySelector('.default-msg');

    if (render === true) {
      spinnerWrapper.classList.remove('hidden');
      spinnerWrapper.classList.add('flex');
      defaultMsgEl.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>';
    } else {
      spinnerWrapper.classList.add('hidden');
      spinnerWrapper.classList.remove('flex');
      spinner.classList.remove('spin');
      defaultMsgEl.textContent = 'No pins created yet.';
    }
  }

  editBtnGlobalHandler(pinClass) {
    pinClass?.editBtnGlobalHandler();
  }

  //sidebar handler
  sidebarHanlder() {
    btnSidebar.addEventListener('click', () => {
      // Toggle sidebar class with tailwind

      //adjust width, bg
      sidebar.classList.toggle('laptop:w-[30rem]');
      sidebar.classList.toggle('w-full');
      sidebar.classList.toggle('w-14');
      sidebar.classList.toggle('bg-aside');
      sidebar.classList.toggle('tablet:bg-aside');
      //hide content
      sidebarContent.classList.toggle('tablet:opacity-100');
      sidebarContent.classList.toggle('tablet:opacity-0');
      sidebarContent.classList.toggle('-translate-x-full');
      //hide logout btn
      btnLogout.classList.toggle('flex');
      btnLogout.classList.toggle('tablet:flex');
      btnLogout.classList.toggle('hidden');
      //sidebar footer
      sidebarFooter.classList.toggle('tablet:justify-between');
      // rotate btn
      btnSidebar.classList.toggle('fa-flip-horizontal');
    });
  }

  sidebarHanlderMobile() {
    btnSidebarMobile?.addEventListener('click', () => {
      btnSidebarMobile.classList.toggle('fa-rotate-90');
      btnSidebarMobile.classList.toggle('fa-rotate-270');
      sidebar.classList.toggle('bg-aside');

      if (!sidebarIsOpen) {
        sidebar.classList.remove('-bottom-full');
        sidebar.classList.add('animate-fade-up');
        sidebarIsOpen = true;
      } else {
        sidebar.classList.remove('animate-fade-up');
        sidebar.classList.add('animate-fade-down');
        sidebar.classList.add('-bottom-full');

        sidebarIsOpen = false;
      }
    });
  }
}

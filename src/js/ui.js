//SIDEBAR
const btnSidebar = document.querySelector('.btn-sidebar');
const btnSidebarMobile = document.querySelector('.btn-sidebar-mobile');
const sidebar = document.querySelector('.sidebar');
const sidebarContent = document.querySelector('.sidebar-content-wrapper');
const sidebarFooter = document.querySelector('.user-profile-footer');
const btnLogout = document.querySelector('.btn-user-logout');

btnSidebar?.addEventListener('click', () => {
  // Toggle sidebar class with tailwind

  //adjust width, bg
  // sidebar.classList.toggle('tablet:w-[24rem]');
  sidebar.classList.toggle('laptop:w-[30rem]');
  sidebar.classList.toggle('w-full');
  sidebar.classList.toggle('w-14');
  sidebar.classList.toggle('bg-aside');
  sidebar.classList.toggle('tablet:bg-aside');
  //hide content
  sidebarContent.classList.toggle('tablet:opacity-100');
  sidebarContent.classList.toggle('invisible');
  //hide logout btn
  btnLogout.classList.toggle('tablet:flex');
  //sidebar footer
  sidebarFooter.classList.toggle('tablet:justify-between');
  // rotate btn
  btnSidebar.classList.toggle('fa-flip-horizontal');
});

let sidebarIsOpen = false;
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

// USER PIN
const editBox = document.querySelector('.pin-edit-box');

export const toggleEditBox = (closeBox = false) => {
  const editBoxes = document.querySelectorAll('.pin-edit-box');

  //to prevent from toggling and simply hide if closeBox
  closeBox
    ? editBoxes.forEach(box => box.classList.add('hidden'))
    : editBox?.classList.toggle('hidden');
};

const attachEditBtnListener = () => {
  const btnEditPin = document.querySelectorAll('.fa-ellipsis');

  btnEditPin?.forEach(btn => {
    btn.addEventListener('click', e => {
      //find the parent
      const userPin = e.target.closest('.user-pin');
      //find the edit box in the parent
      const editBox = userPin.querySelector('.pin-edit-box');

      // toggle edit box
      if (editBox) {
        editBox.classList.toggle('hidden');
        console.log(editBox.classList + 'second');
      }

      //prevents from bubbling to the parent
      e.stopPropagation();
    });
  });
};

export default attachEditBtnListener;

editBox?.addEventListener('click', e => {
  //prevents from bubbling to the grandparent
  e.stopPropagation();

  //close the box
  // e.target.tagName === 'LI' ? toggleEditBox() : null;
});

//close the edit on global click
document.body.addEventListener('click', e => {
  !e.target.classList.contains('.pin-edit-box_item')
    ? toggleEditBox(close)
    : null;
});

//AUTH FORM ERROR HANDLER

// Get the URL query string
const queryString = window.location.search;

// Check if the query string contains the word "error"
const urlHasError = queryString.includes('error');
let isError = false;

if (urlHasError) {
  isError = true;
} else {
  isError = false;
}

//AUTH TOAST HANDLER

const btnClose = document.querySelector('.fa-x');
const notification = document.querySelector('.toast-notification');

btnClose?.addEventListener('click', () => {
  notification?.classList.add('hidden');
});

//AUTH FORM ANIMATION
const inputs = document.querySelectorAll('.input-field');

inputs.forEach(function (input) {
  const label = input.previousElementSibling;

  let inputHasValue = false;
  let hasFocus = false;
  input.addEventListener('focus', function () {
    if (hasFocus && !inputHasValue) {
    }
    label.classList.add('input-focused');
    hasFocus = true;
  });

  input.addEventListener('blur', function () {
    if (inputHasValue) {
      return;
    }
    label.classList.remove('input-focused');
    hasFocus = false;
  });

  input.addEventListener('input', function () {
    if (input.value.trim().length > 0) {
      inputHasValue = true;

      label.classList.add('input-focused');
    } else {
      inputHasValue = false;

      if (hasFocus) {
        return;
      }
      label.classList.remove('input-focused');
    }
  });
});

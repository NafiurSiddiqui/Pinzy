const userInputBg = document.querySelector('.user-input-bg');
const userInputForm = document.querySelector('.user-input-bg form');

//USER INPUT POP UP
userInputBg.addEventListener('click', event => {
  // Check if the clicked element is the user-input form or not
  if (!userInputForm.contains(event.target)) {
    // Close the user-input
    userInputBg.classList.add('hidden');
  }
});

//SIDEBAR
const btnSidebar = document.querySelector('.btn-sidebar');
const sidebar = document.querySelector('.sidebar');
const sidebarContent = document.querySelector('.sidebar-content-wrapper');
const btnLogout = document.querySelector('.btn-user-input');

btnSidebar.addEventListener('click', () => {
  // Toggle sidebar class with tailwind
  sidebar.classList.toggle('w-full');
  sidebar.classList.toggle('tablet:w-80');
  sidebar.classList.toggle('w-14');
  //hide logout btn
  btnLogout.classList.toggle('hidden');

  // roate btn
  btnSidebar.classList.toggle('fa-flip-horizontal');
  //show content
  sidebarContent.classList.toggle('opacity-0');
});

// USER PIN

const btnEditPin = document.querySelector('.fa-ellipsis');
const editBox = document.querySelector('.pin-edit-box');
const userPin = document.querySelector('.user-pin');

export const toggleEditBox = e => {
  editBox.classList.toggle('hidden');
};

btnEditPin.addEventListener('click', e => {
  // editBox.classList.toggle('hidden');
  toggleEditBox();
  //prevents from bubbling to the parent
  e.stopPropagation();
});

editBox.addEventListener('click', e => {
  //prevents from bubbling to the grandparent
  e.stopPropagation();
  //close the box
  e.target.tagName === 'LI' ? toggleEditBox() : null;
});

//close the edit on global click
document.body.addEventListener('click', e => {
  !e.target.classList.contains('.pin-edit-box_item') ? toggleEditBox() : null;
});

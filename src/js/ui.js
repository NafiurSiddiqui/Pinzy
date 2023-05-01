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

btnSidebar.addEventListener('click', () => {
  // Toggle sidebar class with tailwind
  sidebar.classList.toggle('tablet:w-80');
  sidebar.classList.toggle('w-14');
  // roate btn
  btnSidebar.classList.toggle('btn-sidebar-close');
  //show content
  sidebarContent.classList.toggle('sidebar-content-hide');
});

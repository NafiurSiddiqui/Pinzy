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
const sidebar = document.querySelector('aside.sidebar');

btnSidebar.addEventListener('click', () => {
  // Toggle the 'hidden' class on the sidebar element
  //   sidebar.classList.toggle('hidden');
  // Toggle the 'bottom-0' class on the body element
  document.body.classList.toggle('bottom-0');
});

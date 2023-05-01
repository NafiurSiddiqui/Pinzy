const userInputBg = document.querySelector('.user-input-bg');
const userInputForm = document.querySelector('.user-input-bg form');

userInputBg.addEventListener('click', event => {
  // Check if the clicked element is the user-input form or not
  if (!userInputForm.contains(event.target)) {
    // Close the user-input
    userInputBg.classList.add('hidden');
  }
});

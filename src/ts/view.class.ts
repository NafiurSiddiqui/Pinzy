/**
 * form UI
 * Sidebar UI
 */

class View {
  constructor() {
    this.formBg = document.querySelector('.user-input-bg');
    this.form = document.querySelector('.user-input-form');
    this.btnSubmit = document.querySelector('.btn-user-input');
  }

  showForm(mapE) {
    this.#mapEvent = mapE;

    this.formBg.classList.remove('hidden');
    if (!this.btnSubmit.hasAttribute('disabled')) {
      this.btnSubmit.setAttribute('disabled', '');
    }
  }
  //hide form
  hideForm() {
    this.formBg.addEventListener('click', event => {
      // Check if the clicked element is the user-input form or not

      if (!this.form.contains(event.target)) {
        // Close the user-input
        this.formBg.classList.add('hidden');
      }
    });
  }
}

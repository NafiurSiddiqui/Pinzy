const btnClose = document.querySelector('.fa-x');
const notification = document.querySelector('.toast-notification');
const inputs = document.querySelectorAll('.input-field');
const queryString = window.location.search;

// // Check if the query string contains the word "error"
// const urlHasError = queryString.includes('error');
// let isError = false;

// if (urlHasError) {
//   isError = true;
// } else {
//   isError = false;
// }

class AuthView {
  isError = false;
  urlHasError = false;
  constructor() {
    this.urlHasError = queryString.includes('error');
    this.notificationHanlder();
    this.errorHanlder();
    this.inputUiHanlder();
  }

  notificationHanlder() {
    btnClose?.addEventListener('click', () => {
      notification?.classList.add('hidden');
    });
  }

  errorHanlder() {
    this.isError = this.urlHasError ? true : false;
  }

  inputUiHanlder() {
    inputs.forEach(input => {
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
  }
}

const auth = new AuthView();

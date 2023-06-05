const btnClose = document.querySelector('.fa-circle-xmark');
const notification = document.querySelector('.toast-notification');
const inputs = document.querySelectorAll('.input-field');
const queryString = window.location.search;

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
    const largeDevice = window.matchMedia('(min-width: 1600px)');
    const isLargeDevice = largeDevice.matches;

    inputs.forEach(input => {
      const label = input.previousElementSibling;

      let inputHasValue = false;
      let hasFocus = false;

      input.addEventListener('focus', function () {
        if (hasFocus && !inputHasValue) {
        }
        if (isLargeDevice) {
          label.classList.remove('tablet-md:-bottom-8');
          label.classList.add('input-focused-largeScreen');
        } else {
          label.classList.add('input-focused');
          label.classList.remove('-bottom-[1.8rem]');
          label.classList.remove('tablet-md:-bottom-8');
        }

        hasFocus = true;
      });

      input.addEventListener('blur', function () {
        if (inputHasValue) {
          return;
        }

        if (isLargeDevice) {
          label.classList.add('tablet-md:-bottom-8');
          label.classList.remove('input-focused-largeScreen');
        } else {
          label.classList.add('-bottom-[1.8rem]');
          label.classList.remove('input-focused');
          label.classList.add('tablet-md:-bottom-8');
        }

        hasFocus = false;
      });

      input.addEventListener('input', function () {
        if (input.value.trim().length > 0) {
          inputHasValue = true;
          if (isLargeDevice) {
            label.classList.remove('tablet-md:-bottom-8');
            label.classList.add('input-focused-largeScreen');
          } else {
            label.classList.add('input-focused');
            label.classList.remove('-bottom-[1.8rem]');
            label.classList.remove('tablet-md:-bottom-8');
          }

          // label.classList.add('input-focused');
          // isLargeDevice
          //   ? label.classList.add('input-focused-largeScreen')
          //   : label.classList.add('input-focused');
        } else {
          inputHasValue = false;

          if (hasFocus) {
            return;
          }
          if (isLargeDevice) {
            label.classList.add('tablet-md:-bottom-8');
            label.classList.remove('input-focused-largeScreen');
          } else {
            label.classList.add('-bottom-[1.8rem]');
            label.classList.remove('input-focused');
            label.classList.add('tablet-md:-bottom-8');
          }
        }
      });
    });
  }
}

const auth = new AuthView();

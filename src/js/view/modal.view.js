const createModal = options => {
  const modal = document.createElement('div');
  modal.classList.add(
    'fixed',
    'inset-0',
    'z-50',
    'flex',
    'items-center',
    'justify-center',
    'bg-gray-800/40',
    'backdrop-blur-md'
  );

  const modalContent = `
    <div class="bg-white rounded-lg px-4 py-3">
      <div class="flex items-center justify-between pb-3">
        <h2 class="text-lg font-medium">${options.title}</h2>
        <button id="modal-close" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Close</title>
            <path
              d="M14.348 5.652a.999.999 0 1 0-1.414-1.414L10 8.586 6.066 4.652a.999.999 0 1 0-1.414 1.414L8.586 10l-3.934 3.934a.999.999 0 1 0 1.414 1.414L10 11.414l3.934 3.934a.999.999 0 1 0 1.414-1.414L11.414 10l3.934-3.934z" />
          </svg>
        </button>
      </div>
      <p>${options.message}</p>
      <div class="mt-4 flex justify-end">
        <button id="modal-confirm" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          ${options.confirmText}
        </button>
        <button id="modal-cancel" class="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full">
          ${options.cancelText}
        </button>
      </div>
    </div>
  `;

  modal.innerHTML = modalContent;

  const closeModal = () => {
    document.body.removeChild(modal);
  };

  modal.querySelector('#modal-close').addEventListener('click', closeModal);
  modal.querySelector('#modal-cancel').addEventListener('click', closeModal);

  return new Promise(resolve => {
    modal.querySelector('#modal-confirm').addEventListener('click', () => {
      closeModal();
      resolve(true);
    });

    document.body.appendChild(modal);
  });
};

export default createModal;

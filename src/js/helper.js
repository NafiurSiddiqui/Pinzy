const FormElements = {
  form: document.querySelector('.user-input-form'),
  formBg: document.querySelector('.user-input-bg'),
  formEdit: document.querySelector('.user-input-form__edit'),
  formEditBg: document.querySelector('.user-input-bg__edit'),
  eventTypeEl: document.getElementById('eventType'),
  eventTypeEditEl: document.getElementById('eventType__edit'),
  eventValue: eventTypeEl?.value,
  eventEditValue: eventTypeEditEl?.value,
  messageEl: document.getElementById('message'),
  messageEditEl: document.getElementById('message__edit'),
  messageValue: messageEl?.value,
  messageEditValue: messageEditEl?.value,
  btnSubmit: document.querySelector('.btn-user-input'),
  btnEditSubmit: document.querySelector('.btn-user-input__edit'),
};

export { FormElements };

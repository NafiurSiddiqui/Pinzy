import Model from './model.class.js';
import FormView from './view/form.view.js';
import view from './view/view.js';

/**
 * @init {function} - Init the app`
 */

class Controller {
  map;
  form;
  view;
  model;

  constructor() {
    this.view = view;
    this.model = new Model();
    //init
    this.init();
    console.log(this.model._userName);
  }

  controlUserData(data) {
    let userData = data();
    console.log(userData.userType);

    let userName = data('Timmy');
    console.log(userName.userName);
    if (data().userType === 'guest') {
      //guest data
      this.model.setLocalStorage('guest', JSON.stringify(data));
    } else {
      // const userData = data()
      //get userName
      //store userData
    }
    //store data
  }
  init() {
    this.view.renderMap();
    // this.view.dataHandlerOnSubmit(this.controlUserData);
    this.view.form.dataHandlerOnSubmit(this.controlUserData);
  }
}

const controller = new Controller();
export default controller;

import { helper } from './helper.js';

export default class Model {
  _userName = '';
  _userId = null;
  _globalState = [];
  _guestPins = null;
  _userPins = null;
  _globalStateKey = 'globalState';
  userType = null;
  GUEST_LSTORAGE_MESSAGE =
    'Please allow to save cookies in your browser for the guest feature to work 🤦';

  localStorageIsNotAvailable = null;

  constructor() {
    this.isLocalStorageAvailable();

    if (this.localStorageIsNotAvailable === false) {
      this.getUserName = this.getUserName.bind(this);
      this.getUserName();
      this.getLocalStorage();
      this.getUserId = this.getUserId.bind(this);
      this.userType = helper.checkUserLoggedIn();
      this.fetchUserData();
      // console.log(this._userPins);
      if (this._userPins?.length > 0) {
        this.updateGlobalState();
      }
    }
  }

  getUserName() {
    //get username from URL
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let userName = urlParams.get('username');
    let getUserNameFromStorage = localStorage.getItem('userName');

    if (userName) {
      //capitalize the first character
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
      //set to the localStorage
      localStorage.setItem('userName', userName);
      this._userName = userName;
    } else if (getUserNameFromStorage) {
      //get from localStorage
      this._userName = getUserNameFromStorage;
    } else {
      //remove name from local Storage
      localStorage.removeItem('userName');
      this._username = 'userName';
    }
  }

  async getUserId() {
    try {
      const response = await fetch('../api/reqHandler/returnUserId.php');

      if (response.ok) {
        const data = await response.json();
        const userId = data.user_id;
        return userId;
      } else {
        console.error('Error:', response.status);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   *
   * @param {string} userType
   * @param {Object} data
   */

  saveGuestToLocalStorage(data) {
    if (data === undefined || '') throw new Error('Must set data for guest');
    //see if localstorage is allowed

    let guestData = JSON.parse(localStorage.getItem('guest')) || [];

    guestData.push(data);
    localStorage.setItem('guest', JSON.stringify(guestData));
    // this.updateGlobalState();
  }

  updateGuestEditToLocalStorage(newPin, id) {
    localStorage.setItem(
      'guest',
      JSON.stringify(
        this._guestPins.map(item => (item.id === +id ? newPin : item))
      )
    );
  }

  async request(url, method, data, msgType) {
    let options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      let response;

      if (method === 'GET' || undefined || '') {
        response = await fetch(url);
      } else {
        response = await fetch(url, options);
      }

      if (response.ok) {
        console.log(`${msgType} successful `);
      } else {
        console.log(`${msgType} failed`);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUserData() {
    //who logged in?
    if (!this.userType) return;

    const url = '../api/reqHandler/returnUserPin.php';
    try {
      // const response = await fetch(url);
      let response = await this.request(url, 'GET', null, 'fetch');

      if (!response.ok) return;

      const result = await response.json();

      this._userPins = result;
      return this._userPins;
    } catch (error) {
      console.error(error);
    }
  }

  async sendPinToServer(data) {
    console.log(data);
    if (!data) throw new Error('No data has been provided.');

    const userId = await this.getUserId();
    const newData = { userId, ...data };
    const url = '../api/reqHandler/submitUserPin.php';

    await this.request(url, 'POST', newData, 'Sending pin');
  }

  async updateEditedPinToServer(data) {
    //guard
    if (!data) return;

    //prepare the url
    const url = '../api/reqHandler/submitEditPin.php';

    //get userId
    const userId = await this.getUserId();
    //combine data with user id
    let editedData = { ...data, userId };

    await this.request(url, 'POST', { editedData }, 'Edited data');
  }

  async reqToDelPin(reqType, id) {
    // if (!reqType) return;
    // console.log(reqType, id);
    const url = '../api/reqHandler/submitReqToDelete.php';

    if (reqType === 'single') {
      await this.request(url, 'DELETE', { id }, 'DELETE');
    } else if (reqType === 'all') {
      await this.request(url, 'DELETE', { id: 'all' }, 'DELETE ALL');
    }
  }

  getLocalStorage() {
    //get user data
    const guestData = JSON.parse(localStorage.getItem('guest')) || [];

    //update state
    if (guestData.length > 0) {
      this._guestPins = guestData;
    }
  }

  isLocalStorageAvailable() {
    let test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      this.localStorageIsNotAvailable = false;
      return true;
    } catch (e) {
      alert(this.GUEST_LSTORAGE_MESSAGE);
      this.localStorageIsNotAvailable = true;
      return false;
    }
  }

  updateGlobalState() {
    // this._globalState = [...this._guestPins, ...this._userPins];
    // console.log(this._userPins);
  }
}

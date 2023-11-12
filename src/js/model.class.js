import { helper } from './helper.js';

export default class Model {
  // _userName = '';
  _userId = null;
  _globalPins = null;
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
      this.getLocalStorage();
      this.getUserInfo = this.getUserInfo.bind(this);
      this.userType = helper.checkUserLoggedIn();
    }
  }

  async getUserInfo() {
    try {
      const response = await fetch('../api/reqHandler/returnUserId.php');

      if (response.ok) {
        const data = await response.json();
        const userId = data.user_id;
        const userName = data.user_name;
        console.log(data);
        return { userId, userName };
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

  delGuestPin(reqType, id) {
    reqType === 'single'
      ? localStorage.setItem(
          'guest',
          JSON.stringify(this._guestPins.filter(pin => pin.id !== +id))
        )
      : localStorage.removeItem('guest');
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
        console.log(`${msgType || 'response'} successful `);
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
      let response = await this.request(url, 'GET', null, 'fetch');
      // console.log(response);

      if (!response.ok) {
        let result = await response.json();

        console.warn(
          `Failed to get user pin: ${result.message || response.text()}`
        );
        return;
      }

      const result = await response.json();

      if (result.length === 0) {
        console.log('No data');
        return;
      }
      this._userPins = result;

      return this._userPins;
    } catch (error) {
      console.error(error);

      // alert('Something went wrong.😵‍💫 Look in the console for further info');
    }
  }

  async sendPinToServer(data) {
    if (!data) console.warning('No data has been provided.');
    const { userId, userName } = await this.getUserInfo();
    console.log(userId, userName);
    const newData = { userId, userName, ...data };
    const url = '../api/reqHandler/submitUserPin.php';

    await this.request(url, 'POST', newData, 'Sending pin');
  }

  async updateEditedPinToServer(data) {
    //guard
    if (!data) return;
    //prepare the url
    const url = '../api/reqHandler/submitEditPin.php';
    //get userId
    const { userId, userName } = await this.getUserInfo();
    //combine data with user id
    let editedData = { ...data, userId, userName };
    await this.request(url, 'POST', { editedData }, 'Edited data');
  }

  async reqToDelPin(reqType, id) {
    const url = '../api/reqHandler/submitReqToDelete.php';
    console.log(reqType, id);
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

  async getGlobalPins() {
    const url = '../api/reqHandler/returnGlobalPin.php';
    const res = await this.request(url);
    const data = await res.json();

    if (!this._guestPins) {
      this._globalPins = [...data];
    } else if (!data) {
      this._globalPins = [...this._guestPins];
    } else if (data && this._guestPins) {
      this._globalPins = [...this._guestPins, ...data];
    } else {
      return;
    }
  }
}

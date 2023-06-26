import { helper } from './helper.js';

export default class Model {
  _userName = '';
  _userId = null;
  _globalState = [];
  _guestState = [];
  _userPins = null;
  _globalStateKey = 'globalState';
  userType = null;

  constructor() {
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

    let guestData = JSON.parse(localStorage.getItem('guest')) || [];

    guestData.push(data);
    localStorage.setItem('guest', JSON.stringify(guestData));
    this.updateGlobalState();
  }

  // saveUserToLocalStorage(data) {
  //   if (data === undefined || '') throw new Error('Must set data for user');

  //   let userData = JSON.parse(localStorage.getItem('user')) || [];

  //   userData.push(data);
  //   localStorage.setItem('user', JSON.stringify(userData));
  //   this.updateGlobalState();
  // }

  async fetchUserData() {
    //who logged in?
    if (!this.userType) return;

    const url = '../api/reqHandler/returnUserPin.php';
    try {
      const response = await fetch(url);

      if (!response.ok) return;

      const result = await response.json();
      // this._userPins.push(result);
      this._userPins = result;
      return this._userPins;
    } catch (error) {
      console.error(error);
    }
  }
  //!DRY
  async sendPinToServer(data) {
    if (!data) throw new Error('No data has been provided.');

    const userId = await this.getUserId();
    const newData = { userId, ...data };
    const url = '../api/reqHandler/submitUserPin.php';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      res.ok
        ? console.log('data successfully submitted')
        : console.log('data FAILED to submit');
    } catch (e) {
      console.error(`submission error: ${e}`);
    }
  }

  async sendEditedPinToServer(data) {
    //guard
    if (!data) return;

    //prepare the url
    const url = '../api/reqHandler/submitEditPin.php';

    try {
      //get userId
      const userId = await this.getUserId();
      //combine data with user id
      let editedData = { ...data, userId };

      //send logic..
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ editedData }),
      });
      res.ok
        ? console.log('editted data successfully submitted')
        : console.log('eddited data FAILED to submit');
    } catch (err) {
      console.error(`edit submission error: ${e}`);
    }
  }

  //!DRYend

  getLocalStorage() {
    //get user data
    const guestData = JSON.parse(localStorage.getItem('guest')) || [];
    // const userData = JSON.parse(localStorage.getItem('user')) || [];

    //update state
    if (guestData.length > 0) {
      this._guestState = guestData;
    }
    //update state
    // if (userData.length > 0) {
    // this._userPins = userData;
    // }
  }

  updateGlobalState() {
    this._globalState = [...this._guestState, ...this._userPins];
  }
}

export default class Model {
  _userName;
  _userId;
  _globalState = [];
  _guestState = [];
  _userState = [];
  _globalStateKey = 'globalState';

  constructor() {
    this.getUserName = this.getUserName.bind(this);
    this.getUserName();
    this.getLocalStorage();
    this.updateGlobalState();
    this.getUserId = this.getUserId.bind(this);
    // this.getUserId();
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

  saveUserToLocalStorage(data) {
    if (data === undefined || '') throw new Error('Must set data for user');

    let userData = JSON.parse(localStorage.getItem('user')) || [];

    userData.push(data);
    localStorage.setItem('user', JSON.stringify(userData));
    this.updateGlobalState();
  }

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

  getLocalStorage() {
    //get user data
    const guestData = JSON.parse(localStorage.getItem('guest')) || [];
    const userData = JSON.parse(localStorage.getItem('user')) || [];

    //update state
    if (guestData.length > 0) {
      this._guestState = guestData;
    }
    //update state
    if (userData.length > 0) {
      this._userState = userData;
    }
  }

  updateGlobalState() {
    this._globalState = [...this._guestState, ...this._userState];
  }
}

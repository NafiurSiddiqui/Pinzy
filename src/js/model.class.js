// let dataState = [];

// export { dataState };

export default class Model {
  _userName;
  _globalState = [];
  _guestState = [];
  _userState = [];
  _globalStateKey = 'globalState';

  constructor() {
    this.getUserName = this.getUserName.bind(this);
    this.getUserName();
    this.getLocalStorage();
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

  /**
   *
   * @param {string} userType
   * @param {Object} data
   */
  // saveToLocalStorage(userType, data) {
  //   //update this.dataState
  //   // this._dataState.push(data);
  //   // console.log(this._dataState);
  //   // localStorage.setItem(userType, JSON.stringify(this._dataState));
  // }

  saveGuestToLocalStorage(data) {
    if (data === undefined || '') throw new Error('Must set data for guest');

    let guestData = JSON.parse(localStorage.getItem('guest')) || [];

    guestData.push(data);
    localStorage.setItem('guest', JSON.stringify(guestData));
  }

  saveUserToLocalStorage(data) {
    if (data === undefined || '') throw new Error('Must set data for user');

    let userData = JSON.parse(localStorage.getItem('user')) || [];

    userData.push(data);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // saveToLocalStorage(userType, data) {
  //   let dataState = JSON.parse(localStorage.getItem(this._dataStateKey)) || [];
  //   dataState.push(data);
  //   localStorage.setItem(this._dataStateKey, JSON.stringify(dataState));
  // }

  getLocalStorage() {
    const guestData = JSON.parse(localStorage.getItem('guest')) || [];
    const userData = JSON.parse(localStorage.getItem('user'));

    // const dataState =
    //   JSON.parse(localStorage.getItem(this._dataStateKey)) || [];

    // if (dataState.length > 0) {
    //   this._dataState = dataState;
    // }

    if (guestData.length > 0) {
      // this.hasGuestdata = true;
      // console.log(this._dataState);
      this._guestState = guestData;
      // this.data = guestdata.map(data => ({
      //   ...data,
      //   userType: 'guest',
      //   userName: 'Anonymous',
      // }));
    }

    // else {
    //   this.hasGuestdata = false;
    // }

    if (userData) {
      // this.data = userdata.map(data => ({
      //   ...data,
      //   userType: 'user',
      //   userName: this._userName,
      // }));
    }

    // this.data.forEach(data => {
    //   this._renderPin(data);
    // });
  }

  getURLpath(pathName) {
    return window.location.pathname.includes(pathName);
  }
}

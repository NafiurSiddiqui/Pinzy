// let dataState = [];

// export { dataState };

export default class Model {
  _userName;
  _dataState = [];

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
  saveToLocalStorage(userType, data) {
    //update this.dataState
    // this._dataState.push(data);
    // console.log(this._dataState);
    // localStorage.setItem(userType, JSON.stringify(this._dataState));
  }

  getLocalStorage() {
    const guestData = JSON.parse(localStorage.getItem('guest'));
    const userData = JSON.parse(localStorage.getItem('user'));

    if (guestData) {
      // this.hasGuestdata = true;
      console.log(this._dataState);
      this._dataState.push(guestData);
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

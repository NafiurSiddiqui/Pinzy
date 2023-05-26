/**
 * @mapEvent {object}
 */

export default class Model {
  data = [];
  _userName;

  constructor() {
    this.getUserName = this.getUserName.bind(this);
    this.getUserName();
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

  setLocalStorage(data) {
    localStorage.setItem(this.userType, JSON.stringify(data));
  }

  getLocalStorage() {
    const guestdata = JSON.parse(localStorage.getItem('guest'));
    const userdata = JSON.parse(localStorage.getItem('user'));

    if (guestdata) {
      this.hasGuestdata = true;

      this.data = guestdata.map(data => ({
        ...data,
        userType: 'guest',
        userName: 'Anonymous',
      }));
    } else {
      this.hasGuestdata = false;
    }

    if (userdata) {
      this.data = userdata.map(data => ({
        ...data,
        userType: 'user',
        userName: this._userName,
      }));
    }

    console.log(this.data);

    this.data.forEach(data => {
      this._renderPin(data);
    });
  }

  getURLpath(pathName) {
    return window.location.pathname.includes(pathName);
  }
}

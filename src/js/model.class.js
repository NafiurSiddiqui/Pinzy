/**
 * @mapEvent {object}
 */

class Model {
  pins = [];
  eventTypeEl = document.getElementById('eventType');
  messageEl = document.getElementById('message');
  // mapEvent;
  constructor(mapEvent) {
    this.mapEvent = mapEvent;
  }

  //submit form
  submitToDb() {
    //DID not prevent default refresh, since without refresh the content editor does not work.

    //get the values
    const event = eventTypeEl.value;
    const message = messageEl.value;

    const eventTypeIcon =
      eventTypeEl.options[eventTypeEl.selectedIndex].dataset.icon;
    const eventTypeColor =
      eventTypeEl.options[eventTypeEl.selectedIndex].dataset.color;
    const { lat, lng } = this.mapEvent.latlng;

    //sanitize input
    const sanitizedTextAreaValue = message.trim().replace(/<[^>]*>/g, '');

    //values would be different if user
    /**
     * id: user? from Db : generateId
     */
    const values = {
      event,
      id: Math.floor(Math.random() * 100) + 1,
      icon: eventTypeIcon,
      color: eventTypeColor,
      message: sanitizedTextAreaValue,
      coords: [lat, lng],
    };

    //check the usertype
    // this.userType === 'user'? //send to connectToDb(user):connectToDb(guest);

    // Add new object to pin array
    this.pins.push(values);

    //set to local storage
    this._setLocalStorage();

    //clear inputs
    eventTypeEl.value = messageEl.value = '';
    //render pin count
    this._renderPinCount();

    //hideInput
    this._hideInput();
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
      this.userName = userName;
    } else if (getUserNameFromStorage) {
      //get from localStorage
      this.userName = getUserNameFromStorage;
    } else {
      //remove name from local Storage
      localStorage.removeItem('userName');
      this.username = 'userName';
    }
  }

  getDate() {
    //get current date
    function getOrdinalIndicator(day) {
      var indicator = 'th';
      if (day === 1 || day === 21 || day === 31) {
        indicator = 'st';
      } else if (day === 2 || day === 22) {
        indicator = 'nd';
      } else if (day === 3 || day === 23) {
        indicator = 'rd';
      }
      return indicator;
    }

    var currentDate = new Date();
    var day = currentDate.getDate();
    var ordinalIndicator = getOrdinalIndicator(day);
    var formattedDate = `
      ${day} 
      ${ordinalIndicator} 
      
      ${currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}`;
    return formattedDate;
  }

  getTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var formattedTime = ` ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} hrs`;

    return formattedTime;
  }

  _setLocalStorage() {
    localStorage.setItem(this.userType, JSON.stringify(this.#pins));
  }

  _getLocalStorage() {
    const guestPins = JSON.parse(localStorage.getItem('guest'));
    const userPins = JSON.parse(localStorage.getItem('user'));

    if (guestPins) {
      this.hasGuestPins = true;

      this.#pins = guestPins.map(pin => ({
        ...pin,
        userType: 'guest',
        userName: 'Anonymous',
      }));
    } else {
      this.hasGuestPins = false;
    }

    if (userPins) {
      this.#pins = userPins.map(pin => ({
        ...pin,
        userType: 'user',
        userName: this.userName,
      }));
    }

    console.log(this.#pins);

    this.#pins.forEach(pin => {
      this._renderPin(pin);
    });
  }

  getURLpath(pathName) {
    return window.location.pathname.includes(pathName);
  }
}

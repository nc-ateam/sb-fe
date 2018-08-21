import delay from './delay';

// This file mocks a web API by working with the hardcoded data below.
// It uses setTimeout to simulate the delay of an async call.
// All calls return promises.

const cities = [
  {
    _id: '5b7be7f39775a142c172d216',
    geolocation: [-2.2426, 53.4808],
    city: 'Manchester',
    picture_url: 'www.pictureurl.com',
    belongs_to: {
      _id: '5b7be7f39775a142c172d214',
      geolocation: ['0.1278', '51.5074'],
      country: 'United Kingdom',
      picture_url: 'www.pictureurl.com',
      __v: 0
    },
    __v: 0
  },
  {
    _id: '5b7be7f39775a142c172d217',
    geolocation: [-2.0215345, 53.4405305],
    city: 'Broadbottom',
    picture_url: 'www.pictureurl.com',
    belongs_to: {
      _id: '5b7be7f39775a142c172d214',
      geolocation: [0.1278, 51.5074],
      country: 'United Kingdom',
      picture_url: 'www.pictureurl.com',
      __v: 0
    },
    __v: 0
  }
];

class CitiesApi {
  static getAllCities() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], cities));
      }, delay);
    });
  }
}

export default CitiesApi;

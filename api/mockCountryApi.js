import delay from './delay';

// This file mocks a web API by working with the hardcoded data below.
// It uses setTimeout to simulate the delay of an async call.
// All calls return promises.

const countries = [
  {
    _id: '5b7be7f39775a142c172d214',
    geolocation: [0.1278, 51.5074],
    country: 'United Kingdom',
    picture_url: 'www.pictureurl.com',
    __v: 0
  },
  {
    _id: '5b7be7f39775a142c172d215',
    geolocation: [2.2069771, 48.8587741],
    country: 'France',
    picture_url: 'www.pictureurl.com',
    __v: 0
  }
];

// This would be done server-side on the real app.

class CountryApi {
  static getAllCountries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], countries));
      }, delay);
    });
  }
}

export default CountryApi;

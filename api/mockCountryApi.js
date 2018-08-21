import delay from './delay';

// This file mocks a web API by working with the hardcoded data below.
// It uses setTimeout to simulate the delay of an async call.
// All calls return promises.

const countries = [
  {
    _id: 'D9aZZ9smn1392m1124d923hzg',
    country: 'United Kingdom',
    picture_url: 'www.pictureurl.com/uk'
  },
  {
    _id: 'D9aZZ9smn1392m1124d923hzA',
    country: 'France',
    picture_url: 'www.pictureurl.com/fr'
  },
  {
    _id: 'D9aZZ9smn1392m1124d923hzP',
    country: 'Germany',
    picture_url: 'wwww.pictureurl.com/de'
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

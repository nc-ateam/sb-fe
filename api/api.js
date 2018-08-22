export const fetchLandmarksByCity = cityId => {
  return fetch(
    `https://stamp-book-api.herokuapp.com/api/cities/${cityId}/landmarks`
  )
    .then(response => response.json())
    .then(responseJson => responseJson.landmarks);
};

export const fetchAllCountries = () => {
  return fetch("https://stamp-book-api.herokuapp.com/api/countries")
    .then(response => response.json())
    .then(responseJson => responseJson.countries);
};

export const fetchCitiesByCountry = countryId => {
  return fetch(
    `https://stamp-book-api.herokuapp.com/api/countries/${countryId}/cities`
  )
    .then(response => response.json())
    .then(responseJson => responseJson.cities);
};

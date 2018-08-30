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

export const fetchAllPhotosByUser = userId => {
  return fetch(
    `https://stamp-book-api.herokuapp.com/api/users/${userId}/photos`
  )
    .then(response => response.json())
    .then(responseJson => responseJson.photos);
};

export const fetchAllUsers = () => {
  return fetch("https://stamp-book-api.herokuapp.com/api/users")
    .then(response => response.json())
    .then(responseJson => responseJson.users);
};

export const fetchSingleUser = userId => {
  return fetch(`https://stamp-book-api.herokuapp.com/api/users/${userId}`)
    .then(response => response.json())
    .then(responseJson => responseJson.user);
};

export const fetchLandmarksByCity = cityId => {
  return fetch(
    `https://stamp-book-api.herokuapp.com/api/cities/${cityId}/landmarks`
  )
    .then(response => response.json())
    .then(responseJson => responseJson.landmarks);
};

export const fetchAllCountries = () => {
  return fetch(
    `https://stamp-book-api.herokuapp.com/api/cities/${cityId}/landmarks`
  )
    .then(response => response.json())
    .then(responseJson => responseJson.cities);
};

import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_TrUmPQcnCEc8jGCNIRku1xEowutvx2XMu16hTjzReV3yhorimimEPeyffpDzbg7z';

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Server Error',
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error);
    });
}

function fetchCatByBreed(breedId) {
  const getImage = fetch('https://api.thecatapi.com/v1/images/search', {
    headers: {
      breed_ids: breedId,
      api_key:
        'live_TrUmPQcnCEc8jGCNIRku1xEowutvx2XMu16hTjzReV3yhorimimEPeyffpDzbg7z',
    },
  });
  const getInfo = fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`);

  return Promise.all([getImage, getInfo])
    .then(responses =>
      Promise.all(
        responses.map(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
      )
    )
    .catch(error => {
      Notiflix.Report.failure(
        'Server Error',
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error);
    });
}

export { fetchBreeds, fetchCatByBreed };

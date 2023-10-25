import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

export const refs = {
  loader: document.querySelector('.loader-container'),
  select: document.querySelector('.breed-select'),
  container: document.querySelector('.select-container'),
  info: document.querySelector('.cat-info'),
};

export const slimSelect = new SlimSelect({
  select: '.breed-select',
  settings: {
    showSearch: false,
    placeholderText: 'Select cat breed',
  },
});

fetchBreeds()
  .then(cats => {
    refs.loader.classList.add('visually-hidden');
    refs.container.classList.remove('visually-hidden');
    getOptions(cats);
  })
  .catch(error => {
    refs.container.classList.add('visually-hidden');
    console.log(error);
  });

function getOptions(cats) {
  const options = cats.map(cat => {
    const optObject = {};
    optObject.text = `${cat.name}`;
    optObject.value = `${cat.id}`;
    return optObject;
  });
  options.unshift({ text: '', value: '', placeholder: true });
  slimSelect.setData(options);
}

refs.select.addEventListener('change', getCatsInfo);

function getCatsInfo(e) {
  if (e.target.selectedIndex === 0) {
    return;
  }

  const collection = e.target.options;
  const option = collection[e.target.selectedIndex];
  refs.info.innerHTML = '';

  refs.loader.classList.remove('visually-hidden');
  fetchCatByBreed(option.value)
    .then(cat => {
      refs.loader.classList.add('visually-hidden');
      refs.info.classList.remove('visually-hidden');
      getCat(cat);
    })
    .catch(error => {
      refs.info.classList.add('visually-hidden');
      refs.container.classList.add('visually-hidden');
      console.log(error);
    });
}

function getCat(cat) {
  const { url } = cat[0][0];
  const { name, description, temperament } = cat[1];
  const markup = `<img src='${url}' alt='${name}' width='500' height='400'>
                   <div class="card-content">
                      <h2>${name}</h2> 
                      <p>${description}</p>
                      <p><span class="bold">Temperament:</span> ${temperament}</p>
                   </div>`;
  refs.info.insertAdjacentHTML('afterbegin', markup);
}

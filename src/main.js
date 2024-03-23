import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


import { renderImgs } from './js/render-functions';
import { fetchImg } from './js/pixabay-api';

const form = document.querySelector('form');
const gallery = document.querySelector('ul.gallery');
const flowerSpinner = document.querySelector('.flower-spinner');

const showLoader = () => {
  flowerSpinner.style.display = 'flex';
};

const hideLoader = () => {
  flowerSpinner.style.display = 'none';
};

const handleLoad = () => {
  document.body.classList.add('loaded');
  document.body.classList.remove('loaded_hiding');
};

window.onload = handleLoad;

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const searchQuery = event.currentTarget.querySelector('input').value.trim();

  if (!searchQuery) {
    iziToast.error({
      color: 'yellow',
      message: ` Please fill in the field for search query.`,
      position: 'topRight',
    });
    gallery.innerHTML = '';
    return;
  }

  showLoader();
  try {
    const images = await fetchImg(searchQuery);
    renderImgs(images);
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `❌ Sorry, there was a mistake. Please try again!`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    handleLoad();
    form.reset();
  }
};

form.addEventListener('submit', handleFormSubmit);


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

const refreshLightbox = () => {
  lightbox.refresh();
};

export { refreshLightbox };
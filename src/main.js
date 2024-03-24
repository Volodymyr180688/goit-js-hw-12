import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { renderImgs, gallery } from './js/render-functions';
import { fetchImg } from './js/pixabay-api';

const form = document.querySelector('form');
const flowerSpinner = document.querySelector('.flower-spinner');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = '';

const showLoader = () => {
  flowerSpinner.style.display = 'flex';
};

const hideLoader = () => {
  flowerSpinner.style.display = 'none';
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;

  searchQuery = event.currentTarget.elements.query.value.trim();

  if (!searchQuery) {
    iziToast.error({
      color: 'yellow',
      message: ` Please fill in the field for search query.`,
      position: 'topRight',
    });
    return;
  }

  showLoader();
  try {
    const images = await fetchImg(searchQuery, currentPage);
    if (images.hits.length === 0) {
          iziToast.error({
      color: 'red',
      message: "Sorry, there are no images matching your search query. Please try again!",
      position: 'topRight',      
    });
      return;
    }
    renderImgs(images);

    if (images.totalHits > 15) {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `❌ Sorry, there was a mistake. Please try again!`,
      position: 'topRight',      
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

form.addEventListener('submit', handleFormSubmit);

const handleLoadMore = async (event) => {

  currentPage += 1;

  showLoader();

  try {
    const images = await fetchImg(searchQuery, currentPage);
    const totalPages = Math.ceil(images.totalHits / 15);
    renderImgs(images);
    smoothScroll();
    if (currentPage === totalPages) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        color: "yellow",
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      })
    }

  } catch (error) {
  
    iziToast.error({
      color: 'red',
      message: `❌ Sorry, there was a mistake. Please try again!`,
      position: 'topRight',      
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

loadMoreBtn.addEventListener("click", handleLoadMore);
 
function smoothScroll() {
    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
  top: height * 2,
  behavior: "smooth",
});

}
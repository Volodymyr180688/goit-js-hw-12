import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

export const gallery = document.querySelector('ul.gallery');

export function renderImgs(images) {

  const imgGallery = images.hits
    .map(
      image => `<li class="img-blok">
        <a href="${image.largeImageURL}">     
          <img  src="${image.webformatURL}"
            data-source="${image.largeImageURL}"
            alt="${image.tags}">
          <ul class="image-descript">
            <li>
              <h3>likes</h3>
              <p>${image.likes}</p>
            </li>
            <li>
              <h3>views</h3>
              <p>${image.views}</p>
            </li>
            <li>
              <h3>comments</h3>
              <p>${image.comments}</p>
            </li>
            <li>
              <h3>downloads</h3>
              <p>${image.downloads}</p>
            </li>
          </ul>
        </a>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', imgGallery);

  lightbox.refresh();
}
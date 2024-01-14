import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const PIXABEY_API = '41780713-d9d59fd8c4b13cd5ac9a220da';
const galleryEl = document.querySelector('.gallery');
const loadMoreWrapper = document.querySelector('.load-more-wrapper');
const loaderWrapper = document.querySelector('.loader-wrapper');
const loadMoreBtn = document.querySelector('button.load-more');
const form = document.querySelector('.search-form');
const noMore = document.querySelector('.no-more');
const gallery = new SimpleLightbox('.gallery li a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let images = [];
let page = 1;
let oldQuery = '';
const perPage = 40;

async function searchImages() {
  const query = document.querySelector('.search-form input').value;

  if (query === '') {
    return iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
  }

  if (oldQuery !== query) {
    images = [];
    page = 1;
    oldQuery = query;
  } else {
    page += 1;
  }

  noMore.classList.remove('is-active');
  loadMoreWrapper.classList.add('is-hidden');
  loaderWrapper.classList.add('is-active');

  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: PIXABEY_API,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        pretty: true,
        safesearch: true,
        per_page: perPage,
        page,
      },
    });

    images.push(...response.data.hits);

    loaderWrapper.classList.remove('is-active');
    loadMoreWrapper.classList.remove('is-hidden');

    if (response.data.hits.length < perPage) {
      loadMoreWrapper.classList.add('is-hidden');
      noMore.classList.add('is-active');
    }
  } catch (error) {
    console.log(error);
    loaderWrapper.classList.remove('is-active');
  }
}

async function buildGallery(query) {
  const markup = images
    .map(img => {
      return `
        <li class="gallery-item">
            <a class="gallery-link" href="${img.largeImageURL}">
            <img
                class="gallery-image"
                src="${img.webformatURL}"
                alt="${img.tags}"
            />
            </a>
        </li>
        `;
    })
    .join('');

  galleryEl.innerHTML = markup;

  if (images.length === 0) {
    return iziToast.error({
      title: 'Error',
      message: 'No images found for this request',
    });
  }

  gallery.refresh();

  const cardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  await searchImages();
  await buildGallery();
});

loadMoreBtn.addEventListener('click', async () => {
  await searchImages();
  await buildGallery();
});

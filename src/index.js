import { refs } from './js/refs';
import apiService from './js/apiService';
import { createMarkup } from './js/create-markup';
import LoadMoreBtn from './components/load-more-button';
import './styles.scss';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchMoreImages);

function onSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.searchQuery = form.elements.query.value;

  clearGallery();
  apiService.resetPage();
  fetchMoreImages();
  form.reset();
}

function fetchMoreImages() {
  loadMoreBtn.disable();

  apiService.fetchImages().then(images => {
    if (!images) return;
    createMarkup(images);
    loadMoreBtn.show();
    loadMoreBtn.enable();
    scrollTo();
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scrollTo() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}

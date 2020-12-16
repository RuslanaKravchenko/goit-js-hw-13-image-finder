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
  fetchMoreImages(event);
  form.reset();
}

function fetchMoreImages(event) {
  loadMoreBtn.disable();

  apiService.fetchImages().then(images => {
    if (images.length === 0) {
      refs.gallery.innerHTML =
        '<h1 class="error"><span class="smille">😔 </span>No results were found for your search</h1>';
      loadMoreBtn.hide();
      return;
    }
    createMarkup(images);
    loadMoreBtn.show();
    loadMoreBtn.enable();

    if (
      event.target === loadMoreBtn.refs.button ||
      event.target === loadMoreBtn.refs.label
    ) {
      scrollBy();
    }
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scrollBy() {
  window.scrollBy({
    top: document.documentElement.clientHeight,
    behavior: 'smooth',
  });
}

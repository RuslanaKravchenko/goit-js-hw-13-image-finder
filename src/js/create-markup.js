import { refs } from './refs';
import imageTpl from '../templates/imageTpl.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

export function createMarkup(images) {
  const markup = imageTpl(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
refs.gallery.addEventListener('click', openModal);

function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    const instance = basicLightbox.create(`
        <img src="${e.target.dataset.img}" width="800" height="600">`);
    instance.show();
  }
}

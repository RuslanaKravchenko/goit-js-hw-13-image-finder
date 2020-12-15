import axios from 'axios';

const apiKey = '19509532-9c10a3c2f413abf8ad2252df8';

export default {
  searchQuery: '',
  page: 1,

  async fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;
    const response = await axios.get(url);
    const images = response.data.hits;
    this.incrementPage();
    return images;
  },

  resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};

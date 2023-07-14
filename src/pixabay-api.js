import axios from "axios";

const apiKey = "38102784-37e9ad2cc652dbc0da2d9323c";

async function getImages(searchTerm, page, perPage) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export { getImages };

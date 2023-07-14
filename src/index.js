import { getImages } from "./pixabay-api";
import Notiflix from "notiflix";

const loadMoreButton = document.querySelector(".load-more");
const galleryDiv = document.querySelector(".gallery");

loadMoreButton.style.visibility = "hidden";
const form = document.querySelector(".search-form");
let page = 1;
const perPage = 40;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchInput = document.getElementsByName("searchQuery");
  const searchTerm = searchInput[0].value;

  page = 1;

  const response = await getImages(searchTerm, page, perPage);

  if (response.totalHits === 0) {
    Notiflix.Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
    galleryDiv.innerHTML = "";
    loadMoreButton.style.visibility = "hidden";
    return;
  }

  updateHtml(response);
});

function updateHtml(response) {
  galleryDiv.innerHTML = "";
  for (const image of response.hits) {
    const photoCardDiv = document.createElement("div");
    photoCardDiv.classList.add("photo-card");

    const img = document.createElement("img");
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = "lazy";

    photoCardDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    infoDiv.appendChild(getInfoItem("Likes", image.likes));
    infoDiv.appendChild(getInfoItem("Views", image.views));
    infoDiv.appendChild(getInfoItem("Comments", image.comments));
    infoDiv.appendChild(getInfoItem("Downloads", image.downloads));

    photoCardDiv.appendChild(infoDiv);

    galleryDiv.appendChild(photoCardDiv);
  }

  loadMoreButton.style.visibility = "visible";
}

function getInfoItem(content, value) {
  const p = document.createElement("p");
  p.classList.add("info-item");
  p.innerHTML = `<b>${content}</b>: ${value}`;

  return p;
}

loadMoreButton.addEventListener("click", async () => {
  const searchInput = document.getElementsByName("searchQuery");
  const searchTerm = searchInput[0].value;

  page = page + 1;
  const response = await getImages(searchTerm, page, perPage);
  if (page * perPage > response.totalHits) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );

    return;
  }

  updateHtml(response);
});

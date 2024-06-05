import "./style.css";

const content = null || document.getElementById("content");
const primaryHeader = document.querySelector(".primary-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const apiUrl =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCQX_MZRCaluNKxkywkLEgfA&part=snippet%2Cid&order=date&maxResults=9";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5a131c8900mshcc6ef9c0e4b536ap1ec90cjsnde4d54db9b1d",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

navToggle.addEventListener("click", () => {
  //primaryNav.classList.toggle("opened");
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute("aria-expanded", false)
    : navToggle.setAttribute("aria-expanded", true);
  primaryNav.toggleAttribute("data-visible");
  primaryHeader.toggleAttribute("data-overlay");
});

async function fetchData(apiUrl) {
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  return data;
}

async function fetchImages() {
  try {
    const videos = await fetchData(apiUrl);
    let view = ` 
    ${videos.items
      .map(
        (video) => ` <li  class="carousel__slide">
    <img class="carousel__image" src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" />
    <h3>${video.snippet.title}</h3>
  </li>`
      )
      .join("")}
   `;
    content.innerHTML = view;
  } catch (error) {}
}

await fetchImages();

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
console.log(slides);

//cpc-holiday-card //codepenchallenge
const params = new URLSearchParams(window.location.search);
const sliderId = 0;
const nameInput = document.getElementById("nameInput");
const authorInput = document.getElementById("authorInput");
const link = document.getElementById("link");
const name = document.getElementById("name");
const text = document.getElementById("text");
const author = document.getElementById("author");

const slides = [
  { image: "./3.jpeg", heading: "Sunset over the mountains" },
  { image: "./3.jpeg", heading: "City skyline at night" },
  { image: "./3.jpeg", heading: "Beach with palm trees" },
];

const status = params.get("status");
if (status === "sent") {
  const card = document.getElementById("card");
  card.classList.add("sent-off");
  console.log(params.get("name"));
  name.innerHTML = params.get("name") || "dear friend";
  author.innerHTML = params.get("author") || "Brawada";
  const sliderId = +params.get("slider_id") || 0;
  text.innerHTML = slides[sliderId];
} else {
  slides.forEach((slide) => {
    const slideWrapper = document.getElementsByClassName("swiper-wrapper");
    const swiperSlide = document.createElement("div");
    swiperSlide.setAttribute("class", "swiper-slide");
    const image = document.createElement("img");
    image.setAttribute("src", slide.image);
    image.setAttribute("alt", slide.heading);
    swiperSlide.appendChild(image);
    const heading = document.createElement("h2");
    heading.textContent = slide.heading;
    swiperSlide.appendChild(heading);
    slideWrapper.appendChild(swiperSlide);
  });

  const mySwiper = new Swiper(".swiper-container", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    mousewheel: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: sliderId,
    coverflowEffect: {
      rotate: -30,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false
    },

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true
    }
  });

  function stateChange() {
    const name = encodeURIComponent(nameInput.value);
    const author = encodeURIComponent(authorInput.value);
    const index = mySwiper.realIndex;
    link.href = `https://codepen.io/Anna_Batura/full/WNGMerN?name=${name}&author=${author}&slider_id=${index}&status=sent`;
  }

  mySwiper.on("slideChange", stateChange);
  nameInput.addEventListener("input", stateChange);
  authorInput.addEventListener("input", stateChange);
}


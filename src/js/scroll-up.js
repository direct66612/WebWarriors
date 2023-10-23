let scrollButton = document.querySelector(".top-button");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

scrollButton.addEventListener("click", backToTop);

function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
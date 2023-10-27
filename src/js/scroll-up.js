let scrollButton = document.querySelector(".top-button");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollButton.style.opacity = 1;
  } else {
    scrollButton.style.opacity = 0;
  }
}

scrollButton.addEventListener("click", function() {
  backToTop();
  scrollButton.blur();
});

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
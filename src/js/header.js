const mobileMenu = document.querySelector('[data-menu]');
const openMenuBtn = document.querySelector('[data-menu-open]');
const closeMenuBtn = document.querySelector('[data-menu-close]');
const openMobileMenuLink = document.querySelector('.menu-box-link');
const openMobileMenuLinkS = document.querySelector('.menu-box-link--s');

const toggleMenu = () => {
  // const isMenuOpen =
  //   //   openMenuBtn.getAttribute("aria-expanded") === "true" || false;
  //   // openMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
  //   mobileMenu.classList.toggle("is-open");
  // document.body.classList.toggle("no-scroll");
  // document.body.classList.toggle("modal-open");
  // const scrollLockMethod = !isMenuOpen
  //   ? "disableBodyScroll"
  //   : "enableBodyScroll";
  // // bodyScrollLock[scrollLockMethod](document.body);
  mobileMenu.classList.toggle('is-open');
};

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
openMobileMenuLink.addEventListener('click', toggleMenu);
openMobileMenuLinkS.addEventListener('click', toggleMenu);

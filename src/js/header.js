import lodash from 'lodash';

const mobileMenu = document.querySelector('[data-menu]');
const openMenuBtn = document.querySelector('[data-menu-open]');
const closeMenuBtn = document.querySelector('[data-menu-close]');
const openMobileMenuLink = document.querySelector('.menu-box-link');
const openMobileMenuLinkS = document.querySelector('.menu-box-link--s');

const toggleMenu = () => {
  mobileMenu.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
};

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
openMobileMenuLink.addEventListener('click', toggleMenu);
openMobileMenuLinkS.addEventListener('click', toggleMenu);

const toEscPress = evt => {
  if (evt.key === 'Escape') {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
};

document.body.addEventListener('keyup', toEscPress);

const onWindowResize = function () {
  if (document.body.offsetWidth > 767) {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
};

window.addEventListener('resize', lodash.throttle(onWindowResize, 250));

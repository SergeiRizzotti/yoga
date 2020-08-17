// Slick slider
$(function () {
  $('.about__slider').slick({
    infinite: true,
    fade: true,
    speed: 300,
    slidesToShow: 1,
    prevArrow:
      '<img class="slider-arrows slider-arrows__left" src="./img/bt-arrow-prew.svg" alt="">',
    nextArrow:
      '<img class="slider-arrows slider-arrows__right" src="./img/bt-arrow-next.svg" alt="">',
  });

  $('.blog__slider').slick({
    infinite: true,
    fade: true,
    speed: 300,
    slidesToShow: 1,
    dots: true,
    arrows: false,
    asNavFor: '.slider-next-foto',
    customPaging: function () {
      return '<img src="./img/slide-dot.png" /><img src="./img/slide-dot-active.png" />';
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {},
      },
    ],
  });

  $('.slider-next-foto').slick({
    infinite: true,
    fade: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.blog__slider',
    prevArrow:
      '<img class="slider-next-foto__arrows slider-next-foto-arrows__left" src="./img/bt-arrow-prew.svg" alt="">',
    nextArrow:
      '<img class="slider-next-foto__arrows slider-next-foto-arrows__right" src="./img/bt-arrow-next.svg" alt="">',
  });

  jQuery(window).scroll(function () {
    var $sections = $('section');
    $sections.each(function (_, el) {
      var top = $(el).offset().top - 150;
      var bottom = top + $(el).height();
      var scroll = $(window).scrollTop();
      var id = $(el).attr('id');
      if (scroll > top && scroll < bottom) {
        $('a.active').removeClass('active');
        $('a[href="#' + id + '"]').addClass('active');
      }
    });
  });

  $('.nav-item').on('click', 'a', function (event) {
    event.preventDefault();

    var id = $(this).attr('href'),
      top = $(id).offset().top - 120;

    $('body,html').animate({scrollTop: top}, 800);
  });

  $('.head-content__custom-select').select2({
    placeholder: 'Chose your class',
    width: '100%',
  });
});

// Decrease and increase in size header
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop >= header.clientHeight) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
});

// Validate form
const form = document.getElementById('form');
const userName = document.getElementById('form__name');
const userPhone = document.getElementById('form__phone');
const customSelect = document.getElementById('custom-select');
const btnFormSubmit = document.getElementById('form_submit');

if (btnFormSubmit) {
  btnFormSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    checkInput();
  });
}

function checkInput() {
  const userNameValue = userName.value.trim();
  const userPhoneValue = userPhone.value.trim();
  const customSelectValue = customSelect.value.trim();

  if (userNameValue === '') {
    setErrorFor(userName, 'Field name cannot be blank.');
  } else {
    setSuccessFor(userName);
  }

  if (userPhoneValue === '') {
    setErrorFor(userPhone, 'Field phone cannot be blank.');
  } else if (!isPhone(userPhoneValue)) {
    setErrorFor(userPhone, 'Not a valid phone number.');
  } else {
    setSuccessFor(userPhone);
  }

  if (customSelectValue === '') {
    setErrorFor(customSelect, 'Field class cannot be blank.');
  } else {
    setSuccessFor(customSelect);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isPhone(phoneNumber) {
  return /^\+380\d{3}\d{2}\d{2}\d{2}$/.test(phoneNumber);
}

// Active toogle menu
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
  if (menu.classList.value === 'menu') {
    menu.className = 'menu active';
    menuBtn.classList = 'menu-btn active';
  } else {
    menu.className = 'menu';
    menuBtn.classList = 'menu-btn';
  }
});

menu.addEventListener('click', () => {
  if (menu.classList.value === 'menu active') {
    menu.className = 'menu';
    menuBtn.classList = 'menu-btn';
  }
});

//task_1 fixed header
window.onscroll = function showHeader() {
  const header = document.querySelector(".header");
  if (window.pageYOffset > 120) {
    header.classList.add("header_fixed");
  } else if (window.pageYOffset === 0) {
    header.classList.remove("header_fixed");
  }
};

//task_2 change block
const cards = document.querySelectorAll(".our-services__card");

if (cards) {
  for (let card of cards) {
    let isActiveMouseOver = false;

    function makeActive(element) {
      element.classList.add("active-card");
      let childs = element.children;
      childs[0].src = `../static/svg/services/service-white_smartphone.svg`;
      childs[1].style.color = "white";
      childs[3].style.color = "white";
      childs[5].style.color = "white";
      childs[5].style.borderColor = "white";
    }

    function makeNotActive(element) {
      element.classList.remove("active-card");
      let childs = element.children;
      childs[0].src = `../static/svg/services/service-black_smartphone.svg`;
      childs[1].style.color = "black";
      childs[3].style.color = "black";
      childs[5].style.color = "black";
      childs[5].style.borderColor = "black";
    }

    //функция проверяющая если страница в мобильной версии и пользователь кликнул на
    //кнопку read More то не делать карту активной, а просто отображать текст.
    function isMobileButton(event) { 
      if(document.documentElement.clientWidth < 769) {
        if(event.target.classList.contains('card__button')){
          return true;
        }
      }
      return false;
    }

    card.addEventListener("click", function (event) {
      if(isMobileButton(event)) return;
      for (let card of cards) {
        if (
          card === event.currentTarget &&
          card.classList.contains("active-card") !== true
        ) {
          makeActive(card);
          isActiveMouseOver = true;
          continue;
        } else if (
          card === event.currentTarget &&
          card.classList.contains("active-card") === true
        ) {
          isActiveMouseOver = true;
          continue;
        }
        makeNotActive(card);
      }
    });

    card.addEventListener("mouseover", function (event) {
      if(isMobileButton(event)) return;
      if (event.currentTarget.classList.contains("active-card") === true) {
        isActiveMouseOver = true;
        return;
      }
      makeActive(event.currentTarget);
    });

    card.addEventListener("mouseout", function (event) {
      if(isMobileButton(event)) return;
      if (isActiveMouseOver === true) {
        isActiveMouseOver = false;
        return;
      }
      makeNotActive(event.currentTarget);
    });
  }
}


///------------

const planRate = document.querySelectorAll(".plan__rate");

if (planRate) {
  for (let plan of planRate) {
    let isActiveMouseOver = false;

    function makeActive(element) {
      const planButton = element.children[1].children[1];
      element.classList.add("plan__rate-active");
      planButton.classList.add("active-button");
    }

    function makeNotActive(element) {
      const planButton = element.children[1].children[1];
      element.classList.remove("plan__rate-active");
      planButton.classList.remove("active-button");
    }

    plan.addEventListener("click", function (event) {
      console.log(event.target);
      if(event.target.classList.contains('slide__arrow-pict')) return;
      for (let plan of planRate) {
        if (
          plan === event.currentTarget &&
          plan.classList.contains("plan__rate-active") !== true
        ) {
          makeActive(plan);
          isActiveMouseOver = true;
          continue;
        } else if (
          plan === event.currentTarget &&
          plan.classList.contains("plan__rate-active") === true
        ) {
          isActiveMouseOver = true;
          continue;
        }
        makeNotActive(plan);
      }
    });

    plan.addEventListener("mouseover", function (event) {
      if(event.target.classList.contains('slide__arrow-pict')) return;
      if (event.currentTarget.classList.contains("plan__rate-active") === true) {
        isActiveMouseOver = true;
        return;
      }
      makeActive(event.currentTarget);
    });

    plan.addEventListener("mouseout", function (event) {
      if(event.target.classList.contains('slide__arrow-pict')) return;
      if (isActiveMouseOver === true) {
        isActiveMouseOver = false;
        return;
      }
      makeNotActive(event.currentTarget);
    });
  }
}

//form check

const landingForm = document.forms.feedback;

for (let i = 0; i < 3; i++) {
  function isInputsEmpty() {
    if (
      landingForm[0].value !== "" &&
      landingForm[1].value !== "" &&
      landingForm[2].value !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  const submitButton = landingForm[4];

  landingForm[i].addEventListener("input", function (evetn) {
    if (isInputsEmpty()) {
      submitButton.removeAttribute("disabled", false);
    } else {
      submitButton.setAttribute("disabled", true);
    }
  });
}

//burger menu

const burger = document.querySelector(".header__burger");
const navigationMenu = document.querySelector(".header__navigation");
if (burger) {
  burger.addEventListener("click", function (event) {
    document.body.classList.toggle("page-lock");
    burger.classList.toggle("header__burger-active");
    navigationMenu.classList.toggle("header__navigation-active");
  });
}

//прокрутка при клике

const menuLinks = document.querySelectorAll('.header__link[data-goto]')
if(menuLinks) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', function(event) {
      const menuLink = event.target;
      if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;


        if(burger.classList.contains('header__burger-active')) {
          document.body.classList.remove("page-lock");
          burger.classList.remove("header__burger-active");
          navigationMenu.classList.remove("header__navigation-active");
        }

        window.scrollTo({
          top: gotoBlockValue,
          behavior: 'smooth'
        });
        event.preventDefault();

      }
    })
  })
}


//hide and show block

const aboutUsArrow = document.querySelector('.about-us__arrow');

aboutUsArrow.addEventListener('click', function(event) {

  if(event.currentTarget.classList.contains('about-us__arrow-active')) {

    const content = document.querySelector('.about-us__content');
    content.style.display = 'none';

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-down.png'
    event.currentTarget.classList.remove('about-us__arrow-active')
  }
  else {

    const content = document.querySelector('.about-us__content');
    content.style.display = 'flex'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-up.png'
    event.currentTarget.classList.add('about-us__arrow-active');
  }

});

const ourServicesArrow = document.querySelector('.our-services__arrow');

ourServicesArrow.addEventListener('click', function(event) {
  if(event.currentTarget.classList.contains('our-services__arrow-active')) {

    const content = document.querySelector('.our-services__cards');
    content.style.display = 'none';

    const button = document.querySelector('.our-services__button')
    button.style.display = 'none'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-down.png'
    event.currentTarget.classList.remove('our-services__arrow-active')
  }
  else {

    const content = document.querySelector('.our-services__cards');
    content.style.display = 'flex'

    const button = document.querySelector('.our-services__button')
    button.style.display = 'flex'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-up.png'
    event.currentTarget.classList.add('our-services__arrow-active');
  }
});


const planArrow = document.querySelector('.plan__arrow');

planArrow.addEventListener('click', function(event) {

  if(event.currentTarget.classList.contains('plan__arrow-active')) {

    const content = document.querySelector('.plan__content');
    content.style.display = 'none';

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-down.png'
    event.currentTarget.classList.remove('plan__arrow-active')
  }
  else {

    const content = document.querySelector('.plan__content');
    content.style.display = 'flex'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-up.png'
    event.currentTarget.classList.add('plan__arrow-active');
  }
  
});

const ourTeamArrow = document.querySelector('.our-team__arrow');

ourTeamArrow.addEventListener('click', function(event) {
  if(event.currentTarget.classList.contains('our-team__arrow-active')) {

    const content = document.querySelector('.our-team__content');
    content.style.display = 'none';

    const circles = document.querySelector('.our-team__circles')
    circles.style.display = 'none'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-down.png'
    event.currentTarget.classList.remove('our-team__arrow-active')
  }
  else {

    const content = document.querySelector('.our-team__content');
    content.style.display = 'flex'

    const circles = document.querySelector('.our-team__circles')
    circles.style.display = 'flex'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-up.png'
    event.currentTarget.classList.add('our-team__arrow-active');
  }
});

const blogArrow = document.querySelector('.blog__arrow');

blogArrow.addEventListener('click', function(event) {

  if(event.currentTarget.classList.contains('blog__arrow-active')) {

    const content = document.querySelector('.blog__content');
    content.style.display = 'none';

    const button = document.querySelector('.blog__button');
    button.style.display = 'none'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-down.png'
    event.currentTarget.classList.remove('blog__arrow-active')
  }
  else {

    const content = document.querySelector('.blog__content');
    content.style.display = 'flex'

    const button = document.querySelector('.blog__button');
    button.style.display = 'flex'

    event.currentTarget.children[0].src = './static/img/common/arrows/black-arrow-up.png'
    event.currentTarget.classList.add('blog__arrow-active');
  }
  
});

const contactUsArrow = document.querySelector('.contact-us__arrow');

contactUsArrow.addEventListener('click', function(event) {

  if(event.currentTarget.classList.contains('contact-us__arrow-active')) {

    const data = document.querySelector('.contact-us__data');
    data.style.display = 'none';

    const form = document.querySelector('.contact-us__form');
    form.style.display = 'none'

    event.currentTarget.children[0].src = './static/img/common/arrows/white-arrow-down.png'
    event.currentTarget.classList.remove('contact-us__arrow-active')
  }
  else {

    const data = document.querySelector('.contact-us__data');
    data.style.display = 'flex'

    const form = document.querySelector('.contact-us__form');
    form.style.display = 'flex'

    event.currentTarget.children[0].src = './static/img/common/arrows/white-arrow-up.png'
    event.currentTarget.classList.add('contact-us__arrow-active');
  }
  
});


const planRateTopArrow = document.querySelectorAll('.plan__rate-arrow');

for(let currentElementArrow of planRateTopArrow) {
  currentElementArrow.addEventListener('click', function(event) {
    if(event.currentTarget.classList.contains('plan__rate-arrow-active')) {

      const contentBottom = currentElementArrow.parentNode.parentNode.lastElementChild;
      contentBottom.style.display = 'none';
  
      event.currentTarget.children[0].src = './static/img/common/arrows/white-arrow-down.png'
      event.currentTarget.classList.remove('plan__rate-arrow-active')
    }
    else {
  
      const contentBottom = currentElementArrow.parentNode.parentNode.lastElementChild;
      contentBottom.style.display = 'flex';
  
  
      event.currentTarget.children[0].src = './static/img/common/arrows/white-arrow-up.png'
      event.currentTarget.classList.add('plan__rate-arrow-active');
    }
  })
}


function setPlanRateArrowMobile() {
  const planRateTopArrow = document.querySelectorAll('.plan__rate-arrow');
  for(let currentElementArrow of planRateTopArrow) {
    const contentBottom = currentElementArrow.parentNode.parentNode.lastElementChild;
    contentBottom.style.display = 'none';
    currentElementArrow.style.display = 'flex';
    if(currentElementArrow.classList.contains('plan__rate-arrow-active')) {
      currentElementArrow.children[0].src = './static/img/common/arrows/white-arrow-down.png'
      currentElementArrow.classList.remove('plan__rate-arrow-active');
    }
  }
}

function setPlanRateArrowDesktop() {
  const planRateTopArrow = document.querySelectorAll('.plan__rate-arrow');
  for(let currentElementArrow of planRateTopArrow) {
    const contentBottom = currentElementArrow.parentNode.parentNode.lastElementChild;
    contentBottom.style.display = 'flex';
    currentElementArrow.style.display = 'none';
  }
}

function setAboutUsMobile() {
  const content = document.querySelector('.about-us__content');
  content.style.display= 'none';

  const aboutUsArrow = document.querySelector('.about-us__arrow');
  if(aboutUsArrow.classList.contains('about-us__arrow-active')) {
    aboutUsArrow.classList.remove('about-us__arrow-active');
    aboutUsArrow.children[0].src = './static/img/common/arrows/black-arrow-down.png';
  }
  aboutUsArrow.style.display = 'flex';
}

function setAboutUsDesktop() {
    const content = document.querySelector('.about-us__content');
    content.style.display= 'flex';
    const aboutUsArrow = document.querySelector('.about-us__arrow');
    aboutUsArrow.style.display = 'none';
}

function setOurServicesMobile() {
  const content = document.querySelector('.our-services__cards');
  content.style.display = 'none';

  const button = document.querySelector('.our-services__button')
  button.style.display = 'none'

  const ourServicesArrow = document.querySelector('.our-services__arrow');
  if(ourServicesArrow.classList.contains('our-services__arrow-active')) {
    ourServicesArrow.classList.remove('our-services__arrow-active');
    ourServicesArrow.children[0].src = './static/img/common/arrows/black-arrow-down.png';
  }
  ourServicesArrow.style.display = 'flex';
}

function setOurServicesDesktop() {
  const content = document.querySelector('.our-services__cards');
  content.style.display = 'flex'

  const button = document.querySelector('.our-services__button')
  button.style.display = 'flex'

  const ourServicesArrow = document.querySelector('.our-services__arrow');
  ourServicesArrow.style.display = 'none';
}


function setPlanMobile() {
  const content = document.querySelector('.plan__content');
  content.style.display = 'none';
  const planArrow = document.querySelector('.plan__arrow');
  if(planArrow.classList.contains('plan__arrow-active')) {
    planArrow.classList.remove('plan__arrow-active');
    planArrow.children[0].src = './static/img/common/arrows/black-arrow-down.png';
  }
  planArrow.style.display = 'flex';
}

function setPlanDesktop() {
  const content = document.querySelector('.plan__content');
  content.style.display = 'flex'
  const planArrow = document.querySelector('.plan__arrow');
  planArrow.style.display = 'none';
}

function setTeamMobile() {
  const content = document.querySelector('.our-team__content');
  content.style.display = 'none';

  const circles = document.querySelector('.our-team__circles');
  circles.style.display = 'none';

  const ourTeamArrow = document.querySelector('.our-team__arrow');
  if(ourTeamArrow.classList.contains('our-team__arrow-active')) {
    ourTeamArrow.classList.remove('our-team__arrow-active');
    ourTeamArrow.children[0].src = './static/img/common/arrows/black-arrow-down.png';
  }
  ourTeamArrow.style.display = 'flex';
}

function setTeamDesktop() {
  const content = document.querySelector('.our-team__content');
  content.style.display = 'flex'

  const circles = document.querySelector('.our-team__circles')
  circles.style.display = 'flex'

  const ourTeamArrow = document.querySelector('.our-team__arrow');
  ourTeamArrow.style.display = 'none';
}

function setBlogMobile() {
    const content = document.querySelector('.blog__content');
    content.style.display = 'none';

    const button = document.querySelector('.blog__button');
    button.style.display = 'none'

    const blogArrow = document.querySelector('.blog__arrow');
  if(blogArrow.classList.contains('blog__arrow-active')) {
    blogArrow.classList.remove('blog__arrow-active');
    blogArrow.children[0].src = './static/img/common/arrows/black-arrow-down.png';
  }
  blogArrow.style.display = 'flex';
}

function setBlogDesktop() {
  const content = document.querySelector('.blog__content');
    content.style.display = 'flex'

    const button = document.querySelector('.blog__button');
    button.style.display = 'flex'

    const ourBlogArrow = document.querySelector('.blog__arrow');
    ourBlogArrow.style.display = 'none';
}

function setContactMobile() {
  const data = document.querySelector('.contact-us__data');
  data.style.display = 'none';

  const form = document.querySelector('.contact-us__form');
  form.style.display = 'none'

  const contactArrow = document.querySelector('.contact-us__arrow');
  if(contactArrow.classList.contains('contact-us__arrow-active')) {
    contactArrow.classList.remove('contact-us__arrow-active');
    contactArrow.children[0].src = './static/img/common/arrows/white-arrow-down.png';
  }
  contactArrow.style.display = 'flex';
}


function setContactDesktop() {
    const data = document.querySelector('.contact-us__data');
    data.style.display = 'flex'

    const form = document.querySelector('.contact-us__form');
    form.style.display = 'flex'

    const contactArrow = document.querySelector('.contact-us__arrow');
    contactArrow.style.display = 'none';
}

function setCardTextDesktop() {
const cardText = document.querySelectorAll('.card__text')
for(let text of  cardText) {
  text.style.display = 'block';
}
}

function setCardTextMobile() {
  const cardText = document.querySelectorAll('.card__text')
  for(let text of  cardText) {
  text.style.display = 'none';
}
}


let isMobileSize;

window.addEventListener('resize', function() {
  if(document.documentElement.clientWidth < 769) {
    if(isMobileSize === true) return;
    setAboutUsMobile();
    setBlogMobile();
    setContactMobile();
    setOurServicesMobile();
    setPlanMobile();
    setTeamMobile();
    setCardTextMobile();
    setPlanRateArrowMobile();
    isMobileSize = true;
  }
  else {
    if(isMobileSize === false) return;
    setAboutUsDesktop();
    setBlogDesktop();
    setContactDesktop();
    setOurServicesDesktop();
    setPlanDesktop();
    setTeamDesktop();
    setCardTextDesktop();
    setPlanRateArrowDesktop();
    isMobileSize = false;
  }
})


//кнопка readmore для мобильной версии для блока our-services

const readMore = document.querySelectorAll('.card__button');
if(readMore) {
  if(document.documentElement.clientWidth < 769) {
  for(let button of readMore) {
    button.previousElementSibling.previousElementSibling.style.display = 'none';
    button.addEventListener('click', function(event) {
      if(event.currentTarget.previousElementSibling.previousElementSibling.style.display === 'none') {
        event.currentTarget.previousElementSibling.previousElementSibling.style.display ='block'
      }
      else {
        event.currentTarget.previousElementSibling.previousElementSibling.style.display = 'none';
      }
      event.preventDefault();
  })
  }
}
}


//кнопка viewAll для мобильной версии для блока our-services
const viewAllButton = document.querySelector('.our-services__button');
const hiddenCards = document.querySelectorAll('.mobile-hidden')

viewAllButton.addEventListener('click', function(event) {
  if(document.documentElement.clientWidth < 769) {
    if(event.currentTarget.classList.contains('show-cards')) {
      for(card of hiddenCards) {
        card.style.display = 'none';
      }
      event.currentTarget.classList.remove('show-cards')
      event.currentTarget.innerHTML = 'VIEW ALL';
    }
    else {
      for(card of hiddenCards) {
        card.style.display = 'flex';
      }
      event.currentTarget.classList.add('show-cards')
      event.currentTarget.innerHTML = 'VIEW LESS';
    }
    event.preventDefault();
  }
})
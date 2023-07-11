// __________________

// SLIK-SLIDER

// __________________
$(document).ready(function () {
  $('.slider__inner').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    prevArrow: `<button type="button" class="slick-prev"><img src="img/slider/chevron-left-solid.png" alt=""></button>`,
    nextArrow: `<button type="button" class="slick-next"><img src="img/slider/chevron-right-solid.png" alt=""></button>`,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false
        }
      },
    ]
  });
});
// __________________

// CATALOG TABS-SORT

// __________________
const tabs = document.querySelectorAll('.catalog__tab');
const Catalog = document.querySelector('.catalog__content');

document.querySelector('#sort-asc').onclick = function () {
  СleanTabActive();
  mySort('data-price')
};
document.querySelector('#sort-desc').onclick = function () {
  СleanTabActive();
  mySortDesc('data-price')
};
// document.querySelector('#sort-sdesc').onclick = function () {
//   СleanTabActive();
// };

function СleanTabActive() {
  tabs.forEach(element => {
    element.classList.remove('catalog__tab_active');
  });
  event.target.classList.add('catalog__tab_active');
}

// По возрастанию
function mySort(sortType) {
  for (let i = 0; i < Catalog.children.length; i++) {
    for (let j = i; j < Catalog.children.length; j++) {
      if (+Catalog.children[i].getAttribute(sortType) > +Catalog.children[j].getAttribute(sortType)) {
        // на место текущего (i) ставит (j), записывая (i) в переменную replaceNode
        replacedNode = Catalog.replaceChild(Catalog.children[j], Catalog.children[i]);
        insertAfter(replacedNode, Catalog.children[i]);
      }
    }
  }
}
// По убыванию
function mySortDesc(sortType) {
  for (let i = 0; i < Catalog.children.length; i++) {
    for (let j = i; j < Catalog.children.length; j++) {
      if (+Catalog.children[i].getAttribute(sortType) < +Catalog.children[j].getAttribute(sortType)) {
        replacedNode = Catalog.replaceChild(Catalog.children[j], Catalog.children[i]);
        insertAfter(replacedNode, Catalog.children[i]);
      }
    }
  }
}

// добавление элемента за текущим (для сортировки)
function insertAfter(elem, refElem) {
  refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
// __________________

// CATALOG MORE

// __________________
const buttons = document.querySelectorAll('.catalog__btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.catalog__item'); // Находим родительскую карточку

    const itemTop = card.querySelector('.catalog__item-top'); // Находим элемент внутри карточки
    const itemList = card.querySelector('.catalog__item-list'); // Находим элемент внутри карточки

    itemTop.classList.toggle('catalog__item-top-active'); // Изменяем классы
    itemList.classList.toggle('catalog__item-list-active'); // Изменяем классы
  });
});
// __________________

//MODAL

// __________________
const ConsBtns = document.querySelectorAll('[data-modal="consultation"]');
const Modalars = document.querySelectorAll('.modalar');
const constultation = document.querySelector('#consultation');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelectorAll('.modalar__close');
const thx = document.querySelector('#thx');
const forms = document.querySelectorAll('.feed-form');
const BuyBtns = document.querySelectorAll('.catalog__btn--by');
const order = document.querySelector('#order');
const ModalarDescr = document.querySelector('.modalar__descr-buy');

ConsBtns.forEach(el =>
  el.addEventListener('click', () => {
    ShowModal(constultation)
  }))

BuyBtns.forEach(el =>
  el.addEventListener('click', () => {
    const card = el.closest('.catalog__item'); // Находим родительскую карточку
    const NamePulse = card.querySelector('.item__title'); // Находим элемент внутри карточки
    ModalarDescr.innerText = NamePulse.innerText;
    ShowModal(order)
  }))

closeBtn.forEach(el =>
  el.addEventListener('click', () => {
    CloseModal();
  }))

overlay.addEventListener('click', () => {
  CloseModal()
})

constultation.addEventListener('click', (event) => {
  event.stopPropagation();
});

order.addEventListener('click', (event) => {
  event.stopPropagation();
});

forms.forEach(el =>
  el.addEventListener('submit', (event) => {
    event.preventDefault();
    // el.reset();
  }))

function CloseModal() {
  overlay.classList.remove('overlay--visible');
  activeScroll();
  Modalars.forEach(el => {
    el.style.display = 'none';
  })
}

function ShowModal(modal) {
  disableScroll();
  overlay.classList.add('overlay--visible');
  modal.style.display = 'flex';
}


// Animation Scroll CHAT-GPT
let scrollTimeout;
const blocks = document.querySelectorAll('.item');

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {

    blocks.forEach((block) => {
      let blockPosition = block.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Расчет процента видимой области блока
      const visiblePercent = (windowHeight - blockPosition.top) / windowHeight * 100;

      if (visiblePercent >= 5) {
        block.classList.add('animate__animated', 'animate__backInDown', 'animate__fast');
      } else {
        block.classList.remove('animate__animated', 'animate__backInDown', 'animate__fast');
      }
    });
  }, 10); // Задержка в миллисекундах
});
// __________________

// INPUTMASK

// __________________
const consulForm = document.querySelector('.consul__form');
const orderForm = document.querySelector('.order__form');
const contactForm = document.querySelector('.contact__form');
const inputMask = new Inputmask('+7 (999) 999-99-99');
const telSelectorConsul = consulForm.querySelector('input[type="tel"]');
const telSelectorOrder = orderForm.querySelector('input[type="tel"]');
const telSelectorContact = contactForm.querySelector('input[type="tel"]');
inputMask.mask(telSelectorConsul);
inputMask.mask(telSelectorOrder);
inputMask.mask(telSelectorContact);
// __________________

// VALIDATION

// __________________
const validation1 = new JustValidate('.consul__form');
const validation2 = new JustValidate('.order__form');
const validation3 = new JustValidate('.contact__form');


validFunc(validation1, telSelectorConsul, '');
validFunc(validation2, telSelectorOrder, 2);
validFunc(validation3, telSelectorContact, 3);

function validFunc(validation, telSelector, number) {
  validation
    .addField(`.input-name${number}`, [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите больше 3 символов'
      },
      {
        rule: 'maxLength',
        value: 13,
        errorMessage: 'Введите меньше 13 символов'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя!'
      }
    ])
    .addField(`.input-mail${number}`, [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Email обязателен',
      },
      {
        rule: 'email',
        value: true,
        errorMessage: 'Введите корректный Email',
      },
    ])
    .addField(`.input-tel${number}`, [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Телефон обязателен',
      },
      {
        rule: 'function',
        validator: function () {
          const phone = telSelector.inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Введите корректный телефон',
      },
    ]).onSuccess((event) => {
      CloseModal();
      ShowModal(thx);

      console.log('Validation passes and form submitted', event);

      let formData = new FormData(event.target);

      console.log(...formData);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });
}
// __________________

// Убираем прыжок при открытии модалки

// __________________
function disableScroll() {
  let paddingOffSet = window.innerWidth - document.body.offsetWidth + 'px';
  document.body.style.paddingRight = paddingOffSet;
  document.body.style.overflow = 'hidden';
}

function activeScroll() {
  document.body.style.paddingRight = '0px';
  document.body.style.overflow = 'auto';
}

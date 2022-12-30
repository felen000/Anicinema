let seatsNode = document.querySelector(`#seats`);
let costNode = document.querySelector(`#cost`);
let placesNode = document.querySelector(`#places`);
let bookingTabBtnNode = document.querySelector(`#tab-1`);
let paymentTabBtnNode = document.querySelector(`#tab-2`);
let bookingTabNode = document.querySelector(`#booking`);
let paymentTabNode = document.querySelector(`#payment`);
let bookBtnNode = document.querySelector(`#book`);
let payBtnNode = document.querySelector(`#pay`);

let cost = 0;
let seats = {};

seatsNode.addEventListener(`click`, function (e) {
  let item = e.target;

  if (item.classList.contains(`seat`)) {
    let row = Number(item.id[3]);
    let price = 0;
    let id = item.id;

    switch (row) {
      case 1:
        price = 600;
        break;
      case 2:
        price = 500;
        break;
      case 3:
        price = 400;
        break;
    }

    if (item.classList.contains(`btn-success`)) {
      cost -= price;
      delete seats[id];
      item.classList.remove(`btn-success`);
      item.classList.add(`btn-primary`);
    } else {
      cost += price;
      seats[id] = `Ряд: ${id[3]} Место: ${id[1]}`;
      item.classList.add(`btn-success`);
      item.classList.remove(`btn-primary`);
    }

    costNode.innerHTML = cost + `руб.`;
    placesNode.innerHTML = ``;
    for (const key in seats) {
      placesNode.innerHTML += seats[key] + `\n`;
    }
  }
});

bookingTabBtnNode.addEventListener(`click`, function () {
  bookingTabNode.classList.remove(`d-none`);
  paymentTabNode.classList.add(`d-none`);
  bookingTabBtnNode.classList.add(`active`);
  paymentTabBtnNode.classList.remove(`active`);
});

paymentTabBtnNode.addEventListener(`click`, function () {
  bookingTabNode.classList.add(`d-none`);
  paymentTabNode.classList.remove(`d-none`);
  bookingTabBtnNode.classList.remove(`active`);
  paymentTabBtnNode.classList.add(`active`);
});

bookBtnNode.addEventListener(`click`, function () {
  let tel = document.querySelector(`#tel`);
  let mail = document.querySelector(`#email`);
  check(tel);
  check(mail);

  if (check(mail) && check(tel) && Object.keys(seats).length != 0) {
    bookingTabNode.innerHTML = `Бронь прошла успешно! Не забудьте выкупить билеты 
		минимум за 1 день до начала, иначе бронирование сгорит.`;
    document
      .querySelectorAll(`.btn`)
      .forEach((item) => item.classList.add(`disabled`));
  }
});

payBtnNode.addEventListener(`click`, function () {
  let name = document.querySelector(`#card-name`);
  let cardNumber = document.querySelector(`#card-number`);
  let cvc = document.querySelector(`#cvc`);

  check(name);
  check(cardNumber);
  check(cvc);

  if (
    check(name) &&
    check(cardNumber) &&
    check(cvc) &&
    Object.keys(seats).length != 0
  ) {
    paymentTabNode.innerHTML = `Оплата прошла успешно!`;
    document
      .querySelectorAll(`.btn`)
      .forEach((item) => item.classList.add(`disabled`));
  }
});

function check(node) {
  if (node.value.length == 0) {
    node.classList.add(`is-invalid`);
    return false;
  }
  return true;
}

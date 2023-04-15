/* ------ View ------ */
// Представление для DOM
function ClockViewDOM() {
  let containerClockView = null;
  let clock = null;
  let center = null;
  let centerClockFacePositionX = null;
  let centerClockFacePositionY = null;
  let hourDigit = null;
  let hourArrow = null;
  let minArrow = null;
  let secArrow = null;

  this.init = function(container) {
    containerClockView = container;
    this.createClockArrows();
  }

  this.createClockArrows = function () {
    clock = containerClockView.querySelector('.clock');
    center = document.createElement('div');
    center.className = 'center';
    clock.append(center);
    hourArrow = document.createElement('div');
    hourArrow.className = 'hourArrow';
    clock.append(hourArrow);
    minArrow = document.createElement('div');
    minArrow.className = 'minArrow';
    clock.append(minArrow);
    secArrow = document.createElement('div');
    secArrow.className = 'secArrow';
    clock.append(secArrow);
  }

  this.drawClockFace = function (digit, centerDigit_X, centerDigit_Y) {
    // center = containerClockView.querySelector('.center');
    centerClockFacePositionX = center.offsetLeft + center.offsetWidth / 2;
    centerClockFacePositionY = center.offsetTop + center.offsetHeight / 2;
    hourDigit = document.createElement('div');
    hourDigit.textContent = digit;
    hourDigit.className = 'hourDigit';
    hourDigit.style.left = Math.round(centerClockFacePositionX + centerDigit_X - hourDigit.offsetWidth / 2) + 'px';
    hourDigit.style.top = Math.round(centerClockFacePositionY + centerDigit_Y - hourDigit.offsetHeight / 2) + 'px';
    containerClockView.querySelector('.clock').append(hourDigit);
  }




  this.moveSecArrow = function (radius, degree) {
    secArrow.style.width = radius * 0.75 + 'px';
    secArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    secArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    secArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
  }
  
  this.moveMinArrow = function (radius, degree) {
    minArrow.style.width = radius * 0.65 + 'px';
    minArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    minArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    minArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
  }
  
  this.moveHourArrow = function (radius, degree) {
    hourArrow.style.width = radius * 0.55 + 'px';
    hourArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    hourArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    hourArrow.style.transform = `rotate(${(degree - 90)}deg)`;
  }
  this.showCityGMTInfo = function (city, gmt) {
    containerClockView.querySelector('.city').textContent = `${city} (GMT${gmt})`;
  }
}
// Представление для SVG
function ClockViewSVG() {
  let containerClockView = null;

  this.init = function(container) {
    containerClockView = container;
  };
}
// Представление для Canvas
function ClockViewCanvas() {
  let containerClockView = null;

  this.init = function(container) {
    containerClockView = container;
  };
}









/* ------ Model ------ */
function Clock() {
  let viewClock = null; // Представление
  let city = null;
  let gmt = null;
  // let centerClockFacePositionX = null;
  // let centerClockFacePositionY = null;
  let timer = null;

  let radius = 100;
  // let degrees = 150;

  this.init = function(view) {
    viewClock = view;                                        
    this.createClockFace();
    this.showCityAndGMTInfo();
  }
  this.saveModelData = function(selectedCity, timeZone) {
    city = selectedCity;
    gmt = timeZone;
  };
 
  this.createClockFace = function () {
    let degrees = 150; 
    for (let i = 1; i <= 12; i++) {
      const angleRadiansClockFace = parseFloat(degrees) / 180 * Math.PI;
      degrees -= 30;
      // Координаты центра цифры циферблата
      const centerDigit_posX = radius * 0.8 * Math.sin(angleRadiansClockFace);
      const centerDigit_posY = radius * 0.8 * Math.cos(angleRadiansClockFace);
      viewClock.drawClockFace(i, centerDigit_posX, centerDigit_posY);
    }
    this.showAnalogTime();
  }

  this.showCityAndGMTInfo = function () {
    let printGMT;
    gmt > 0 && (printGMT = `+${gmt}`) ||
    gmt === 0 && (printGMT = '') ||
    gmt < 0 && (printGMT = gmt);
    viewClock.showCityGMTInfo(city, printGMT);
  }
   
  this.showAnalogTime = function () {
    const date = new Date();
    const hour = date.getUTCHours() + gmt;
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const secDegree = sec * 6;
    let minDegree = min * 6;
    let hourDegree = hour * 30 + minDegree / 12;
    secDegree === 360 && (secDegree = 0);
    minDegree === 360 && (minDegree = 0);
    viewClock.moveSecArrow(radius, secDegree);
    viewClock.moveMinArrow(radius, minDegree);
    viewClock.moveHourArrow(radius, hourDegree);
    timer = setTimeout(() => {
      this.showAnalogTime();
    }, 1000);
  }

  this.stopAnalogTime = function () {
    console.log('1')
    clearTimeout(timer);
  }
}



/* ------ Controller ------ */
function ClockControllerButtons() {
  let modelClock = null; // Модель
  let containerClockControls = null; // Контейнер с управлением
  let city = null;
  let gmt = null;
  let stopBtn = null;
  let startBtn = null;
  
  this.init = function (model, container, selectedCity, timeZone) {
    modelClock = model;
    containerClockControls = container;
    city = selectedCity;
    gmt = timeZone;
    stopBtn = containerClockControls.querySelector('.stop');
    startBtn = containerClockControls.querySelector('.start');
    this.setDataToModel(city, gmt);
    this.addHandlers();
  }
  this.setDataToModel = function (selectedCity, timeZone) {
    modelClock.saveModelData(selectedCity, timeZone);
  }
  this.addHandlers = function () {
    stopBtn.addEventListener('click', () => { 
      console.log(city, 'стоп')
      modelClock.stopAnalogTime();
    });
    startBtn.addEventListener('click', () => {
      console.log(city, 'старт')
      modelClock.showAnalogTime();
    });
  }
}




/* ------ Глобальная инициализация ------ */
// Два экземпляра часов DOM
const appControllerDOM_1 = new ClockControllerButtons(); // Контроллер
const appModelDOM_1 = new Clock(); // Модель
const appViewDOM_1 = new ClockViewDOM(); // Представление

const appControllerDOM_2 = new ClockControllerButtons();
const appModelDOM_2 = new Clock();
const appViewDOM_2 = new ClockViewDOM();

  // Два экземпляра часов SVG
  const appControllerSVG_1 = new ClockControllerButtons();
  const appModelSVG_1 = new Clock();
  const appViewSVG_1 = new ClockViewSVG();

  const appControllerSVG_2 = new ClockControllerButtons();
  const appModelSVG_2 = new Clock();
  const appViewSVG_2 = new ClockViewSVG();

    // Два экземпляра часов Canvas
    const appControllerCanvas_1 = new ClockControllerButtons();
    const appModelCanvas_1 = new Clock();
    const appViewCanvas_1 = new ClockViewCanvas();

    const appControllerCanvas_2 = new ClockControllerButtons();
    const appModelCanvas_2 = new Clock();
    const appViewCanvas_2 = new ClockViewCanvas();

/* ------ Контейнеры ------ */
// Контейнер часов №1 DOM     Можно также было сделать привязку через свойство dataset, но хотелось попробовать сделать более универсальный способ
const containerDom_1 = document.querySelector("#clocks-DOM .clocks__first-item");
// Контейнер часов №2 DOM
const containerDom_2 = document.querySelector("#clocks-DOM .clocks__second-item");
  // Контейнер часов №1 SVG
  const containerSVG_1 = document.querySelector("#clocks-SVG .clocks__first-item");
  // Контейнер часов №2 SVG
  const containerSVG_2 = document.querySelector("#clocks-SVG .clocks__second-item");
    // Контейнер часов №1 Canvas
    const containerCanvas_1 = document.querySelector("#clocks-canvas .clocks__first-item");
    // Контейнер часов №2 Canvas
    const containerCanvas_2 = document.querySelector("#clocks-canvas .clocks__second-item");

/* ------ Данные для отображения ------ */
// Как вариант можно было сделать считывание через dataset
const data = {
  city_1_DOM: 'Нью-Йорк',
  gmt_1_DOM: -5,
  city_2_DOM: 'Минск',
  gmt_2_DOM: 3,
  city_1_SVG: 'Лондон',
  gmt_1_SVG: 0,
  city_2_SVG: 'Токио',
  gmt_2_SVG: 9,
  city_1_Canvas: 'Берлин',
  gmt_1_Canvas: 1,
  city_2_Canvas: 'Киев',
  gmt_2_Canvas: 3,
}
/* ------ Вызываем init-методы ------ */
/* ------ View init ------ */
  // Clock №1 DOM
  appViewDOM_1.init(containerDom_1); // В представление передаем соответствующий контейнер для вывода
  // Clock №2 DOM
  appViewDOM_2.init(containerDom_2);
    // Clock №1 SVG
    appViewSVG_1.init(containerSVG_1);
    // Clock №2 SVG
    appViewSVG_2.init(containerSVG_2);
        // Clock №1 Canvas
        appViewCanvas_1.init(containerCanvas_1);
        // Clock №2 Canvas
        appViewCanvas_2.init(containerCanvas_2);

/* ------ Controller init ------ */
// Clock №1 DOM
appControllerDOM_1.init(appModelDOM_1, containerDom_1, data.city_1_DOM, data.gmt_1_DOM); // В контроллер передаем модель, контейнер из которого берем управление, город и его часовой пояс
// Clock №2 DOM
appControllerDOM_2.init(appModelDOM_2, containerDom_2, data.city_2_DOM, data.gmt_2_DOM);
  // Clock №1 SVG
  appControllerSVG_1.init(appModelSVG_1, containerSVG_1, data.city_1_SVG, data.gmt_1_SVG);
  // Clock №2 SVG
  appControllerSVG_2.init(appModelSVG_2, containerSVG_2, data.city_2_SVG, data.gmt_2_SVG);
    // Clock №1 Canvas
    appControllerCanvas_1.init(appModelCanvas_1, containerCanvas_1, data.city_1_Canvas, data.gmt_1_Canvas);
    // Clock №2 Canvas
    appControllerCanvas_2.init(appModelCanvas_2, containerCanvas_2, data.city_2_Canvas, data.gmt_2_Canvas);

/* ------ Modal init ------ */
  // Clock №1 DOM
  appModelDOM_1.init(appViewDOM_1); // В модель передаем представление
  // Clock №2 DOM
  appModelDOM_2.init(appViewDOM_2);
    // Clock №1 SVG
    // appModelSVG_1.init(appViewSVG_1);
    // // Clock №2 SVG
    // appModelSVG_2.init(appViewSVG_2);
    //   // Clock №1 Canvas
    //   appModelCanvas_1.init(appViewCanvas_1);
    //   // Clock №2 Canvas
    //   appModelCanvas_2.init(appViewCanvas_2);

// window.onload = appModalController.blankViewData();
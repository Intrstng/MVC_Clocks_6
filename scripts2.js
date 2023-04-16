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
  let cap = null;

  this.init = function(container) {
    containerClockView = container;
  }

  this.createClock = function(widthClock, heightClock, radius) {
    clock = document.createElement('div');
    clock.className = 'clock';
    containerClockView.append(clock);
    clock.style.width = widthClock + 'px';
    clock.style.height = heightClock + 'px';
    clock.style.backgroundColor = 'rgb(5, 236, 159)';
                                      // this.createClockArrows();

                                      center = document.createElement('div'); // из стр. 46
                                      center.className = 'center';
                                      clock.append(center);
  }

  this.drawClockFace = function (digit, centerDigit_X, centerDigit_Y, widthClock, heightClock) {
    centerClockFacePositionX = center.offsetLeft + center.offsetWidth / 2;
    centerClockFacePositionY = center.offsetTop + center.offsetHeight / 2;
    hourDigit = document.createElement('div');
    hourDigit.textContent = digit;
    hourDigit.className = 'hourDigit';
    hourDigit.style.left = Math.round(centerClockFacePositionX + centerDigit_X - hourDigit.offsetWidth / 2) + 'px';
    hourDigit.style.top = Math.round(centerClockFacePositionY + centerDigit_Y - hourDigit.offsetHeight / 2) + 'px';
    containerClockView.querySelector('.clock').append(hourDigit);
  }

  this.createClockArrows = function () {
    // clock = containerClockView.querySelector('.clock');
    hourArrow = document.createElement('div');
    hourArrow.className = 'hourArrow';
    clock.append(hourArrow);
    minArrow = document.createElement('div');
    minArrow.className = 'minArrow';
    clock.append(minArrow);
    secArrow = document.createElement('div');
    secArrow.className = 'secArrow';
    clock.append(secArrow);
    cap = document.createElement('div');
    cap.className = 'cap';
    clock.append(cap);
    cap.style.left = centerClockFacePositionX + 'px';
    cap.style.top = centerClockFacePositionY + 'px';
    // this.drawCentralCap();
  }

  this.moveSecArrow = function (radius, degree) {
    secArrow.style.width = radius * 0.75 + 'px';
    secArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    secArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    secArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
  }
  
  this.moveMinArrow = function (radius, degree) {
    minArrow.style.width = radius * 0.67 + 'px';
    minArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    minArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    minArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
  }
  
  this.moveHourArrow = function (radius, degree) {
    hourArrow.style.width = radius * 0.5 + 'px';
    hourArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    hourArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    hourArrow.style.transform = `rotate(${(degree - 90)}deg)`;
  }

  this.showCityGMTInfo = function (city, gmt) {
    containerClockView.querySelector('.city').textContent = `${city} (GMT${gmt})`;
  }

  // this.drawCentralCap = function () {
  //   cap.style.left = centerClockFacePositionX + 'px';
  //   cap.style.top = centerClockFacePositionY + 'px';
  // }
}


// Представление для SVG
function ClockViewSVG() {
  const svgNS = "http://www.w3.org/2000/svg";
  let svg = null;
  let containerClockView = null;
  let clock = null;
  let center = null;
  let centerClockFacePositionX = null;
  let centerClockFacePositionY = null;
  let arrowsCenterX = null;
  let arrowsCenterY = null;
  // let hourDigit = null;
  let hourArrow = null;
  let minArrow = null;
  let secArrow = null;
  let cap = null;
  let clockFace = null;
  let clockFaceDigit = null;



  this.init = function(container) {
    containerClockView = container;


    // this.createClock();
    // this.createClockArrows();
  }

  this.createClock = function(widthClock, heightClock, radius) {
    // Создаем SVG для часов
    svg = document.createElementNS(svgNS, 'svg');
    svg.setAttributeNS(null, 'width', widthClock);
    svg.setAttributeNS(null, 'height', heightClock);
    svg.setAttributeNS(null, 'class', 'clock__SVG');
    containerClockView.querySelector('.clock').append(svg);
    // Рисуем циферблат
    clockFace = document.createElementNS(svgNS, 'circle');
    clockFace.setAttributeNS(null, 'cx', widthClock / 2);
    clockFace.setAttributeNS(null, 'cy', heightClock / 2);
    clockFace.setAttributeNS(null, 'r', widthClock > heightClock ? heightClock / 2 : widthClock / 2);
    clockFace.setAttributeNS(null, 'fill', 'rgb(5, 236, 159)');
    svg.append(clockFace);


    // this.createClockArrows(widthClock, heightClock, radius);
    // this.drawCentralCap(widthClock, heightClock);
  }
  this.drawClockFace = function (digit, centerDigit_X, centerDigit_Y, widthClock, heightClock) {
    centerClockFacePositionX = svg.offsetLeft + widthClock / 2;
    centerClockFacePositionY = svg.offsetTop + heightClock / 2;
    // Рисуем круги для 12-ти цифр на циферблате
    clockFaceDigit = document.createElementNS(svgNS, 'circle');
    clockFaceDigit.setAttributeNS(null, 'r', widthClock > heightClock ? (heightClock / 2) * 0.1 : (widthClock / 2) * 0.1);
    clockFaceDigit.setAttributeNS(null, 'cx', Math.round(centerDigit_X + widthClock / 2));
    clockFaceDigit.setAttributeNS(null, 'cy', Math.round(centerDigit_Y + heightClock / 2));
    clockFaceDigit.setAttributeNS(null, 'fill', 'rgb(228, 236, 5)');
    svg.append(clockFaceDigit);
    // Рисуем цифру внутри каждого из 12-ти кругов на циферблате
    const clockFaceDigitRadius = clockFaceDigit.getAttributeNS(null, 'r');
    const clockFaceDigitCenterX = clockFaceDigit.getAttributeNS(null, 'cx');
    const clockFaceDigitCenterY = clockFaceDigit.getAttributeNS(null, 'cy');
    const clockFaceDigitText = document.createElementNS(svgNS, 'text');
    svg.append(clockFaceDigitText);
    const font = '"Lobster", cursive';
    clockFaceDigitText.setAttributeNS(null, 'x', clockFaceDigitCenterX);
    clockFaceDigitText.setAttributeNS(null, 'y', parseInt(clockFaceDigitCenterY) + clockFaceDigitRadius / 2);
    clockFaceDigitText.setAttributeNS(null, 'fill', 'rgb(0, 0, 0)');
    clockFaceDigitText.setAttributeNS(null, 'text-anchor', 'middle');
    clockFaceDigitText.setAttributeNS(null, 'font-size', clockFaceDigitRadius * 1.4);
    clockFaceDigitText.setAttributeNS(null, 'font-family', font);
    clockFaceDigitText.setAttributeNS(null, 'font-weight', 'bold');
    clockFaceDigitText.textContent = digit;
  }




  this.createClockArrows = function (widthClock, heightClock, radius) {
    // arrowsCenterX = widthClock / 2;
    // arrowsCenterY = heightClock / 2;
    hourArrow = document.createElementNS(svgNS, 'rect');
    hourArrow.setAttributeNS(null, 'x', radius);
    hourArrow.setAttributeNS(null, 'y', radius);
    hourArrow.setAttributeNS(null, 'width', 3);
    hourArrow.setAttributeNS(null, 'height', radius * 0.5);
    hourArrow.setAttributeNS(null, 'rx', '2');
    hourArrow.setAttributeNS(null, 'ry', '2');
    hourArrow.setAttributeNS(null, 'fill', 'black');
    hourArrow.setAttributeNS(null, 'id', 'hour-arrow');
    svg.append(hourArrow);
      minArrow = document.createElementNS(svgNS, 'rect');
      minArrow.setAttributeNS(null, 'x', radius);
      minArrow.setAttributeNS(null, 'y', radius);
      minArrow.setAttributeNS(null, 'width', 2);
      minArrow.setAttributeNS(null, 'height', radius * 0.67);
      minArrow.setAttributeNS(null, 'rx', '2');
      minArrow.setAttributeNS(null, 'ry', '2');
      minArrow.setAttributeNS(null, 'fill', 'black');
      minArrow.setAttributeNS(null, 'id', 'min-arrow');
      svg.append(minArrow);
        secArrow = document.createElementNS(svgNS, 'rect');
        secArrow.setAttributeNS(null, 'x', radius);
        secArrow.setAttributeNS(null, 'y', radius);
        secArrow.setAttributeNS(null, 'width', 1);
        secArrow.setAttributeNS(null, 'height', radius * 0.75);
        secArrow.setAttributeNS(null, 'rx', '1');
        secArrow.setAttributeNS(null, 'ry', '1');
        secArrow.setAttributeNS(null, 'fill', 'red');
        secArrow.setAttributeNS(null, 'id', 'sec-arrow');
        svg.append(secArrow);
        // Draw central cap
          cap = document.createElementNS(svgNS, 'circle');
          cap.setAttributeNS(null, 'r', widthClock > heightClock ? (heightClock / 2) * 0.05 : (widthClock / 2) * 0.05);
          cap.setAttributeNS(null, 'cx', Math.round(widthClock / 2));
          cap.setAttributeNS(null, 'cy', Math.round(heightClock / 2));
          cap.setAttributeNS(null, 'fill', 'rgb(255, 0, 0)');
          svg.append(cap);
  }




              this.moveSecArrow = function (radius, degree) {
                secArrow.setAttributeNS(null, 'transform', `rotate(${degree - 180}, ${radius}, ${radius})`);
              }
              
              this.moveMinArrow = function (radius, degree) {
                minArrow.setAttributeNS(null, 'transform', `rotate(${degree - 180}, ${radius}, ${radius})`);
              }    
              this.moveHourArrow = function (radius, degree) {
                hourArrow.setAttributeNS(null, 'transform', `rotate(${degree- 180}, ${radius}, ${radius})`);
              }



  this.showCityGMTInfo = function (city, gmt) {
    containerClockView.querySelector('.city').textContent = `${city} (GMT${gmt})`;
  }

  // this.drawCentralCap = function (widthClock, heightClock) {

  // }
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
  let timer = null;
  let width = null;
  let height = null;
  let radius = null;
  // let degrees = 150;

  this.init = function(view) {
    viewClock = view;                             
    this.createClockFace(width, height, radius);
    this.showCityAndGMTInfo();
  }
  this.saveModelData = function(selectedCity, timeZone, widthClock, heightClock) {
    city = selectedCity;
    gmt = timeZone;
    width = widthClock;
    height = heightClock;
    radius = (width / 2 + height / 2) / 2;
  };
 
  this.createClockFace = function (widthClock, heightClock, radius) {
    viewClock.createClock(widthClock, heightClock, radius); // Создает циферблат часов
    // Заполняет циферблат цифрами
    let degrees = 150;
    for (let i = 1; i <= 12; i++) {
      const angleRadiansClockFace = parseFloat(degrees) / 180 * Math.PI;
      degrees -= 30;
      // Координаты центра цифры циферблата
      const centerDigit_posX = radius * 0.8 * Math.sin(angleRadiansClockFace);
      const centerDigit_posY = radius * 0.8 * Math.cos(angleRadiansClockFace);
      viewClock.drawClockFace(i, centerDigit_posX, centerDigit_posY, widthClock, heightClock);
    }
                                          viewClock.createClockArrows(widthClock, heightClock, radius);
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
  let timerFlag = true;
  
  this.init = function (model, container, selectedCity, timeZone, width, height) {
    modelClock = model;
    containerClockControls = container;
    city = selectedCity;
    gmt = timeZone;
    stopBtn = containerClockControls.querySelector('.stop');
    startBtn = containerClockControls.querySelector('.start');
    this.setDataToModel(city, gmt, width, height);
    this.addHandlers();
  }
  this.setDataToModel = function (selectedCity, timeZone, width, height) {
    modelClock.saveModelData(selectedCity, timeZone, width, height);
  }
  this.addHandlers = function () {
    stopBtn.addEventListener('click', () => { 
      modelClock.stopAnalogTime();
      timerFlag = false;
    });
    startBtn.addEventListener('click', () => {
      if (!timerFlag) {
        modelClock.showAnalogTime();
        timerFlag = true;
      }
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
  width: 200,
  height: 200,
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
appControllerDOM_1.init(appModelDOM_1, containerDom_1, data.city_1_DOM, data.gmt_1_DOM, data.width, data.height); // В контроллер передаем модель, контейнер из которого берем управление, город, его часовой пояс, ширину и высоту часов
// Clock №2 DOM
appControllerDOM_2.init(appModelDOM_2, containerDom_2, data.city_2_DOM, data.gmt_2_DOM, data.width, data.height);
  // Clock №1 SVG
  appControllerSVG_1.init(appModelSVG_1, containerSVG_1, data.city_1_SVG, data.gmt_1_SVG, data.width, data.height);
  // Clock №2 SVG
  appControllerSVG_2.init(appModelSVG_2, containerSVG_2, data.city_2_SVG, data.gmt_2_SVG, data.width, data.height);
    // Clock №1 Canvas
    appControllerCanvas_1.init(appModelCanvas_1, containerCanvas_1, data.city_1_Canvas, data.gmt_1_Canvas, data.width, data.height);
    // Clock №2 Canvas
    appControllerCanvas_2.init(appModelCanvas_2, containerCanvas_2, data.city_2_Canvas, data.gmt_2_Canvas, data.width, data.height);

/* ------ Modal init ------ */
  // Clock №1 DOM
  appModelDOM_1.init(appViewDOM_1); // В модель передаем представление
  // Clock №2 DOM
  appModelDOM_2.init(appViewDOM_2);
    // Clock №1 SVG
    appModelSVG_1.init(appViewSVG_1);
    // // Clock №2 SVG
    appModelSVG_2.init(appViewSVG_2);
    //   // Clock №1 Canvas
    //   appModelCanvas_1.init(appViewCanvas_1);
    //   // Clock №2 Canvas
    //   appModelCanvas_2.init(appViewCanvas_2);

// window.onload = appModalController.blankViewData();
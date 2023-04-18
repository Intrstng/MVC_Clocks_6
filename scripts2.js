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

  this.createClock = function(widthClock, heightClock, radius, secLength, minLength, hourLength, secWidth, minWidth, hourWidth, capSize) {
    clock = document.createElement('div');
    clock.className = 'clock';
    containerClockView.append(clock);
    clock.style.width = widthClock + 'px';
    clock.style.height = heightClock + 'px';
    clock.style.backgroundColor = 'rgb(5, 236, 159)';
    this.createClockArrows(widthClock, heightClock, radius, secLength, minLength, hourLength, secWidth, minWidth, hourWidth, capSize);
  }

  this.drawClockFace = function (digit, centerDigit_X, centerDigit_Y, widthClock, heightClock) {
    centerClockFacePositionX = widthClock / 2/* center.offsetLeft + center.offsetWidth / 2; */
    centerClockFacePositionY = heightClock / 2/* center.offsetTop + center.offsetHeight / 2; */
    hourDigit = document.createElement('div');
    hourDigit.textContent = digit;
    hourDigit.className = 'hourDigit';
    hourDigit.style.left = Math.round(centerClockFacePositionX + centerDigit_X - hourDigit.offsetWidth / 2) + 'px';
    hourDigit.style.top = Math.round(centerClockFacePositionY + centerDigit_Y - hourDigit.offsetHeight / 2) + 'px';
    containerClockView.querySelector('.clock').append(hourDigit);
    cap.style.left = centerClockFacePositionX + 'px';
    cap.style.top = centerClockFacePositionY + 'px';
  }

  this.createClockArrows = function (widthClock, heightClock, radius, secLength, minLength, hourLength, secWidth, minWidth, hourWidth, capSize) {
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
    cap = document.createElement('div');
    cap.className = 'cap';
    cap.style.width = capSize * 2 + 'px';
    cap.style.height = capSize * 2 + 'px';
    cap.style.borderRadius = '50%';
    clock.append(cap);
  }

  this.moveSecArrow = function (radius, degree, radians, length, width) {
    secArrow.style.width = length + 'px';
    secArrow.style.height = width + 'px';
    secArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    secArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    secArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
  }
  
  this.moveMinArrow = function (radius, degree, radians, length, width) {
    minArrow.style.width = length + 'px';
    minArrow.style.height = width + 'px';
    minArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
    minArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
    minArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
  }
  
  this.moveHourArrow = function (radius, degree, radians, length, width, cap) {
    hourArrow.style.width = length + 'px';
    hourArrow.style.height = width + 'px';
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
  const svgNS = "http://www.w3.org/2000/svg";
  let svg = null;
  let containerClockView = null;
  let clock = null;
  let center = null;
  let centerClockFacePositionX = null;
  let centerClockFacePositionY = null;
  let arrowsCenterX = null;
  let arrowsCenterY = null;
  let hourArrow = null;
  let minArrow = null;
  let secArrow = null;
  let cap = null;
  let clockFace = null;
  let clockFaceDigit = null;

  this.init = function(container) {
    containerClockView = container;
  }

  this.createClock = function(widthClock, heightClock, radius, secLength, minLength, hourLength, secWidth, minWidth, hourWidth, capSize) {
    // Создаем SVG для часов
    svg = document.createElementNS(svgNS, 'svg');
    svg.setAttributeNS(null, 'width', widthClock);
    svg.setAttributeNS(null, 'height', heightClock);
    svg.setAttributeNS(null, 'class', 'clock');
    containerClockView.append(svg);
    // Рисуем циферблат
    clockFace = document.createElementNS(svgNS, 'circle');
    clockFace.setAttributeNS(null, 'cx', radius);
    clockFace.setAttributeNS(null, 'cy', radius);
    clockFace.setAttributeNS(null, 'r', radius);
    clockFace.setAttributeNS(null, 'fill', 'rgb(5, 236, 159)');
    svg.append(clockFace);
    this.createClockArrows(widthClock, heightClock, radius, secLength, minLength, hourLength, secWidth, minWidth, hourWidth, capSize);
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

  this.createClockArrows = function (widthClock, heightClock, radius, secLength, minLength, hourLength, secWidth, minWidth, hourWidth, capSize) {
    hourArrow = document.createElementNS(svgNS, 'rect');
    hourArrow.setAttributeNS(null, 'x', radius);
    hourArrow.setAttributeNS(null, 'y', radius);
    hourArrow.setAttributeNS(null, 'width', hourWidth);
    hourArrow.setAttributeNS(null, 'height', hourLength);
    hourArrow.setAttributeNS(null, 'rx', '2');
    hourArrow.setAttributeNS(null, 'ry', '2');
    hourArrow.setAttributeNS(null, 'fill', 'black');
    hourArrow.setAttributeNS(null, 'id', 'hour-arrow');
    svg.append(hourArrow);
      minArrow = document.createElementNS(svgNS, 'rect');
      minArrow.setAttributeNS(null, 'x', radius);
      minArrow.setAttributeNS(null, 'y', radius);
      minArrow.setAttributeNS(null, 'width', minWidth);
      minArrow.setAttributeNS(null, 'height', minLength);
      minArrow.setAttributeNS(null, 'rx', '2');
      minArrow.setAttributeNS(null, 'ry', '2');
      minArrow.setAttributeNS(null, 'fill', 'black');
      minArrow.setAttributeNS(null, 'id', 'min-arrow');
      svg.append(minArrow);
        secArrow = document.createElementNS(svgNS, 'rect');
        secArrow.setAttributeNS(null, 'x', radius);
        secArrow.setAttributeNS(null, 'y', radius);
        secArrow.setAttributeNS(null, 'width', 1);
        secArrow.setAttributeNS(null, 'height', secLength);
        secArrow.setAttributeNS(null, 'rx', '1');
        secArrow.setAttributeNS(null, 'ry', '1');
        secArrow.setAttributeNS(null, 'fill', 'red');
        secArrow.setAttributeNS(null, 'id', 'sec-arrow');
        svg.append(secArrow);
          // Draw central cap
          cap = document.createElementNS(svgNS, 'circle');
          cap.setAttributeNS(null, 'r', capSize);
          cap.setAttributeNS(null, 'cx', radius); // widthClock / 2
          cap.setAttributeNS(null, 'cy', radius); // heightClock / 2
          cap.setAttributeNS(null, 'fill', 'rgb(255, 0, 0)');
          svg.append(cap);
  }

  this.moveSecArrow = function (radius, degree, radians, width) {
    secArrow.setAttributeNS(null, 'transform', `rotate(${degree - 180}, ${radius}, ${radius})`);
  }
  
  this.moveMinArrow = function (radius, degree, radians, width) {
    minArrow.setAttributeNS(null, 'transform', `rotate(${degree - 180}, ${radius}, ${radius})`);
  }
  
  this.moveHourArrow = function (radius, degree, radians, width, cap) {
    hourArrow.setAttributeNS(null, 'transform', `rotate(${degree - 180}, ${radius}, ${radius})`);
  }

  this.showCityGMTInfo = function (city, gmt) {
    containerClockView.querySelector('.city').textContent = `${city} (GMT${gmt})`;
  }
}

// Представление для Canvas
function ClockViewCanvas() {
  let containerClockView = null;
  let canvas = null;
  let ctx = null;
  let radius = null;
  let fontSize = null;
  let canvasDataObj = null;
 
  this.init = function(container) {
    containerClockView = container;
  };
  this.createClock = function(widthClock, heightClock, radiusClock, secLength, minLength, hourLength, secWidth, minWidth, hourWidth, capSize) {
    // Создаем Canvas для часов
    canvas = document.createElement('canvas');
    canvas.textContent = 'Ваш браузер не поддерживает Canvas';
    canvas.setAttribute('width', widthClock + 'px');
    canvas.setAttribute('height', heightClock + 'px');
    canvas.setAttribute('class', 'clock');
    containerClockView.append(canvas);
    ctx = canvas.getContext('2d');
    radius = radiusClock;
    fontSize = radius * 0.2 + 'px';
    // this.createClockFaceBase();
  }

  this.createClockFaceBase = function() {
        // Рисуем циферблат
  // Blank canvas
  // this.blankCanvas();
  // Canvas center point
  let xpos = canvas.width / 2;
  let ypos = canvas.height / 2;
  // Create clock face
    ctx.beginPath();
    // Draw gradient in center of clockface
    const grad = ctx.createRadialGradient(xpos, ypos, 1, xpos, ypos, radius / 1.25);
    grad.addColorStop(0,'rgb(255, 255, 255)');
    grad.addColorStop(1,'rgb(238, 62, 61)');
    ctx.fillStyle = grad;
    // Draw light green colored watermelon rind
    ctx.strokeStyle = 'rgb(200, 207, 145)';
    ctx.lineWidth = radius * 0.09;
    ctx.arc(xpos, ypos, radius - ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // Draw green colored watermelon rind
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(74, 147, 77)';
    ctx.lineWidth = radius * 0.03;
    ctx.arc(xpos, ypos, radius - ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.stroke();
  }

  this.blankCanvas = function(pos) {
    ctx.clearRect(pos, pos, canvas.width, canvas.height);
  }

  this.setCanvasData = function(obj) {
    canvasDataObj = obj;
  }

  this.drawCanvasClockFace = function (obj) {
    // Draw clock face digits
    for (let number in obj) { // Обработка полученных данных из модели для отображения их во View
      if (canvas && canvas.getContext('2d')) {
        ctx.save();
        ctx.beginPath();
        ctx.rotate(obj[number]);
        ctx.translate(0, -radius * 0.77);
        ctx.font = `bold ${fontSize} Lobster`;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.rotate(-obj[number]);
        ctx.fillText(number, radius, radius);
        ctx.rotate(obj[number]);
        ctx.translate(0, radius * 0.77);
        ctx.rotate(-obj[number]);
        ctx.restore();
      }
    }
  }

  this.moveSecArrow = function (radius, degree, radians, length, width) {
    this.blankCanvas(0);
    this.createClockFaceBase();
    this.drawCanvasClockFace(canvasDataObj);
    this.drawHand(radians, length, width, 'rgb(74, 147, 77)');
  }
  
  this.moveMinArrow = function (radius, degree, radians, length, width) {
    this.drawHand(radians, length, width, 'rgb(0, 0, 0)');
  }    
  this.moveHourArrow = function (radius, degree, radians, length, width, cap) {
    this.drawHand(radians, length, width, 'rgb(0, 0, 0)');
    this.drawCap(cap);
  }

  this.drawHand = function (pos, length, width, color) {
    ctx.save();
    ctx.translate(radius, radius);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(-width, 0);
    ctx.lineTo(0, -length);
    ctx.lineTo(width, 0);
    ctx.stroke();
    ctx.fill();
    ctx.rotate(-pos);
    ctx.restore();
  }

  this.drawCap = function (cap) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, cap, 0, 2 * Math.PI); // 0.025
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fill();
    ctx.restore();
  }

  this.showCityGMTInfo = function (city, gmt) {
    containerClockView.querySelector('.city').textContent = `${city} (GMT${gmt})`;
  }
}

/* ------ Model ------ */
function Clock() {
  let viewClock = null; // Представление
  let city = null;
  let gmt = null;
  let timer = null; // setTimeout, для его последующей отмены при клике на кнопку stopBtn
  let width = null; // ширина часов
  let height = null; // высота часов
  let radius = null; // радиус часов (он же центр)
  let version = null; // версия исполнения часов
  let degrees = null; // расположение в градусах цифр на циферблате (шаг)
  let hourArrowLength = null; // длина часовой стрелки
  let minArrowLength = null; // длина минутной стрелки
  let secArrowLength = null; // длина секундной стрелки
  let hourArrowWidth = null; // ширина часовой стрелки
  let minArrowWidth = null; // ширина минутной стрелки
  let secArrowWidth = null; // ширина секундной стрелки
  let capSize = null; // размер центральной точки оси стрелок

  this.init = function(view) {
    viewClock = view;                             
    this.createClockFace(width, height, radius, secArrowLength, minArrowLength, hourArrowLength, secArrowWidth, minArrowWidth, hourArrowWidth, capSize);
    this.showCityAndGMTInfo();
  }
  this.saveModelData = function(selectedCity, timeZone, widthClock, heightClock, clockVersion) {
    city = selectedCity;
    gmt = timeZone;
    width = widthClock;
    height = heightClock;
    radius = (width / 2 + height / 2) / 2;
    version = clockVersion;
    hourArrowLength = radius * 0.53;
    minArrowLength = radius * 0.66;
    secArrowLength = radius * 0.68;
    hourArrowWidth = radius * 0.011;
    minArrowWidth = radius * 0.008;
    secArrowWidth = radius * 0.0035;
    capSize = width > height ? (height / 2) * 0.025 : (width / 2) * 0.025;         
  };
 
  this.createClockFace = function (widthClock, heightClock, radius, secArrowLength, minArrowLength, hourArrowLength, secArrowWidth, minArrowWidth, hourArrowWidth, capSize) {
    // Создает часы (добавляет соответствующий элемент в верстку)
    viewClock.createClock(widthClock, heightClock, radius, secArrowLength, minArrowLength, hourArrowLength, secArrowWidth, minArrowWidth, hourArrowWidth, capSize);
    // Заполняет циферблат цифрами
    degrees = (version === 'DOM' || version === 'SVG') ? 150 : 30;
    let objCanvasClockFace = {}; // Объект для хранения координат цифр циферблата для часов в исполнении Canvas
    for (let i = 1; i <= 12; i++) {
      const angleRadiansClockFace = parseFloat(degrees) / 180 * Math.PI;     
      degrees = (version === 'DOM' || version === 'SVG') ? degrees - 30 : degrees + 30;
      // Координаты центра цифры циферблата
      const centerDigit_posX = radius * 0.8 * Math.sin(angleRadiansClockFace);
      const centerDigit_posY = radius * 0.8 * Math.cos(angleRadiansClockFace);
      (version === 'DOM' || version === 'SVG') && viewClock.drawClockFace(i, centerDigit_posX, centerDigit_posY, widthClock, heightClock);
      (version === 'Canvas') && (objCanvasClockFace[i] = angleRadiansClockFace);
    }
    (version === 'Canvas') && this.setCanvasClockFaceData(objCanvasClockFace);
    this.showAnalogTime();
  }
  
  this.setCanvasClockFaceData = function (obj) {
    viewClock.setCanvasData(obj);
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
    const secRadians = ((2 * Math.PI) / 60) * sec;
    const minRadians = min * 6 * (Math.PI / 180);
    const hourRadians = hourDegree * (Math.PI / 180);
    viewClock.moveSecArrow(radius, secDegree, secRadians, secArrowLength, secArrowWidth);
    viewClock.moveMinArrow(radius, minDegree, minRadians, minArrowLength, minArrowWidth);
    viewClock.moveHourArrow(radius, hourDegree, hourRadians, hourArrowLength, hourArrowWidth, capSize);
    timer = setTimeout(() => {
      this.showAnalogTime();
    }, 1000);
  }

  this.stopAnalogTime = function () {
    clearTimeout(timer);
  }

  this.showCityAndGMTInfo = function () {
    let printGMT;
    gmt > 0 && (printGMT = `+${gmt}`) ||
    gmt === 0 && (printGMT = '') ||
    gmt < 0 && (printGMT = gmt);
    viewClock.showCityGMTInfo(city, printGMT);
  }
}

/* ------ Controller ------ */
function ClockControllerButtons() {
  let modelClock = null; // Модель
  let containerClockControls = null; // Контейнер с управлением
  let city = null; // город
  let gmt = null; // часовой пояс
  let stopBtn = null; // кнопка старт
  let startBtn = null; // кнопка стоп
  let version = null; // версия исполнения часов (DOM, SVG, Canvas)
  let timerFlag = true; // запущен ли ход часов (чтобы не запустить повторно уже идущие часы при случайном клике на кнопку startBtn)
  
  this.init = function (model, container, selectedCity, timeZone, width, height, clockVersion) {
    modelClock = model;
    containerClockControls = container;
    city = selectedCity;
    gmt = timeZone;
    stopBtn = containerClockControls.querySelector('.stop');
    startBtn = containerClockControls.querySelector('.start');
    version = clockVersion;
    this.setDataToModel(city, gmt, width, height, version);
    this.addHandlers();
  }

  this.setDataToModel = function (selectedCity, timeZone, width, height, clockVersion) {
    modelClock.saveModelData(selectedCity, timeZone, width, height, clockVersion);
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
// Контейнер часов №1 DOM     Можно также было сделать привязку через свойство dataset, но хотелось попробовать сделать более универсальный способ (менее зависимый от верстки)
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
// Как вариант, также можно было сделать считывание через dataset. Хотелось попробовать сделать менее зависимый от верстки способ
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
  city_2_Canvas: 'Владивосток',
  gmt_2_Canvas: 10,
  width: 200,
  height: 200,
  version_DOM: 'DOM',
  version_SVG: 'SVG',
  version_Canvas: 'Canvas',
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
appControllerDOM_1.init(appModelDOM_1, containerDom_1, data.city_1_DOM, data.gmt_1_DOM, data.width, data.height, data.version_DOM); // В контроллер передаем модель, контейнер из которого берем управление, город, его часовой пояс, ширину и высоту часов, версию исполнения часов
// Clock №2 DOM
appControllerDOM_2.init(appModelDOM_2, containerDom_2, data.city_2_DOM, data.gmt_2_DOM, data.width, data.height, data.version_DOM);
  // Clock №1 SVG
  appControllerSVG_1.init(appModelSVG_1, containerSVG_1, data.city_1_SVG, data.gmt_1_SVG, data.width, data.height, data.version_SVG);
  // Clock №2 SVG
  appControllerSVG_2.init(appModelSVG_2, containerSVG_2, data.city_2_SVG, data.gmt_2_SVG, data.width, data.height, data.version_SVG);
    // Clock №1 Canvas
    appControllerCanvas_1.init(appModelCanvas_1, containerCanvas_1, data.city_1_Canvas, data.gmt_1_Canvas, data.width, data.height, data.version_Canvas);
    // Clock №2 Canvas
    appControllerCanvas_2.init(appModelCanvas_2, containerCanvas_2, data.city_2_Canvas, data.gmt_2_Canvas, data.width, data.height, data.version_Canvas);

/* ------ Modal init ------ */
  // Clock №1 DOM
  appModelDOM_1.init(appViewDOM_1); // В модель передаем представление
  // Clock №2 DOM
  appModelDOM_2.init(appViewDOM_2);
    // Clock №1 SVG
    appModelSVG_1.init(appViewSVG_1);
    // // Clock №2 SVG
    appModelSVG_2.init(appViewSVG_2);
      // Clock №1 Canvas
      appModelCanvas_1.init(appViewCanvas_1);
      // Clock №2 Canvas
      appModelCanvas_2.init(appViewCanvas_2);
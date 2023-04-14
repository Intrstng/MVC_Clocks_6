// Model
function Clock() {

}

// View
function ClockViewDOM() {

}

function ClockViewSVG() {

}

function ClockViewCanvas() {

}


// Controller
function ClockControllerButtons() {
  this.setInterface = function (idBtnStop, idBtnStart, idCity) {
    this.stopBtn = document.getElementById(idBtnStop);
    this.startBtn = document.getElementById(idBtnStart);
    this.city = document.getElementById(idCity);
  }
  this.addHandlers = function () {
    this.stopBtn.addEventListener('click', () => { calculator.setOperand('firstOperand', this.inputNum_1.value, this.inputSign.value) });
    this.startBtn.addEventListener('click', () => { calculator.setOperand('secondOperand', this.inputNum_2.value, this.inputSign.value) });
  }
}




// Глобальная инициализация
// Два экземпляра часов DOM
const appControllerDOM_1 = new ClockControllerButtons();
const appModelDOM_1 = new Clock();
const appViewDOM_1 = new ClockViewDOM();

const appControllerDOM_2 = new ClockControllerButtons();
const appModelDOM_2 = new Clock();
const appViewDOM_2 = new ClockViewDOM();

// Два экземпляра часов SVG
const appControllerSVG_1 = new ClockControllerButtons();
const appModelSVG_1 = new Clock();
const appViewSVG_1 = new ClockViewDOM();

const appControllerSVG_2 = new ClockControllerButtons();
const appModelSVG_2 = new Clock();
const appViewSVG_2 = new ClockViewDOM();

// Два экземпляра часов Canvas
const appControllerCanvas_1 = new ClockControllerButtons();
const appModelCanvas_1 = new Clock();
const appViewCanvas_1 = new ClockViewDOM();

const appControllerCanvas_2 = new ClockControllerButtons();
const appModelCanvas_2 = new Clock();
const appViewCanvas_2 = new ClockViewDOM();


const containerDom = document.querySelector("#clocks-DOM");
const containerSVG = document.querySelector("#clocks-SVG");
const containerCanvas = document.querySelector("#clocks-canvas");

// Вызываем init-метод
// View
appViewDOM.init(container, modalWindow, overlay);
appViewSVG.init(container, modalWindow, overlay);
appViewCanvas.init(container, modalWindow, overlay);

// Modal
appModel.init(appModalView);

// Controller
appController.init(appModalModel, modalWindow, container);

// window.onload = appModalController.blankViewData();
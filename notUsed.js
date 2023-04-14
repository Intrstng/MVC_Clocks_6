// Исходный код clock DOM
function createClockArrows() {
  const clock = document.querySelector('.clock');
  const center = document.createElement('div');
  center.className = 'center';
  clock.append(center);
  const hourArrow = document.createElement('div');
  hourArrow.className = 'hourArrow';
  clock.append(hourArrow);
  const minArrow = document.createElement('div');
  minArrow.className = 'minArrow';
  clock.append(minArrow);
  const secArrow = document.createElement('div');
  secArrow.className = 'secArrow';
  clock.append(secArrow);
}
createClockArrows();

// Радиус циферблата
const radius = (document.querySelector('.clock').offsetHeight / 2 + document.querySelector('.clock').offsetHeight / 2) / 2;

// Координаты центра циферблата
const center = document.querySelector('.center');
const centerClockFacePositionX = center.offsetLeft + center.offsetWidth / 2;
const centerClockFacePositionY = center.offsetTop + center.offsetHeight / 2;

function createClockFace() {
  let degrees = 150;
  for (let i = 1; i <= 12; i++) {
    const angleRadiansClockFace = parseFloat(degrees) / 180 * Math.PI;
    degrees -= 30;
    // Координаты центра цифры циферблата
    const centerDigitOfClockFaceX = centerClockFacePositionX + radius * 0.8 * Math.sin(angleRadiansClockFace);
    const centerDigitOfClockFaceY = centerClockFacePositionY + radius * 0.8 * Math.cos(angleRadiansClockFace);

    const hourDigit = document.createElement('div');
    hourDigit.textContent = i;
    hourDigit.className = 'hourDigit';
    hourDigit.style.left = Math.round(centerDigitOfClockFaceX - hourDigit.offsetWidth / 2) + 'px';
    hourDigit.style.top = Math.round(centerDigitOfClockFaceY - hourDigit.offsetHeight / 2) + 'px';
    document.querySelector('.clock').append(hourDigit);
  }
}
createClockFace();

function showTimeDigitalClock() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const time = document.querySelector('.digital-clock');
  time.textContent = String(hour).padStart(2, 0) + ':' + String(min).padStart(2, 0) + ':' + String(sec).padStart(2, 0);
  setTimeout(() => {
    showTimeDigitalClock();
  }, 1000);
}
showTimeDigitalClock();

function showAnalogTime() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const secDegree = sec * 6;
  let minDegree = min * 6;
  let hourDegree = hour * 30 + minDegree / 12;
  secDegree === 360 && (secDegree = 0);
  minDegree === 360 && (minDegree = 0);
  moveSecArrow(secDegree);
  moveMinArrow(minDegree);
  moveHourArrow(hourDegree);
  setTimeout(() => {
    showAnalogTime();
  }, 1000);
}
showAnalogTime();

function moveSecArrow(degree) {
  const secArrow = document.querySelector('.secArrow');
  secArrow.style.width = radius * 0.85 + 'px';
  secArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
  secArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
  secArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
}
moveSecArrow();

function moveMinArrow(degree) {
  const minArrow = document.querySelector('.minArrow');
  minArrow.style.width = radius * 0.75 + 'px';
  minArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
  minArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
  minArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
}
moveMinArrow();

function moveHourArrow(degree) {
  const hourArrow = document.querySelector('.hourArrow');
  hourArrow.style.width = radius * 0.55 + 'px';
  hourArrow.style.left = Math.round(centerClockFacePositionY) + 'px';
  hourArrow.style.top = Math.round(centerClockFacePositionX) + 'px';
  hourArrow.style.transform = `rotate(${(degree - 90)}deg)`; 
}
moveHourArrow();
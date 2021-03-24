// Time divs
const mainTime = document.getElementById("main-time");
const timeA = document.getElementById("time-a");
const timeB = document.getElementById("time-b");
// Screen buttons
const screenButtonB = document.getElementById("screenButtonB");
const screenButtonA = document.getElementById("screenButtonA");
// Start button
const startButton = document.getElementById("start");

const timesAEl = document.getElementById("timesA");
const timesBEl = document.getElementById("timesB");

const aAverage = document.getElementById("aAverage");
const bAverage = document.getElementById("bAverage");

const minutes = document.querySelectorAll(".minutes");
const seconds = document.querySelectorAll(".seconds");
const tenths = document.querySelectorAll(".tenths");

let timesA = [];
let timesB = [];

let START_TIME;

let A_STOP = false;
let B_STOP = false;

let updateInterval;

let RUNNING = false;

const roundNum = (num) => {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
};

const renderTimes = () => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  timesAEl.innerHTML = "";
  timesBEl.innerHTML = "";
  let timeAA = roundNum(timesA.reduce(reducer) / timesA.length / 1000) * 1000;
  let timeBA = roundNum(timesB.reduce(reducer) / timesB.length / 1000) * 1000;

  aAverage.innerHTML = `${pad(
    Math.floor((timeAA % (1000 * 60 * 60)) / (1000 * 60)),
    2
  )}:${pad((timeAA % (1000 * 60)) / 1000, 2)}`;

  bAverage.innerHTML = `${pad(
    Math.floor((timeBA % (1000 * 60 * 60)) / (1000 * 60)),
    2
  )}:${pad((timeBA % (1000 * 60)) / 1000, 2)}`;

  timesA.map((time) => {
    let h3 = document.createElement("h2");
    h3.innerHTML = `${pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      2
    )}:${pad((time % (1000 * 60)) / 1000, 2)}`;
    timesAEl.appendChild(h3);
  });
  timesB.map((time) => {
    let h3 = document.createElement("h2");
    h3.innerHTML = `${pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      2
    )}:${pad((time % (1000 * 60)) / 1000, 2)}`;
    timesBEl.appendChild(h3);
  });
};

function pad(num, size) {
  num = num.toString();
  while (num.split(".")[0].length < size) num = "0" + num;
  if (num.split(".")[1]) {
    while (num.split(".")[1].length < 3) num = num + "0";
  }
  return num;
}

const updateTimes = () => {
  let time = Date.now() - START_TIME;
  mainTime.innerHTML = `${pad(
    Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    2
  )}:${pad((time % (1000 * 60)) / 1000, 2)}`;
  if (A_STOP && B_STOP) {
    renderTimes();
    window.clearInterval(updateInterval);
    RUNNING = false;
    startButton.style.display = "block";
    mainTime.innerHTML = "";
  }
};

const startTimer = () => {
  if (!RUNNING) {
    A_STOP = false;
    B_STOP = false;
    timeA.innerHTML = "---------";
    timeB.innerHTML = "---------";

    RUNNING = true;
    startButton.style.display = "none";
    START_TIME = Date.now();
    //   console.log(START_TIME);
    updateTimes();
    updateInterval = setInterval(updateTimes, 27);
  }
};

const firstStop = () => {
  if (RUNNING && !A_STOP) {
    A_STOP = true;
    let time = Date.now() - START_TIME;
    timeA.innerHTML = `${pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      2
    )}:${pad((time % (1000 * 60)) / 1000, 2)}`;
    timesA.unshift(time);
    // renderTimes();
  }
};

const secondStop = () => {
  if (RUNNING && !B_STOP) {
    B_STOP = true;
    let time = Date.now() - START_TIME;
    timeB.innerHTML = `${pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      2
    )}:${pad((time % (1000 * 60)) / 1000, 2)}`;
    timesB.unshift(time);
    // renderTimes();
  }
};

startButton.addEventListener("click", startTimer);

screenButtonA.addEventListener("touchstart", firstStop);
screenButtonB.addEventListener("touchstart", secondStop);

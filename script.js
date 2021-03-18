// Time divs
const mainTime = document.getElementById("main-time");
const timeA = document.getElementById("time-a");
const timeB = document.getElementById("time-b");
// Stop buttons
const stopA = document.getElementById("stop-a");
const stopB = document.getElementById("stop-b");
// Start button
const startButton = document.getElementById("start");

const minutes = document.querySelectorAll(".minutes");
const seconds = document.querySelectorAll(".seconds");
const tenths = document.querySelectorAll(".tenths");

let START_TIME;

let A_STOP = false;
let B_STOP = false;

let updateInterval;

let RUNNING = false;

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const updateTimes = () => {
  mainTime.innerHTML = `${pad(
    Math.floor(((Date.now() - START_TIME) % (1000 * 60 * 60)) / (1000 * 60)),
    2
  )}:${pad(
    Math.floor(((Date.now() - START_TIME) % (1000 * 60)) / 1000),
    2
  )}.${pad(Math.floor(((Date.now() - START_TIME) / 10) % 100), 2)}`;
  if (A_STOP && B_STOP) {
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
    updateInterval = setInterval(updateTimes, 20);
  }
};

const firstStop = () => {
  if (RUNNING && !A_STOP) {
    A_STOP = true;
    timeA.innerHTML = `${pad(
      Math.floor(((Date.now() - START_TIME) % (1000 * 60 * 60)) / (1000 * 60)),
      2
    )}:${pad(
      Math.floor(((Date.now() - START_TIME) % (1000 * 60)) / 1000),
      2
    )}.${pad(Math.floor(((Date.now() - START_TIME) / 10) % 100), 2)}`;
  }
};

const secondStop = () => {
  if (RUNNING && !B_STOP) {
    B_STOP = true;
    timeB.innerHTML = `${pad(
      Math.floor(((Date.now() - START_TIME) % (1000 * 60 * 60)) / (1000 * 60)),
      2
    )}:${pad(
      Math.floor(((Date.now() - START_TIME) % (1000 * 60)) / 1000),
      2
    )}.${pad(Math.floor(((Date.now() - START_TIME) / 10) % 100), 2)}`;
  }
};

startButton.addEventListener("click", startTimer);

stopA.addEventListener("touchstart", firstStop);
stopB.addEventListener("touchstart", secondStop);

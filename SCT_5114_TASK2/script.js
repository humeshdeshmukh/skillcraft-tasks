// script.js
let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapTimes = [];
const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const display = document.getElementById('display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lap-times');
const elapsedTimeDisplay = document.getElementById('elapsed-time');
const bestLapDisplay = document.getElementById('best-lap');
const worstLapDisplay = document.getElementById('worst-lap');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        startStopButton.innerHTML = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    running = false;
    display.innerHTML = '00:00:00.00';
    startStopButton.innerHTML = 'Start';
    lapTimes = [];
    lapTimesList.innerHTML = '';
    elapsedTimeDisplay.innerHTML = 'Elapsed Time: 00:00:00.00';
    bestLapDisplay.innerHTML = 'Best Lap: --:--:--.--';
    worstLapDisplay.innerHTML = 'Worst Lap: --:--:--.--';
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${lapTimes.length}: ${lapTime}`;
        lapTimesList.appendChild(lapItem);
        updateSummary();
    }
}

function updateSummary() {
    if (lapTimes.length === 0) return;

    const sortedLapTimes = lapTimes.slice().sort((a, b) => {
        const timeA = convertTimeToMilliseconds(a);
        const timeB = convertTimeToMilliseconds(b);
        return timeA - timeB;
    });

    const bestLapTime = sortedLapTimes[0];
    const worstLapTime = sortedLapTimes[sortedLapTimes.length - 1];

    elapsedTimeDisplay.innerHTML = `Elapsed Time: ${display.innerHTML}`;
    bestLapDisplay.innerHTML = `Best Lap: ${bestLapTime}`;
    worstLapDisplay.innerHTML = `Worst Lap: ${worstLapTime}`;
}

function convertTimeToMilliseconds(time) {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2].split('.')[0], 10);
    const milliseconds = parseInt(parts[2].split('.')[1], 10);
    return hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND +
         minutes * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND +
         seconds * MILLISECONDS_PER_SECOND +
         milliseconds * 10;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    
    display.innerHTML =
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

window.addEventListener('unload', () => {
    clearInterval(tInterval);
});
// script.js
let startTime, updatedTime, difference, tInterval, lapTime;
let running = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerText = "Stop";
        startStopBtn.style.backgroundColor = "#eb2f06";
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerText = "Start";
        startStopBtn.style.backgroundColor = "#ff7e5f";
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCounter = 0;
    lapsContainer.innerHTML = '';
    display.innerText = "00:00:00.000";
    startStopBtn.innerText = "Start";
    startStopBtn.style.backgroundColor = "#ff7e5f";
    display.style.color = "#333";
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement("div");
        lapTime.className = "lap";
        lapTime.innerText = `Lap ${lapCounter}: ${display.innerText}`;
        lapsContainer.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = milliseconds < 100 ? milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds : milliseconds;

    display.innerText = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    display.style.color = getRandomColor();
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

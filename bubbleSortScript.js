var playing = false;

var canvas = document.getElementById("canvas"),
    canvasContext = canvas.getContext("2d"),
    canvasSize = 900;

var colors = ["#2fff43", "#1b0cff", "#566573", "#ff8080", "#00cc00", "#006600", "#c2d6d6"],
    colorPick = 3;


document.getElementById("playButton").style.background = "linear-gradient(hsla(136, 64%, 87%, 1), hsla(136, 64%, 57%, 1))";

var array = [],
    arrayLevel = 0,
    arrayLevelLow = 0,
    direction = true,
    time = 0,
    step = 0,
    drawing = 0,
    lineHeight = 75,
    speed = 150,
    numberOfElements = 20;

createNewArray();

function mouseDown() {
    if (playing) {
        document.getElementById("playButton").style.background = "linear-gradient(hsla(0, 64%, 57%, 1), hsla(0, 64%, 87%, 1))";
    } else {
        document.getElementById("playButton").style.background = "linear-gradient(hsla(136, 64%, 57%, 1), hsla(136, 64%, 87%, 1))";
    }
}

function start() {
    if (!playing) {
        playing = true;
        document.getElementsByClassName("inner-play")[0].style.backgroundPosition = "-60px -5px";
        document.getElementById("playButton").style.background = "linear-gradient(hsla(0, 64%, 87%, 1), hsla(0, 64%, 57%, 1))";
        initSort();
    } else {
        playing = false;
        document.getElementsByClassName("inner-play")[0].style.backgroundPosition = "-60px -45px";
        document.getElementById("playButton").style.background = "linear-gradient(hsla(136, 64%, 87%, 1), hsla(136, 64%, 57%, 1))";
        clearInterval(drawing);
        resetImage();
    }
}

function resetImage() {
    canvasContext.clearRect(10, 10, canvasSize - 20, canvasSize - 20);
    drawArray(array);
}

function createRandom(array) {
    var j, x;
    for (var i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
}

function createNewArray() {
    array = [];
    for (var i = 0; i < +numberOfElements; i++) {
        array.push(Math.round(((canvasSize / 2) - lineHeight - 60)));
    }
    for (i = 0; i < array.length; i++) {
        array[i] = array[i] * ((i) * ((0.64 / array.length))) + 90;
    }
    step = array.length - 2;
    time = 0;
    direction = true;
    createRandom(array);
    resetImage();
}


function drawArray(array) {
    canvasContext.lineWidth = 2 * Math.PI * lineHeight / array.length;

    for (var i = 0; i < array.length; i++) {
        lineFunction(false, i, colors[0]);
        lineFunction(false, time - 1, colors[colorPick]);
        lineFunction(false, time, colors[colorPick]);
        lineFunction(true, i, colors[2]);
    }

}

function lineFunction(flag, radCord, color) {
    canvasContext.strokeStyle = color;
    canvasContext.lineWidth = canvasSize * 0.75 / array.length;
    if (flag) {
        canvasContext.beginPath();
        canvasContext.moveTo(radCord * (canvasSize * 0.9 / array.length) + 30, canvasSize / 2 - array[radCord]);
        canvasContext.lineTo(radCord * (canvasSize * 0.9 / array.length) + 30, canvasSize / 2 - array[radCord] - canvasSize * 0.8 / array.length);
        canvasContext.stroke();
    } else {
        canvasContext.beginPath();
        canvasContext.moveTo(radCord * (canvasSize * 0.9 / array.length) + 30, canvasSize / 2);
        canvasContext.lineTo(radCord * (canvasSize * 0.9 / array.length) + 30, canvasSize / 2 - array[radCord]);
        canvasContext.stroke();
    }
}

function initSort() {
    drawing = setInterval(sort, Math.abs(speed - 200));
}

function sort() {
    canvasContext.clearRect(10, 10, canvasSize - 20, canvasSize - 20);

    if (array[time] > array[time + 1]) {
        colorPick = 3;
    } else colorPick = 1;

    drawArray(array);

    if (arrayLevel > array.length) {
        terminateProgram();
    }

    for (var i = 0; i < array.length - 1; i++) {
        if (array[i] <= array[i + 1]) {
            arrayLevel++;
        } else {
            arrayLevel = 0;
        }
    }

    if (time < array.length - 1 - arrayLevel) {
        if (array[time] > array [time + 1]) {
            var temp = array[time + 1];
            array[time + 1] = array[time];
            array[time] = temp;
        }
        time++;

    } else {
        time = 0;
    }
}

function terminateProgram() {
    clearInterval(drawing);
    canvasContext.clearRect(10, 10, canvasSize - 20, canvasSize - 20);
    time = 0;
    colorPick = 3;
    canvasContext.lineWidth = 2 * Math.PI * lineHeight / array.length;
    for (var i = 0; i < array.length; i++) {
        lineFunction(false, i, colors[0]);
        lineFunction(true, i, colors[2]);
    }
    i = 0;
    var finishDrawing = setInterval(function () {
        if (i < array.length) {
            lineFunction(false, i, colors[1]);
            lineFunction(true, i, colors[5]);
            clearInterval(finishDrawing);
            arrayLevel = 0;
            arrayLevelLow = 0;
            playing = false;
            document.getElementsByClassName("inner-play")[0].style.backgroundPosition = "-60px -45px";
            document.getElementById("playButton").style.background = "linear-gradient(hsla(136, 64%, 87%, 1), hsla(136, 64%, 57%, 1))";
            alert("Array with " + array.length + " elements was completely sorted via bubble sort technique!");

        }
        i++;
    }, Math.abs(speed - 200) * 0.7);
}


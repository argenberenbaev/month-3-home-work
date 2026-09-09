// Первое задание - проверка правильно написанного адреса gmail.

const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.addEventListener("click", function () {
    const email = gmailInput.value;

    if (gmailRegex.test(email)) {
        gmailResult.style.color = 'green';
        gmailResult.textContent = "Указан верный формат"
    } else {
        gmailResult.style.color = 'red';
        gmailResult.textContent = "Указан неверный формат"
    }
});


// Второе задание - движение красного куба

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let position = 0;

function moveBlock() {
    position++;

    childBlock.style.left = `${position}px`;

    if (position < parentBlock.clientWidth - childBlock.clientWidth) {
        setTimeout(moveBlock, 10);
    }
}

moveBlock();



// Вторая домашка

// Задание 1 - красный куб теперь движется по всему родительскому квадрату

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;
let direction = "right";

function moveBlock() {

    if (direction === "right") {
        positionX++;

        childBlock.style.left = `${positionX}px`;

        if (positionX >= parentBlock.clientWidth - childBlock.clientWidth) {
            direction = "down";
        }
    }

    else if (direction === "down") {
        positionY++;

        childBlock.style.top = `${positionY}px`;

        if (positionY >= parentBlock.clientHeight - childBlock.clientHeight) {
            direction = "left";
        }
    }

    else if (direction === "left") {
        positionX--;

        childBlock.style.left = `${positionX}px`;

        if (positionX <= 0) {
            direction = "up";
        }
    }

    else if (direction === "up") {
        positionY--;

        childBlock.style.top = `${positionY}px`;

        if (positionY <= 0) {
            direction = "right";
        }
    }

    setTimeout(moveBlock, 10);
}

moveBlock();

// Второе задание - таймер

const seconds = document.querySelector("#seconds");
const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");

let counter = 0;
let timer = null;

start.addEventListener("click", function () {

    if (timer !== null) {
        return;
    }

    timer = setInterval(function () {
        counter++;
        seconds.textContent = counter;
    }, 1000);
});

stop.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
});

reset.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;

    counter = 0;
    seconds.textContent = counter;
});

// Третье задание - промисы 

const promise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Первый промис выполнен");
    } else {
        reject("Первый промис провалился");
    }
});

promise
    .then((result) => {
        console.log(result);

        return new Promise((resolve, reject) => {
            const success = true;

            if (success) {
                resolve("Второй промис выполнен");
            } else {
                reject("Второй промис провалился");
            }
        });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

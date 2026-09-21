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



// Третья домашка


// ФУНКЦИЯ DELAY

function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Ошибка при обработке: ${value}`));
            } else {
                resolve(value);
            }
        }, ms);
    });
}


// Задание 1
// Три последовательных delay
// Второй delay падает

console.log("========== ЗАДАНИЕ 1 ==========");

delay(1, 500)
    .then((value) => {
        console.log("Первый delay:", value);

        return delay(value + 1, 500, true);
    })
    .then((value) => {
        console.log("Второй delay:", value);

        return delay(value + 1, 500);
    })
    .then((value) => {
        console.log("Третий delay:", value);
    })
    .catch((error) => {
        console.log("Ошибка:", error.message);
    })
    .finally(() => {
        console.log("finally: цепочка завершена");
    });


// Задание 2
// Тот же принцип через async/await

async function firstAsyncAwait() {

    console.log("========== ЗАДАНИЕ 2 ==========");

    try {
        let value = await delay(1, 500);

        console.log("Первый delay:", value);

        value = await delay(value + 1, 500, true);

        console.log("Второй delay:", value);

        value = await delay(value + 1, 500);

        console.log("Третий delay:", value);

    } catch (error) {
        console.log("Ошибка:", error.message);

    } finally {
        console.log("finally: цепочка завершена");
    }
}

firstAsyncAwait();


// Задание 2.2
// Массив из 4 значений
// Обрабатываем последовательно
// Ошибка одного элемента не останавливает цикл

async function processArray() {

    console.log("========== МАССИВ И ASYNC/AWAIT ==========");

    const values = [1, 2, 3, 4];

    const results = [];

    for (const value of values) {

        try {

            const result = await delay(
                value,
                500,
                Math.random() > 0.7
            );

            results.push({
                value: result
            });

            console.log("Успешно:", result);

        } catch (error) {

            results.push({
                value: value,
                error: error.message
            });

            console.log("Ошибка:", error.message);
        }
    }

    console.log("Итоговый массив:", results);
}

processArray();


// Задание 3
// Promise.all

async function promiseAllExample() {

    console.log("========== PROMISE.ALL ==========");

    const promises = [
        delay(1, 1000),
        delay(2, 500),
        delay(3, 1500, true),
        delay(4, 700)
    ];

    try {

        const results = await Promise.all(promises);

        console.log("Все успешно:", results);

    } catch (error) {

        console.log("Promise.all поймал ошибку:", error.message);
    }
}

promiseAllExample();


// Promise.Allsettled


async function promiseAllSettledExample() {

    console.log("========== PROMISE.ALLSETTLED ==========");

    const promises = [
        delay(1, 1000),
        delay(2, 500),
        delay(3, 1500, true),
        delay(4, 700)
    ];

    const results = await Promise.allSettled(promises);

    console.log("Все результаты:", results);


    const succeeded = results.filter(
        (item) => item.status === "fulfilled"
    );


    const failed = results.filter(
        (item) => item.status === "rejected"
    );


    console.log("Успешные:", succeeded);

    console.log("Ошибки:", failed);
}

promiseAllSettledExample();


// Promise.race

async function promiseRaceExample() {

    console.log("========== PROMISE.RACE ==========");

    try {

        const result = await Promise.race([

            delay("Полезный результат", 2000),

            delay("Таймаут", 500, true)

        ]);

        console.log("Победитель:", result);

    } catch (error) {

        console.log("Promise.race:", error.message);
    }
}

promiseRaceExample();

// Домашнее задание 5

const form = document.querySelector("#homeworkForm");
const result = document.querySelector("#result");
const agreement = document.querySelector("#agreement");

const url = "https://jsonplaceholder.typicode.com/posts";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Проверяем checkbox
    if (!agreement.checked) {
        result.textContent = "Please agree to the processing of your data";
        return;
    }

    try {
        // 1. Aapplication/JSON

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        const jsonResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!jsonResponse.ok) {
            throw new Error(`JSON error: ${jsonResponse.status}`);
        }

        const jsonResult = await jsonResponse.json();

        console.log("JSON response:", jsonResult);


        // 2. Multipart/FORM-DATA

        const multipartData = new FormData(form);

        const formDataResponse = await fetch(url, {
            method: "POST",
            body: multipartData
        });

        if (!formDataResponse.ok) {
            throw new Error(`FormData error: ${formDataResponse.status}`);
        }

        const formDataResult = await formDataResponse.json();

        console.log("FormData response:", formDataResult);

        result.textContent = "Data successfully sent!";

    } catch (error) {
        console.error("Error:", error);
        result.textContent = `Error: ${error.message}`;
    }
});

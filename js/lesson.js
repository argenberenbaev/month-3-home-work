const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentTab = 0;

const showBlock = (index = 0) => {
    currentTab = index;

    tabBlocks.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    tabs.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
};

showBlock();

tabsParent.onclick = (event) => {
    const selected = event.target.closest('.tab_content_item');

    if (!selected) return;

    const selectedIndex = [...tabs].indexOf(selected);

    showBlock(selectedIndex);
};


// Автоматический слайдер

setInterval(() => {
    currentTab++;

    if (currentTab === tabBlocks.length) {
        currentTab = 0;
    }

    showBlock(currentTab);
}, 5000);


// Конвертер

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = async (element) => {
    const response = await fetch('../data/converter.json');
    const { usd, eur } = await response.json();

    if (element.value === '') {
        somInput.value = '';
        usdInput.value = '';
        eurInput.value = '';
        return;
    }

    if (element.id === 'som') {
        usdInput.value = (element.value / usd).toFixed(2);
        eurInput.value = (element.value / eur).toFixed(2);
    }

    if (element.id === 'usd') {
        const som = element.value * usd;

        somInput.value = som.toFixed(2);
        eurInput.value = (som / eur).toFixed(2);
    }

    if (element.id === 'eur') {
        const som = element.value * eur;

        somInput.value = som.toFixed(2);
        usdInput.value = (som / usd).toFixed(2);
    }
};

somInput.oninput = () => converter(somInput);
usdInput.oninput = () => converter(usdInput);
eurInput.oninput = () => converter(eurInput);


// CARD SWITCHER

const TODO_API = 'https://jsonplaceholder.typicode.com/todos/';

const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
const card = document.querySelector('.card');

let num = 1;

const fetchTodo = async (id = 1) => {
    const response = await fetch(`${TODO_API}${id}`);

    const {
        id: idCard,
        title,
        completed
    } = await response.json();

    const color = completed ? 'green' : 'red';

    card.style.borderColor = color;

    card.innerHTML = `
        <p>ID -> ${idCard}</p>
        <p>${title}</p>
        <p style="color:${color}">
            ${completed ? 'Completed' : 'Not Completed'}
        </p>
    `;
};

const changeCard = (direction) => {
    if (direction === 'next') {
        num = num === 200 ? 1 : num + 1;
    } else {
        num = num === 1 ? 200 : num - 1;
    }

    fetchTodo(num);
};

fetchTodo();

btnNext.onclick = () => changeCard('next');

btnPrev.onclick = () => changeCard('prev');

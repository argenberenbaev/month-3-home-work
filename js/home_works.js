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
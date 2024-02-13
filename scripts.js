const ROWS = 6; // попыток угадать
const COLUMNS = 3; // букв в слове
let popitka = 0; // для взятия нужного ряда
let row_inputs;

function init() {
    let container = document.createElement("div");
    container.classList.add("container");
    document.querySelector("main").append(container);
    for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        console.log(row)
        for (let j = 0; j < COLUMNS; j++) {
            let tile = document.createElement("input");
            tile.disabled = true;
            tile.maxLength = "1";
            row.append(tile);
        }
        container.append(row);
    }

}
init();

const alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯяюэьыъщшчцхфутсрпонмлкйизжедгвба";

let forbid = ["аут", "фак", "хуй", "хер", "лох"];
let words = ["дом", "кот", "пар", "лес", "жук", "куб", "шар", "душ", "мир", "мак", "рок", "нос", "сыр", "мул", "миг", "фен", "нюх", "сев", "лис", "тис", "бок", "бар", "гад", "ухо", "вид", "акт", "имя", "боб", "икс", "воз", "зов"];
let answer;

let btn_start = document.querySelector("#btn_start");


btn_start.addEventListener("click", () => {
    if (answer != undefined) {
        location.reload();
    }
    btn_start.innerHTML = "Сбросить игру";
    popitka = 0;
    makeRowInteract(popitka);
    answer = words[Math.floor(Math.random() * words.length)].toLowerCase();
    console.log(answer);


    // для очистки и блокировки всех инпутов(при новой игре)
    let inputs = document.querySelectorAll("input");
    inputs.forEach((pole_vvoda) => {
        pole_vvoda.value = "";
        pole_vvoda.style.backgroundColor = "whitesmoke";
        pole_vvoda.disabled = true;
    })
    // открыть первую букву
    let first_box = document.querySelector(".row").querySelector("input")
    first_box.disabled = false;
    first_box.style.backgroundColor = 'white';
})


// делаем ряд интерактивным
function makeRowInteract(rowIndex) {
    row_inputs = document.querySelectorAll(".row")[popitka].querySelectorAll("input") // выбор нужного ряда
    for (let i = 0; i < row_inputs.length - 1; i++) {
        row_inputs[i].addEventListener("keyup", (e) => {
            // перебор всех, кроме последней
            // console.log(e);
            if (alphabet.includes(e.key)) {
                row_inputs[i + 1].disabled = false; // включение след. ячейки
                row_inputs[i + 1].focus();
                row_inputs[i + 1].style.backgroundColor = 'white';
            } else {
                row_inputs[i].value = "";
            }
        });
    }

    // обработка последнего input
    // событие проверки последнего инпута
    row_inputs[row_inputs.length - 1].addEventListener("keyup", (e) => {
        if (alphabet.includes(e.key)) {
            row_inputs.forEach((pole) => {
                pole.disabled = true;
            }); // отключаем все поля
            checkAnswer(row_inputs);
        } else {
            row_inputs[row_inputs.length - 1].value = "";
        }
    });
}

function checkAnswer(inputRow) {
    let userAnswer = "";
    // складывание ответа побуквенно из inputов
    inputRow.forEach((pole) => {
        userAnswer += pole.value;
    });
    userAnswer = userAnswer.toLowerCase();
    // запрещенные слова
    if (forbid.includes(userAnswer)) {
        for (let i = 0; i < inputRow.length; i++) {
            inputRow[i].value = "НЕА"[i];
            inputRow[i].style.color = "red";
        }
        nextRow();
        return; // прекращение функции
    }

    // разные исходы
    // правильный ответ
    if (userAnswer == answer) {
        inputRow.forEach((pole) => {
            pole.style.backgroundColor = "lightgreen";
        });
    } else {
        // ответ неверный
        let a_array = answer.split(""); // разбили слово на список букв

        for (let i = 0; i < inputRow.length; i++) {
            // если буква есть в слове
            if (a_array.includes(userAnswer[i])) {
                if (userAnswer[i] == answer[i]) {
                    // буква на нужной позиции
                    delete a_array[a_array.indexOf(answer[i])];
                    inputRow[i].style.backgroundColor = "lightgreen";
                }
            }
        }

        for (let i = 0; i < inputRow.length; i++) {
            if (inputRow[i].style.backgroundColor == "lightgreen") {
                continue;
            }
            if (a_array.includes(userAnswer[i])) {
                inputRow[i].style.backgroundColor = "yellow";
            }
            else {
                inputRow[i].style.backgroundColor = "grey";
            }
        }

        // переход к след. ряду
        nextRow();
    }
}

function nextRow() {
    popitka++; // для взятия нужного ряда
        row_inputs = document.querySelectorAll(".row")[popitka].querySelectorAll("input");
        row_inputs[0].disabled = false;
        row_inputs[0].focus();
        makeRowInteract(popitka);
}
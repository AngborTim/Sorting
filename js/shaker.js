
let count = 20;
let numbers_array_shaker = Array.from(Array(count).keys());
let a = 0;
let delay = 100;
let flag = false;
let last_change;

$(document).ready(function () {
    shuffle_shaker(Object.assign([], numbers_array_shaker));
    new_numbers();

    $("#btn_shaker").on('click', () => {
        loop_with_delay(numbers_array_shaker);
    })
});

function loop_with_delay(n_array) {
    setTimeout(function () {
        if (comparation(a)) {
            flag = true;
        }
        a++;
        if (a < count) {
            loop_with_delay(n_array);
        }
        else if (flag) {
            flag = false;
            a = 0;
            count = last_change; // сокращает счетчик соответственно последней позиции
            // когда была произведена перестановка
            green_color(2);
            loop_with_delay(n_array);
        }
        else if (!flag) {
            green_color(1);
            alert("End");
            return;
        }
    }, delay)
    return
}

function comparation(a) {
    if ($("#" + "n" + a).css("background-color") == "rgb(112, 128, 144)") {
        $("#" + "n" + a).css("background-color", "transparent");
    }
    else {
        $("#" + "n" + a).css("background-color", "slategrey");
    }
    if (numbers_array_shaker[a] > numbers_array_shaker[a + 1] && a + 1 < numbers_array_shaker.length) {
        // устанавливаем флаг замены
        let tmp = numbers_array_shaker[a];
        numbers_array_shaker[a] = numbers_array_shaker[a + 1];
        change_cell(a, numbers_array_shaker[a + 1], a);
        numbers_array_shaker[a + 1] = tmp;
        change_cell(a + 1, tmp, a);
        last_change = a; // сохраняем позицию в массиве, когда была сделана перестановка
        return true;
    }
    else {
        return false;
    }
}

function green_color(all) {
    if (all == 1) z = 0;
    else z = count + 1;
    for (let i = z; i < numbers_array_shaker.length; i++) {
        $("#" + "n" + i).css("background-color", "mediumspringgreen");
    }
}

function shuffle_shaker(n_array) {
    // пока длинна временного массива больше 1
    if (n_array.length - 1 > 1) {
        // получаем случайное число от 1 до последнего индекса массива цифр
        let z = Math.floor(Math.random() * (n_array.length - 1))
        // меняем местами цифры между последней позицией и позицией z
        n_array[z] = numbers_array_shaker[n_array.length - 1]
        numbers_array_shaker[n_array.length - 1] = numbers_array_shaker[z];
        numbers_array_shaker[z] = n_array[z];
        // убираем последнюю позицию из временного массива
        n_array.pop();
        // передаем в рекурсию
        shuffle_shaker(n_array);
    }
    else {
        // если временный массив - одна цифра, выходим из рекурсии
        return 0;
    }
}

function new_numbers() {
    for (let i = 0; i < count; i++) {
        let a = $("<td class='cell border' id='n" + i + "'></td>").text(numbers_array_shaker[i]);
        $("#numbers").append(a);
        $("#buffer").append("<td class='cell border' id='b" + i + "'></td>");
    }
}

function change_cell(index, value, delay) {
    $("#" + "n" + index).text(value)
}
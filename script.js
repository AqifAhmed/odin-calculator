const output = document.querySelector('.output');
const keys = document.querySelectorAll('.key');
const operator = document.querySelectorAll('.operator');
const enter = document.querySelector('.enter');
const decimal = document.querySelector('.decimal');

keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.value;

        if (value === 'AC') {
            output.innerHTML = '0';
        } else if (value === 'C') {
            output.innerHTML = output.innerHTML.slice(0, -1) || '0';
        } else {
            if (output.innerHTML === '0') {
                output.innerHTML = value;
            } else {
                output.innerHTML += value;
            }
        }
    });
});

decimal.addEventListener("click", () => {
    if (!output.innerHTML.includes('.')) {
        output.innerHTML += decimal.value;
    }
})

enter.addEventListener("click", () => {
    evaluate();
});

operator.forEach(op => {
    op.addEventListener("click", () => {
        const value = op.value;
        evaluate();
        if (!output.innerHTML.includes("+") && !output.innerHTML.includes("-") && !output.innerHTML.includes("*") && !output.innerHTML.includes("÷")) {
            output.innerHTML += value;
        }
    })
});

function evaluate() {

    if (output.innerHTML.includes("+")) {

        const array = output.innerHTML.split("+");
        if (array[1] !== '') {
            const out = parseFloat(array[0]) + parseFloat(array[1]);
            if (Number.isInteger(out)) {
                output.innerHTML = out;
            } else {
                output.innerHTML = out.toFixed(1);
            }
        }

    } else if (output.innerHTML.includes("-")) {

        const array = output.innerHTML.split("-");
        if (array[1] !== '') {
            const out = parseFloat(array[0]) - parseFloat(array[1]);
            if (Number.isInteger(out)) {
                output.innerHTML = out;
            } else {
                output.innerHTML = out.toFixed(1);
            }
        }

    } else if (output.innerHTML.includes("*")) {

        const array = output.innerHTML.split("*");
        if (array[1] !== '') {
            const out = parseFloat(array[0]) * parseFloat(array[1]);
            if (Number.isInteger(out)) {
                output.innerHTML = out;
            } else {
                output.innerHTML = out.toFixed(1);
            }
        }

    } else if (output.innerHTML.includes("÷")) {

        const array = output.innerHTML.split("÷");
        if (array[1] !== '') {
            const out = parseFloat(array[0]) / parseFloat(array[1]);
            if (Number.isInteger(out)) {
                output.innerHTML = out;
            } else {
                output.innerHTML = out.toFixed(1);
            }
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    const key = e.key;

    const keyMap = {
        '/': '÷',
        '*': '*',
        '+': '+',
        '-': '-',
        '=': '=',
        'Enter': '=',
        'Escape': 'AC',
        '.': '.',
    };

    if (!isNaN(key)) {
        pressButton(key);
    }

    else if (key in keyMap) {
        pressButton(keyMap[key]);
    }

    else if (key === 'Backspace') {
        const display = document.querySelector('.output');
        display.textContent = display.textContent.slice(0, -1) || '0';
    }
}


function pressButton(value) {
    const button = [...document.querySelectorAll('button')].find(
        btn => btn.value === value
    );
    if (button) {
        button.click();
    }
}

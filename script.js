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

    // Allow number keys and decimal
    if (!isNaN(key) || key === '.') {
        pressButton(key);
    }

    // Allow operators and special keys
    if (['+', '-', '*', '/', 'Enter', '=', 'Backspace', 'Escape'].includes(key)) {
        if (key === 'Enter' || key === '=') {
            pressButton('=');
        } else if (key === 'Escape') {
            pressButton('AC');
        } else if (key === 'Backspace') {
            // Optional: Implement custom backspace logic
        } else {
            pressButton(key);
        }
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

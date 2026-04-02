const output = document.querySelector('.output');
const expression = document.querySelector('.expression');
const keys = document.querySelectorAll('.key');
const operator = document.querySelectorAll('.operator');
const enter = document.querySelector('.enter');
const decimal = document.querySelector('.decimal');

keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.value;

        if (value === 'AC') {
            output.textContent = '0';
            expression.textContent = '';
        } else if (value === 'C') {
            output.textContent = output.textContent.slice(0, -1) || '0';
            expression.textContent = output.textContent === '0' ? '' : output.textContent;
        } else {
            if (output.textContent === '0') {
                output.textContent = value;
            } else {
                output.textContent += value;
            }
            expression.textContent = '';
        }
        adjustFontSize();
    });
});

decimal.addEventListener("click", () => {
    if (!output.textContent.includes('.')) {
        output.textContent += decimal.value;
    }
    adjustFontSize();
})

enter.addEventListener("click", () => {
    evaluate();
});

operator.forEach(op => {
    op.addEventListener("click", () => {
        const value = op.value;
        evaluate();
        if (!output.textContent.includes("+") && !output.textContent.includes("-") && !output.textContent.includes("*") && !output.textContent.includes("÷")) {
            output.textContent += value;
        }
        adjustFontSize();
    })
});

function formatResult(num) {
    return Number.isInteger(num) ? String(num) : num.toFixed(1);
}

function evaluate() {
    const operators = ['+', '-', '*', '÷'];
    const ops = operators.filter(op => output.textContent.includes(op));
    if (ops.length === 0) return;

    const op = ops[0];
    const array = output.textContent.split(op);
    if (array.length < 2 || array[1] === '') return;

    const a = parseFloat(array[0]);
    const b = parseFloat(array[1]);
    let result;

    if (op === '+') result = a + b;
    else if (op === '-') result = a - b;
    else if (op === '*') result = a * b;
    else if (op === '÷') result = a / b;

    expression.textContent = output.textContent + ' =';
    output.textContent = formatResult(result);
    adjustFontSize();
}

function adjustFontSize() {
    const len = output.textContent.length;
    if (len > 12) {
        output.style.fontSize = '24px';
    } else if (len > 8) {
        output.style.fontSize = '32px';
    } else {
        output.style.fontSize = '';
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

    if (/^\d$/.test(key)) {
        pressButton(key);
    } else if (key in keyMap) {
        pressButton(keyMap[key]);
    } else if (key === 'Backspace') {
        output.textContent = output.textContent.slice(0, -1) || '0';
        expression.textContent = output.textContent === '0' ? '' : output.textContent;
        adjustFontSize();
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



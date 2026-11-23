const result = document.getElementById("result");

const buttons = document.querySelectorAll(".buttons button");


let firstNumber = null;

let operator = null;

let newNumber = true;




buttons.forEach(button => {

    button.addEventListener("click", function() {

        const value = button.dataset.value;

        const action = button.dataset.action;


        if (value !== undefined) {

            if (["+", "-", "*", "/"].includes(value)) {

                handleOperator(value);

            } else {

                inputNumber(value);

            }

        }

        else if (action === "clear") {

            clearCalculator();

        }

        else if (action === "delete") {

            deleteNumber();

        }

        else if (action === "percent") {

            percentage();

        }

        else if (action === "calculate") {

            calculate();

        }

    });

});


function inputNumber(number) {

    if (newNumber) {

        result.value = number === "." ? "0." : number;

        newNumber = false;

    }

    else if (number === "." && result.value.includes(".")) {

        return;

    }

    else {

        result.value += number;

    }

}


function handleOperator(selectedOperator) {

    if (
        result.value === "" ||
        result.value === "لا يمكن القسمة على صفر"
    ) {

        return;

    }

    if (firstNumber !== null && operator !== null && !newNumber) {

        calculate();

    }

    firstNumber = Number(result.value);

    operator = selectedOperator;

    newNumber = true;

}



function calculate() {

    if (
        operator === null ||
        firstNumber === null ||
        newNumber
    ) {

        return;

    }

    const secondNumber = Number(result.value);

    let answer;

    switch (operator) {

        case "+":

            answer = firstNumber + secondNumber;

            break;


        case "-":

            answer = firstNumber - secondNumber;

            break;


        case "*":

            answer = firstNumber * secondNumber;

            break;


        case "/":

            if (secondNumber === 0) {

                result.value = "لا يمكن القسمة على صفر";

                firstNumber = null;

                operator = null;

                newNumber = true;

                return;

            }

            answer = firstNumber / secondNumber;

            break;

    }

    result.value = String(Number(answer.toFixed(10)));

    firstNumber = null;

    operator = null;

    newNumber = true;

}



function clearCalculator() {

    result.value = "0";

    firstNumber = null;

    operator = null;

    newNumber = true;

}



function deleteNumber() {

    if (newNumber) {

        return;

    }

    result.value = result.value.slice(0, -1);

    if (result.value === "" || result.value === "-") {

        result.value = "0";

    }

}




function percentage() {

    let number = Number(result.value);

    result.value = String(number / 100);

    newNumber = true;

}




document.addEventListener("keydown", function(event) {

    const key = event.key;


    if ("0123456789.".includes(key) && key.length === 1) {

        inputNumber(key);

    }

    else if (["+", "-", "*", "/"].includes(key)) {

        handleOperator(key);

    }

    else if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        deleteNumber();

    }

    else if (key === "Escape") {

        clearCalculator();

    }

    else if (key === "%") {

        percentage();

    }

});
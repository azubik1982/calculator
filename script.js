const numbers = document.querySelectorAll(".number"),
      operations = document.querySelectorAll(".operator"),
      clearBtns = document.querySelectorAll(".clear-btn"),
      decimalBtn = document.getElementById("decimal"),
      display = document.getElementById("display");
let MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = "";

for(let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener("click", function(e){
        numberPress(e.target.textContent);
    });
};

for(let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
        operationBtn.addEventListener("click", function(e){
            operationPress(e.target.textContent);
        });
};

for(let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
        clearBtn.addEventListener("click", function(e){
        clear(e.target.textContent);
        });
};

function numberPress(number) {
    if(MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        display.value =  (display.value === "0") ? number : display.value + number;
    };
};

function operationPress(op) {
    let localOperationMemory = Number(display.value);

    if(MemoryNewNumber && MemoryPendingOperation !== "=") {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        switch (MemoryPendingOperation) {
            case "+":
                MemoryCurrentNumber = MemoryCurrentNumber + localOperationMemory;
            break;
            case "-":
                MemoryCurrentNumber = MemoryCurrentNumber - localOperationMemory;
            break;
            case "*":
                MemoryCurrentNumber = MemoryCurrentNumber * localOperationMemory;
            break;
            case "/":
                MemoryCurrentNumber = MemoryCurrentNumber / localOperationMemory;
            break;
            default:
                MemoryCurrentNumber = localOperationMemory;
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    };
};

function decimal(argument) {
    decimalBtn.addEventListener("click", decimal);
    let localDecimalMemory = display.value;

    if(MemoryNewNumber) {
        localDecimalMemory = "0.";
        MemoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf(".") === -1) {
            localDecimalMemory += "."
        }
    };
        display.value = localDecimalMemory;
};

function clear(id) {
    if(id === "ce") {
        display.value = "0"
        MemoryNewNumber = true;
    } else if(id === "c") {
        display.value = "0"
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0,
        MemoryPendingOperation = "";
    }
};

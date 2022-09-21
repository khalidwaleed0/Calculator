let n1 = 0,
	n2 = NaN;
let op = "";

document.querySelectorAll("button").forEach((item) => (item.onclick = makeAction));
const inputArea = document.querySelector(".input-area");
const memoryArea = document.querySelector(".memory-area");

function makeAction(e) {
	let pressedButton = e.target.innerHTML;
	if (pressedButton === ".") appendDot();
	else if (pressedButton === "DELETE") deleteLastDigit();
	else if (pressedButton === "CLEAR") clear();
	else if (isNaN(pressedButton)) receiveOperation(pressedButton);
	else appendNumber(pressedButton);
}

function appendNumber(pressedButton) {
	if (inputArea.textContent === "0") inputArea.textContent = "";
	inputArea.textContent += pressedButton;
}

function appendDot() {
	if (inputArea.textContent === "") inputArea.textContent = "0.";
	else if (!inputArea.textContent.includes(".")) inputArea.textContent += ".";
}

function clear() {
	n1 = 0;
	n2 = NaN;
	op = "";
	inputArea.textContent = "0";
	memoryArea.textContent = "";
}

function deleteLastDigit() {
	if (inputArea.textContent !== "0") inputArea.textContent = inputArea.textContent.slice(0, -1);
}

function receiveOperation(pressedButton) {
	if (pressedButton === "=") {
		if (memoryArea.textContent.includes("=") || op === "") return;
		n2 = Number(inputArea.textContent);
		let result = makeOperation();
		if (result === undefined) clear();
		else {
			memoryArea.textContent = n1 + " " + op + " " + n2 + " =";
			inputArea.textContent = result;
			n1 = result;
			n2 = NaN;
			op = "";
		}
	} else if (memoryArea.textContent === "" || memoryArea.textContent.includes("=")) {
		n1 = Number(inputArea.textContent);
		op = pressedButton;
		memoryArea.textContent = n1 + " " + op;
		inputArea.textContent = "";
	} else if (inputArea.textContent !== "") {
		n2 = Number(inputArea.textContent);
		let result = makeOperation();
		if (result === undefined) clear();
		else {
			memoryArea.textContent = result + " " + pressedButton;
			inputArea.textContent = "";
			n1 = result;
			n2 = NaN;
			op = pressedButton;
		}
	} else {
		op = pressedButton;
		memoryArea.textContent = n1 + " " + op;
	}
}

function makeOperation() {
	let result = NaN;
	switch (op) {
		case "+":
			result = add();
			break;
		case "-":
			result = subtract();
			break;
		case "x":
			result = multiply();
			break;
		case "÷":
			result = divide();
			break;
	}
	return result;
}

function add() {
	return n1 + n2;
}

function subtract() {
	return n1 - n2;
}

function multiply() {
	return n1 * n2;
}

function divide() {
	console.log(n1);
	console.log(n2);
	console.log(n1 / n2);
	if (n2 === 0) alert("You cannot divide by 0 !");
	else return n1 / n2;
}

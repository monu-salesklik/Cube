// Calculator logic
export function calculate(operation) {
  const input = document.getElementById(`${operation}Input`);
  const resultDiv = document.getElementById(`${operation}Result`);

  if (!input || !resultDiv) {
    console.error('Required DOM elements not found');
    return;
  }

  if (!input.value) {
    showError(resultDiv, 'Please enter a number');
    return;
  }

  const number = parseFloat(input.value);
  let result;

  switch (operation) {
    case 'square':
      result = number * number;
      break;
    case 'cube':
      result = number * number * number;
      break;
    case 'squareRoot':
      if (number < 0) {
        showError(resultDiv, 'Cannot calculate square root of a negative number');
        return;
      }
      result = Math.sqrt(number);
      break;
    case 'cubeRoot':
      result = Math.cbrt(number);
      break;
  }

  showResult(resultDiv, `Result: ${result}`);
}

function showResult(element, message) {
  element.textContent = message;
  element.classList.remove('d-none', 'alert-danger');
  element.classList.add('alert-success');
}

function showError(element, message) {
  element.textContent = message;
  element.classList.remove('d-none', 'alert-success');
  element.classList.add('alert-danger');
}
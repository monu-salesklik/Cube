// Quiz data
const quizData = {
  squareRoots: Array.from({ length: 100 }, (_, i) => ({
    number: Math.pow(i + 1, 2),
    answer: i + 1
  })),
  cubeRoots: Array.from({ length: 100 }, (_, i) => ({
    number: Math.pow(i + 1, 3),
    answer: i + 1
  }))
};

let currentQuiz = {
  squareRoot: getRandomQuestion('squareRoots'),
  cubeRoot: getRandomQuestion('cubeRoots')
};

function getRandomQuestion(type) {
  const questions = quizData[type];
  return questions[Math.floor(Math.random() * questions.length)];
}

function calculate(operation) {
  const input = document.getElementById(`${operation}Input`).value;
  const resultDiv = document.getElementById(`${operation}Result`);
  let result;

  if (!input) {
    showError(resultDiv, 'Please enter a number');
    return;
  }

  const number = parseFloat(input);

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

function checkQuizAnswer(type) {
  const input = document.getElementById(`quiz${type}Input`).value;
  const resultDiv = document.getElementById(`quiz${type}Result`);
  
  if (!input) {
    showError(resultDiv, 'No answer provided');
    return;
  }

  const userAnswer = parseFloat(input);
  const correctAnswer = currentQuiz[type].answer;

  if (userAnswer === correctAnswer) {
    showResult(resultDiv, 'Correct! Well done! 🎉');
  } else {
    showError(resultDiv, `Incorrect. The answer was ${correctAnswer}`);
  }

  // Generate new question
  currentQuiz[type] = getRandomQuestion(type === 'squareRoot' ? 'squareRoots' : 'cubeRoots');
  document.getElementById(`quiz${type}Question`).textContent = currentQuiz[type].number;
  document.getElementById(`quiz${type}Input`).value = '';
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

// Initialize quiz questions when page loads
window.onload = function() {
  document.getElementById('quizSquareRootQuestion').textContent = currentQuiz.squareRoot.number;
  document.getElementById('quizCubeRootQuestion').textContent = currentQuiz.cubeRoot.number;
};

// Add functions to window object
window.calculate = calculate;
window.checkQuizAnswer = checkQuizAnswer;
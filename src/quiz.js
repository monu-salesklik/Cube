// Quiz data and logic
export const quizData = {
  squareRoots: Array.from({ length: 100 }, (_, i) => ({
    number: Math.pow(i + 1, 2),
    answer: i + 1
  })),
  cubeRoots: Array.from({ length: 100 }, (_, i) => ({
    number: Math.pow(i + 1, 3),
    answer: i + 1
  }))
};

export let currentQuiz = {
  squareRoot: null,
  cubeRoot: null
};

export function getRandomQuestion(type) {
  const questions = quizData[type];
  return questions[Math.floor(Math.random() * questions.length)];
}

export function initializeQuiz() {
  currentQuiz.squareRoot = getRandomQuestion('squareRoots');
  currentQuiz.cubeRoot = getRandomQuestion('cubeRoots');
  
  const squareRootQuestion = document.getElementById('quizSquareRootQuestion');
  const cubeRootQuestion = document.getElementById('quizCubeRootQuestion');
  
  if (squareRootQuestion) {
    squareRootQuestion.textContent = currentQuiz.squareRoot.number;
  }
  if (cubeRootQuestion) {
    cubeRootQuestion.textContent = currentQuiz.cubeRoot.number;
  }
}

export function checkQuizAnswer(type) {
  const input = document.getElementById(`quiz${type}Input`);
  const resultDiv = document.getElementById(`quiz${type}Result`);
  const questionSpan = document.getElementById(`quiz${type}Question`);
  
  if (!input || !resultDiv || !questionSpan) {
    console.error('Required DOM elements not found');
    return;
  }

  if (!input.value) {
    showError(resultDiv, 'No answer provided');
    return;
  }

  const userAnswer = parseFloat(input.value);
  const correctAnswer = currentQuiz[type].answer;

  if (userAnswer === correctAnswer) {
    showResult(resultDiv, 'Correct! Well done! 🎉');
  } else {
    showError(resultDiv, `Incorrect. The answer was ${correctAnswer}`);
  }

  // Generate new question
  currentQuiz[type] = getRandomQuestion(type === 'squareRoot' ? 'squareRoots' : 'cubeRoots');
  questionSpan.textContent = currentQuiz[type].number;
  input.value = '';
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
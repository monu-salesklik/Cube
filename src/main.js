import { calculate } from './calculator.js';
import { checkQuizAnswer, initializeQuiz } from './quiz.js';

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeQuiz();
});

// Add functions to window object for HTML access
window.calculate = calculate;
window.checkQuizAnswer = checkQuizAnswer;
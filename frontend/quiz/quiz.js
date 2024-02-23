// app.js
const socket = io("http://localhost:3000", { transports: ["websocket"] });

let currentQuestionIndex = 0;

function joinQuiz() {
  const username = document.getElementById('usernameInput').value;
  socket.emit('joinQuiz', { username });
}

function submitAnswer() {
  const answer = document.querySelector('input[name="answer"]:checked');
  if (answer) {
    const questionIndex = currentQuestionIndex;
    socket.emit('submitAnswer', { answer: answer.value, questionIndex });
    nextQuestion();
  } else {
    alert('Please select an answer');
  }
}

function renderQuestions(questions) {
  const quizQuestions = document.getElementById('quizQuestions');
  quizQuestions.innerHTML = '';

  questions.forEach((q, index) => {
    const questionElement = document.createElement('li');
    questionElement.textContent = `${q.question} (${q.options.join(', ')})`;
    const options = q.options.map((option) => `<label><input type="radio" name="answer" value="${option}">${option}</label>`);
    questionElement.innerHTML += `<ul>${options.join('')}</ul>`;
    quizQuestions.appendChild(questionElement);
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  // Pass the entire array of questions to renderQuestions
  renderQuestions(quizQuestions);
}

socket.on('quizQuestions', (questions) => {
  renderQuestions(questions);
});

socket.on('quizInitialization', (data) => {
  renderQuestions(data.questions);
});

socket.on('updateParticipants', (participants) => {
  const participantsList = document.getElementById('participants');
  participantsList.innerHTML = '';

  Object.values(participants).forEach((participant) => {
    const participantElement = document.createElement('li');
    participantElement.textContent = `${participant.username}: ${participant.score} points`;
    participantsList.appendChild(participantElement);
  });
});


function submitAnswer() {
  const answer = document.querySelector('input[name="answer"]:checked');
  if (answer) {
    const questionIndex = currentQuestionIndex;
    socket.emit('submitAnswer', { answer: answer.value, questionIndex }, (data) => {
      if (data.success) {
        // Answer submitted successfully, update UI or perform any other actions
      }
    });
    nextQuestion();
  } else {
    alert('Please select an answer');
  }
}

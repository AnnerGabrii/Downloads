const quizData = [
    {
        question: "Qual é o agente etiológico da esquistossomose?",
        a: "Ascaris lumbricoides",
        b: "Taenia solium",
        c: "Schistosoma mansoni",
        d: "Wuchereria bancrofti",
        correct: "c"
    },
    {
        question: "Qual doença é transmitida pelo mosquito do gênero Culex?",
        a: "Filariose",
        b: "Ancilostomíase",
        c: "Teníase",
        d: "Ascaridíase",
        correct: "a"
    },
    {
        question: "Como se previne a ancilostomíase?",
        a: "Evitar contato com água contaminada",
        b: "Usar calçados",
        c: "Cozinhar bem a carne",
        d: "Usar repelente",
        correct: "b"
    },
    {
        question: "Qual é o sintoma principal da ascaridíase?",
        a: "Febre",
        b: "Inchaço nas pernas",
        c: "Diarreia",
        d: "Anemia",
        correct: "c"
    },
    {
        question: "Qual é o vetor da esquistossomose?",
        a: "Caramujo",
        b: "Mosquito",
        c: "Mosca",
        d: "Carrapato",
        correct: "a"
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;
let countBtn =0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    countBtn =0;
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
        answerEl.parentElement.classList.remove('answer-correct', 'answer-error'); // Remove as classes de feedback visual
    });
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
   
    if (answer) {
        countBtn++;
        const correctAnswer = quizData[currentQuiz].correct;
        const selectedAnswerEl = document.getElementById(answer).parentElement;
        const correctAnswerEl = document.getElementById(correctAnswer).parentElement;


        if (countBtn === 1) {
            // Exibe o feedback visual no primeiro clique
            if (answer === correctAnswer) {
                selectedAnswerEl.classList.add('answer-correct');
                score++;
            } else {
                selectedAnswerEl.classList.add('answer-error');
                correctAnswerEl.classList.add('answer-correct');
            }
        } else if (countBtn >= 2) {
            // Avança para a próxima questão no segundo clique ou mais
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            }  
            else {

                if(score >= 4 && score <=5){
                    quiz.innerHTML = `<h2>Parabéns !!! Você acertou ${score} de ${quizData.length} questões.</h2>
                    <button onclick="location.reload()">Reiniciar</button>`;
                }
                else if(score < 4 && score >= 2){
                    quiz.innerHTML = `<h2>Eita, você não foi tão bem. Tente estudar um pouco mais, você tirou ${score} de ${quizData.length} questões.</h2>
                    <button onclick= "window.location.href = 'index.html'"> Pagina Principal</button>
                    <br>
                    <button onclick="location.reload()">Reiniciar</button>`;
                }
                else{
                    quiz.innerHTML = `<h2>Que triste você não foi muito bem nesse teste. Tente estudar mais.Você acertou ${score} de ${quizData.length} questões.</h2>
                    <h2>Volte para a tela principal e estude mais, depois retorne e refaça o teste :)</h2>
                    <button onclick= "window.location.href = 'index.html'"> Pagina Principal</button>
                    <br>
                    <button onclick="location.reload()">Reiniciar</button>`;
                }
                
                    
            }
        }
    }
});
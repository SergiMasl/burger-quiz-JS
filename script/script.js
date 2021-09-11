document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    const btnStart = document.querySelector('#btnOpenModal'),
        btnCloseModal = document.querySelector('#closeModal'),
        modal = document.querySelector('#modal-block'),
        questionsTitle = document.querySelector('#question'),
        formAnswers = document.querySelector('#formAnswers'),
        prevBtm = document.querySelector('#prev'),
        nextBtm = document.querySelector('#next'),
        send = document.querySelector('#send');




    const questions = [{
            question: "Which style of burger would you like?",
            answers: [{
                    title: 'Standert',
                    url: './image/burger.png'
                },
                {
                    title: 'Black-Style',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "What meat is the cutlet made from?",
            answers: [{
                    title: 'Chicken',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Beef',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Pork',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Additional ingredients?",
            answers: [{
                    title: 'A tomato',
                    url: './image/tomato.png'
                },
                {
                    title: 'Cucumber',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Salad',
                    url: './image/salad.png'
                },
                {
                    title: 'Onion',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Add sauce?",
            answers: [{
                    title: 'Garlic sauce',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Tomato sauce',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Mustard sauce',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];




    const start = () => {
        modal.classList.add('d-block'); //display: block (bootstrapt - npm install bootstrap)
        playTest();
    };

    const closeModal = () => {
        modal.classList.remove('d-block');
    }

    const playTest = () => {
        const finalAnswers = [];
        let numberQuestion = 0;

        const renderAnswers = (arg) => {
            questions[arg].answers.forEach((answer) => {

                const item = document.createElement('div');
                item.classList.add('answers-item', 'd-flex', 'justify-content-between');
                item.innerHTML =
                    `
                        <input type="${questions[arg].type}" id="${answer.title}" name="answer" class="d-none" value='${answer.title}'>
                        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                            <img class="answerImg" src="${answer.url}" alt="burger">
                            <span>${answer.title}</span>
                        </label>
                    `
                formAnswers.appendChild(item)
            })
        }

        const renderQuestions = (arg) => {
            formAnswers.innerHTML = ''

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionsTitle.textContent = `${questions[arg].question}`;
                renderAnswers(arg);

                nextBtm.classList.remove('d-none');
                prevBtm.classList.remove('d-none');
                send.classList.add('d-none');

            }
            if (numberQuestion === 0) {
                prevBtm.classList.add('d-none');
            }


            if (numberQuestion === questions.length) {
                nextBtm.classList.add('d-none');
                prevBtm.classList.add('d-none');
                send.classList.remove('d-none');
                formAnswers.innerHTML = `
                    <div class='form-group'>
                        <lable for='numberPhone'>Enter yor phone</lable>
                        <input type='phone' class='form-control' id='numberPhone'>
                    </div>
                `
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = "Thank You! We will contact you.";
                setTimeout(() => {
                    modal.classList.remove('d-block')
                }, 5000)
            }

        }

        renderQuestions(numberQuestion);


        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((elem) => elem.checked || elem.id === 'numberPhone')
            inputs.forEach((elem, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = elem.value;
                }
                if (numberQuestion === questions.length) {
                    obj['Phone number'] = elem.value;
                }
            })

            finalAnswers.push(obj)
            console.log(finalAnswers)
        }

        prevBtm.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };
        nextBtm.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };
        send.addEventListener('click', () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion)
            console.log(finalAnswers)
        })
    }

    btnStart.addEventListener('click', start);
    btnCloseModal.addEventListener('click', closeModal);

});
const form = document.querySelector("#form");
const number = form[0];
const difficulty = form[1];
const type = form[2];
const indiv = document.querySelector(".questions_div_class");

let gameStarted = false;

document.querySelector("#button").addEventListener("click", () => {
    if (!gameStarted) {
        var numericValue = parseFloat(number.value);
        if (!isNaN(numericValue)) {
            gameStarted = true;
            const url = `https://opentdb.com/api.php?amount=${number.value}&category=9&difficulty=${difficulty.value}&type=${type.value}`;
            number.value = "";
            form.style.display = "none";
            document.querySelector("#button").style.display = "none";
            fetch(url)
                .then((response) => response.json())
                .then((resp) => {
                    writeQuestions(resp);
                });
        }
        else {
            alert("Give a number Please!");
        }
    }
});
function writeQuestions(resp) {
    const arr = Object.values(resp);
    myArray = arr[1];
    let currentIndex = 0;
    addQuestion(myArray[currentIndex]);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next Question";
    nextButton.id = "Next1";
    document.body.append(nextButton);
    nextButton.addEventListener("click", () => {
        if (currentIndex <= myArray.length) {
            let answers = document.querySelectorAll(".ans");
            const arr = Object.values(answers);
            arr.forEach((index) => {
                if (index.checked) {
                    if (index.value === "correct") {
                        currentIndex++;
                        const del = document.querySelector(".card");
                        del.remove();
                        addQuestion(myArray[currentIndex]);
                        if (currentIndex === myArray.length) {
                            nextButton.remove();
                            endOfGame();
                        }
                    }
                    else if (index.value === "false") {
                        const falseQuestion = document.querySelector(".card");
                        
                        const messageDiv = document.createElement("div");
                        messageDiv.textContent = "Wrong Answer";
                        messageDiv.className = "wrong-answer-message";
                        falseQuestion.append(messageDiv)

                        setTimeout(() => {
                            messageDiv.remove();
                        }, 2000);
                        index.remove();
                    }
                }
            });

        }

    });

}


function addQuestion(element) {
    if (element != null) {
        const div = document.createElement("div");
        div.className = "card";

        const h2 = document.createElement("h2");
        h2.textContent = element.question;
        div.appendChild(h2);

        const optionsDiv = document.createElement("div");
        optionsDiv.id = "options";

        const myArray = [element.correct_answer, ...element.incorrect_answers];
        shuffle(myArray);

        myArray.forEach(answer => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "option";

            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.className = "ans";
            radioButton.name = "answer";
            radioButton.value = answer === element.correct_answer ? "correct" : "false";

            const label = document.createElement("label");
            label.textContent = answer;

            optionDiv.appendChild(radioButton);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });

        div.appendChild(optionsDiv);
        indiv.appendChild(div);
    }


}

function endOfGame() {
    const div = document.createElement("div");
    div.className = "card";

    const h1 = document.createElement("h1");
    h1.textContent = "You've Reached End Of The Game";

    div.append(h1)
    indiv.append(div)

    const NewGameButton = document.createElement("button");
    NewGameButton.textContent = "NewGame    ";
    NewGameButton.id = "NewGame";
    document.body.append(NewGameButton);
    NewGameButton.addEventListener("click", () => {
        div.remove();
        NewGameButton.remove();
        form.style.display = "block";
        document.querySelector("#button").style.display = "block";
        gameStarted = false;
    })


}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

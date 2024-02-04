const form = document.querySelector("#form");
const number = form[0];
const difficulty = form[1];
const type = form[2];
const indiv = document.querySelector(".questions_div_class");

let trueAnswers = 0;
let falseAnswers = 0;

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

        currentIndex++;
        if (currentIndex <= myArray.length) {

            let answers = document.querySelectorAll(".ans");
            const arr = Object.values(answers);
            arr.forEach((index) => {
                if (index.checked) {
                    if (index.value === "correct") {
                        trueAnswers++;
                    }
                    else if (index.value === "false") {
                        falseAnswers++;
                    }
                }
            });

            const del = document.querySelector(".card");
            del.remove();
            addQuestion(myArray[currentIndex]);
            if (currentIndex === myArray.length) {
                nextButton.remove();
                endOfGame();
            }

        }

    });

}

function addQuestion(element) {
    if (element != null) {
        const div = document.createElement("div");
        div.className = "card";

        const h2 = document.createElement("h2");
        h2.textContent = element.question;
        indiv.append(div);
        div.append(h2);
        const myArray = [element.correct_answer, ...element.incorrect_answers]
        shuffle(myArray);
        myArray.forEach((myarray, index) => {
            const answer = document.createElement("input");
            answer.className = "ans";
            answer.type = "radio";
            answer.name = "name";
            if (myarray === element.correct_answer) {
                answer.value = "correct"
            }
            else {
                answer.value = "false";
            }
            const answer_text = document.createElement("a");
            answer_text.textContent = myarray;
            div.append(answer_text);
            div.append(answer);
        })
    }

}

function endOfGame() {
    alert("End of the Quiz");
    alert("Number of True Answers is : " + trueAnswers)
    form.style.display = "block";
    document.querySelector("#button").style.display = "block";

}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}





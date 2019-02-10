/*

PSEUDOCODE:

- PAGE LOADS                                    YES
- HIDE UNNECESARY ELEMENTS                      YES
- GET DROPDOWN VALUE                            TBD
- SET QUESTION AMMT TO DROPDOWN VALUE           TBD
- START WITH BUTTON                             YES
- START TIMER                                   YES, but needs work                   
- SET QUESTION AND ANSWERS                      
- LISTEN TO ANSWER CLICK
- ¿CORRECT ANSWER?
    - YES
        - +1 CORRECT ANSWERS
        - ¿MORE QUESTIONS?
            - YES
                - SET NEW QUESTION
                - SET NEW TIMER
            - NO
                - END GAME
                - CALCULATE SCORE
    - NO
        - +1 INCORRECT ANSWERS
        - ¿MORE QUESTIONS?
            - YES
                - SET NEW QUESTION
                - SET NEW TIMER
            - NO
                - END GAME
                - CALCULATE SCORE




TO DO:

- MAKE 100% MOBILE
- If user hovers after clicking the answer and painting the button, the button is changed, fix it

*/

var correctAnswer;
var triesCounter = 0;
var correctTries = 0;
var incorrectTries = 0;
var intervalID;
var timeOutID;
var seconds = 16000;          //Sets the seconds for each question, in milliseconds, one more than needed for progress bar aesthetics
var currentQuestNum = 0;
var clickCounter;

//Makes sure the document is fully loaded when we get to work
$(document).ready(function() {

    //Catches containers in the DOM and hides the ones we don't need right away
    var secondaryContainer = $("#secondary-container");
    secondaryContainer.show();
    var triviaContainer = $("#trivia-container");
    triviaContainer.hide();
    var endGameContainer = $("#end-game-container");
    endGameContainer.hide();
    var progTimerObj = $("#progTimer");
    var title = $("#title");
    var subtitle = $("#subtitle");
    var hero = $("#hero");

    //Array of objects to hold the questions and answers
    var questionsArr = [
        {
            q:"Which is NOT a reason for why there are multiple programming languages?",  
        
            ans:[
                "Most operating systems were written a long time ago and their old languages would be insanely expensive to fix so we just keep making new ones instead.",
                "Different groups of people came up with their own rulesets for their own specific needs at the same time hence a bunch of different ways to talk to the computer.",
                "There are two schools of thought: the first language is the best vs. new languages need to be created to get with the times.",
                "Because languages are fun, the more the better!"
            ],
        
            cAns:"c"                                                    //Correct answer 1
        },
        {
            q:"Why do we even need CSS? Why not just use HTML?",                          //Question 2 
        
            ans:[
                "You don't need CSS, HTML can do it all.",
                "CSS makes your page load faster.",
                "CSS gives you more control over the page.",
                "CSS is not even a programming language"
            ],
        
            cAns:"c"                                                    //Correct answer 2
        },
        {
            q:"Which four things make up a stack?",                          //Question 3
        
            ans:[
                "An operating system, a server system,  a database, and a back-end language.",
                "One front end language, one back end language, and a database for each.",
                "You only need a back-end language and the rest is up to you.",
                "The 4 different languages you use to make your app."
            ],
        
            cAns:"a"                                                    //Correct answer 3
        },
        {
            q:"Which 'answer' would be correct? for var answer = '1' + ' 1'",                          //Question 4
        
            ans:[
                "2" ,
                "11",
                "112",
                "1 1"
            ],
        
            cAns:"d"                                                    //Correct answer 3
        },
    ]

    //Array of messages to tell the user once they finish the game
    var resultPhraseArr = [
                        "hhhhmmm... Are you sure you actually tried?",
                        "geee... I guess we all have bad days?",
                        "It's ok! Were you nervous?",
                        "Awesome! Keep it up!"
                        ];

    //Once ALL of the DOM is set, start listening for the clicks!
    //Buttons listener
    $(".start-game").click(startGame);
    //Answers listener
    $("#answer-list").click(function(event) {
        if (event.target.id == "answer-list") {
            //do nothing
        } else {
            if (!clickCounter) {
                clickCounter = true;
                var isClickCorrect;
                var answerClick = event.target.attributes.data;
                var timeOutForPaint;
                if (answerClick.nodeValue == correctAnswer) {
                    //Call the function that paints the answer
                    isClickCorrect = true;
                    paintButtons(answerClick, isClickCorrect);
                    //Pausa el timer invisible y visible
                    clearInterval(intervalID);
                    clearTimeout(timeOutID);
                    //Shows correct in the title and eliminates the subtitle
                    title.text("Correct!");
                    subtitle.text(":)");
                    hero.removeClass("is-light");
                    hero.addClass("is-success");
                    //Dale un par de segundos para que vea las respuestas
                    timeOutForPaint = setTimeout(function(){
                        correctTries++;
                        newQuestion(); 
                    }, 3000);
                } else {
                    //Call the function that paints the answer
                    isClickCorrect = false;
                    paintButtons(answerClick, isClickCorrect);
                    //Pausa el timer invisible y visible
                    clearInterval(intervalID);
                    clearTimeout(timeOutID);
                    //Shows correct in the title and eliminates the subtitle
                    title.text("Incorrect!");
                    subtitle.text(":(");
                    hero.removeClass("is-light");
                    hero.addClass("is-danger");
                    //Dale un par de segundos para que vea las respuestas
                    timeOutForPaint = setTimeout(function(){
                        incorrectTries++;
                        newQuestion(); 
                    }, 3000);
                }
            }
        }
    });

    //Function to paint the buttons green or red, depending on the answers
    function paintButtons(pAnswerClick, pIsClickCorrect) {
        var answer1 = $(".answer-one");
        var answer2 = $(".answer-two");
        var answer3 = $(".answer-three");
        var answer4 = $(".answer-four");

        if (pAnswerClick) { //If there's click event
            if (pIsClickCorrect) { //AND click is correct
                //Find which button was, and paint it green
                if (pAnswerClick.nodeValue == "a") {
                    answer1.addClass("is-success");
                } else if (pAnswerClick.nodeValue == "b") {
                    answer2.addClass("is-success");
                } else if (pAnswerClick.nodeValue == "c") {
                    answer3.addClass("is-success");
                } else if (pAnswerClick.nodeValue == "d") {
                    answer4.addClass("is-success");
                }
            } else {
                //Find which button was, and paint it red
                if (pAnswerClick.nodeValue == "a") {
                    answer1.addClass("is-danger");
                } else if (pAnswerClick.nodeValue == "b") {
                    answer2.addClass("is-danger");
                } else if (pAnswerClick.nodeValue == "c") {
                    answer3.addClass("is-danger");
                } else if (pAnswerClick.nodeValue == "d") {
                    answer4.addClass("is-danger");
                }
                //Find the correct button and paint it green
                if (correctAnswer == "a") {
                    answer1.addClass("is-success is-outlined");
                } else if (correctAnswer == "b") {
                    answer2.addClass("is-success is-outlined");
                } else if (correctAnswer == "c") {
                    answer3.addClass("is-success is-outlined");
                } else if (correctAnswer == "d") {
                    answer4.addClass("is-success is-outlined");
                }
            }
        } else { //If there's no click event
            //Find the correct button and paint it green
            if (correctAnswer == "a") {
                answer1.addClass("is-success is-outlined");
            } else if (correctAnswer == "b") {
                answer2.addClass("is-success is-outlined");
            } else if (correctAnswer == "c") {
                answer3.addClass("is-success is-outlined");
            } else if (correctAnswer == "d") {
                answer4.addClass("is-success is-outlined");
            }
        }
    }

    //Button function fired from HTML button
    function startGame() {
        triesCounter = 0;
        correctTries = 0;
        incorrectTries = 0;
        currentQuestNum = 0;
        $("#secondary-container").hide();
        $("#end-game-container").hide();
        $("#trivia-container").show();
        newQuestion();
    }

    //Function to start the timer
    function timer(pTimer) {
        var progTimerValue = 1;
        clearInterval(intervalID);
        intervalID = setInterval(function(){
            progTimerObj[0].attributes.value.nodeValue = progTimerValue;
            progTimerValue++;
            if (progTimerValue <= 5) {
                progTimerObj.removeClass("is-warning");
                progTimerObj.removeClass("is-danger");
                progTimerObj.addClass("is-success");
            } else if (progTimerValue >= 6 && progTimerValue <=10) {
                progTimerObj.removeClass("is-success");
                progTimerObj.addClass("is-warning");
            } else {
                progTimerObj.removeClass("is-warning");
                progTimerObj.addClass("is-danger");
            }
        } , 1000);
    }

    //Sets the new question in the DOM
    //Should also start the timer that is shown, and the timer that counts the time before the new question is automatically shown
    function newQuestion() {
        //Shows correct title and subtitle
        title.text("Programming Knowledge Trivia");
        subtitle.text("So.. how well do you know what you're studying...?!");
        hero.addClass("is-light");
        hero.removeClass("is-danger");
        hero.removeClass("is-success");
        clickCounter = false;
        clearTimeout(timeOutID);
        progTimerObj[0].attributes.value.nodeValue = 0;
        //Check if the user hasn't finished all the questions
        if (questionsLeft()) {
            //catch all the DOM elements
            var qNumber = $("#question-number");
            var question = $("#question");
            var answer1 = $("#answer-one");
            var answer2 = $("#answer-two");
            var answer3 = $("#answer-three");
            var answer4 = $("#answer-four");

            //catch DOM buttons and remove the class if it has it
            var answer1Button = $(".answer-one");
            var answer2Button = $(".answer-two");
            var answer3Button = $(".answer-three");
            var answer4Button = $(".answer-four");
            answer1Button.removeClass("is-danger");
            answer2Button.removeClass("is-danger");
            answer3Button.removeClass("is-danger");
            answer4Button.removeClass("is-danger");
            answer1Button.removeClass("is-success");
            answer2Button.removeClass("is-success");
            answer3Button.removeClass("is-success");
            answer4Button.removeClass("is-success");

            //Get questions and answers from the array                          //SHOULDN'T BE RANDOM, SHOULD BE IN ORDER!!!
            //var currentQuestNum = Math.floor(Math.random() * questionsArr.length, 1);
            var currentQuestion = questionsArr[currentQuestNum].q;
            var currentAnswer1 = questionsArr[currentQuestNum].ans[0];
            var currentAnswer2 = questionsArr[currentQuestNum].ans[1];
            var currentAnswer3 = questionsArr[currentQuestNum].ans[2];
            var currentAnswer4 = questionsArr[currentQuestNum].ans[3];
            var currentCorrAnswer = questionsArr[currentQuestNum].cAns;
            correctAnswer = currentCorrAnswer;

            //Add a new try to the counter
            triesCounter++;
            //Add 1 to the currentQuestNum to make sure it circles through the array
            currentQuestNum++;

            //Set the values in the DOM
            qNumber.text(currentQuestNum);
            question.text(currentQuestion);
            answer1.text(currentAnswer1);
            answer2.text(currentAnswer2);
            answer3.text(currentAnswer3);
            answer4.text(currentAnswer4);

            //Once the DOM is set, call the timers (both the invisible and the visible one)
            //Visible, shows the timer in the screen
            timer(milSecToSec(seconds));
            //Invisible, calls the new question through another function if the user takes too much time
            //It's sent through another function to add to the incorrectTries var
            timeOutID = setTimeout(noAnswer, secToMilSec(seconds));
            
        } else {
            endGame();
        }
    }

    //Check how many questions there are, and make sure we don't try to ask more than there are available
    function questionsLeft() {
        if(questionsArr.length > triesCounter) {
            return true;
        } else {
            return false;
        }
    }

    //Function that's called when the user doesn't answer on time, and we want to call newQuestion but increasing the incorrectTries counter
    function noAnswer() {
        //No dejes que haga clic
        clickCounter = true;
        //Pausa el timer invisible y visible
        clearInterval(intervalID);
        clearTimeout(timeOutID);
        //Shows incorrect in the title and eliminates the subtitle
        title.text("Incorrect!");
        subtitle.text("Sorry, you ran out of time!    :(");
        hero.removeClass("is-light");
        hero.addClass("is-danger");
        //Find the correct button and paint it green
        paintButtons();
        //Dale un par de segundos para que vea las respuestas
        timeOutForPaint = setTimeout(function(){
            incorrectTries++;
            newQuestion(); 
        }, 3000);
    }

    function endGame() {
        clearTimeout(timeOutID);
        clearInterval(intervalID);
        //Sets the values of the correct/incorrect answers
        $("#score-correct").text(correctTries);
        $("#score-incorrect").text(incorrectTries);
        if (incorrectTries == 1) {
            $("#result-phrase").text(resultPhraseArr[3]);
        } else if (incorrectTries == 2) {
            $("#result-phrase").text(resultPhraseArr[2]);
        } else if (incorrectTries == 3) {
            $("#result-phrase").text(resultPhraseArr[1]);
        } else if (incorrectTries == 4) {
            $("#result-phrase").text(resultPhraseArr[0]);
        }
        
        //Modifies the DOM to show the correct containers
        $("#trivia-container").hide();
        $("#end-game-container").show();
    }


    //Functions to convert to and from milliseconds - seconds as needed
    //They check if number is already expressed in millisecond or not
    function secToMilSec(pSeconds) {
        pSeconds = pSeconds.toString();
        if(pSeconds.length>4) {
            parseInt(pSeconds);
            return pSeconds;
        } else {
            pSeconds = pSeconds + "000";
            pSeconds = parseInt(pSeconds);
            return pSeconds;
        }
    }

    function milSecToSec(pMilSec) {
        pMilSec = pMilSec.toString();
        if(pMilSec.length<4) {
            pMilSec = parseInt(pMilSec);
            return pMilSec;
        } else {
            pMilSec = pMilSec.slice(0, pMilSec.length - 3);
            pMilSec = parseInt(pMilSec);
            return pMilSec;
        }
    }

});



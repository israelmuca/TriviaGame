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
- FIX  THE VALIDATION OF THE CORRECT ANSWERS
    POSSIBLY BY USING THE FIRST CHAR OF THE ANSWERS IT'LL WORK
- GET A PROPER UI

*/

var correctAnswer;
var triesCounter = 0;
var correctTries = 0;
var incorrectTries = 0;
var intervalID;
var timeOutID;
var seconds = 10000;          //Sets the seconds for each question, in milliseconds
var currentQuestNum = 0;

//Makes sure the document is fully loaded when we get to work
$(document).ready(function() {

    //Catches containers in the DOM and hides the ones we don't need right away
    var secondaryContainer = $("#secondary-container");
    secondaryContainer.show();
    var triviaContainer = $("#trivia-container");
    triviaContainer.hide();
    var endGameContainer = $("#end-game-container");
    endGameContainer.hide();

    //Array of objects to hold the questions and answers
    var questionsArr = [
        {
            q:"Which is NOT a reason for why there are multiple programming languages?",  
        
            ans:[
                "A - Most operating systems were written a long time ago and their old languages would be insanely expensive to fix so we just keep making new ones instead.",
                "B - Different groups of people came up with their own rulesets for their own specific needs at the same time hence a bunch of different ways to talk to the computer.",
                "C - There are two schools of thought: the first language is the best vs. new languages need to be created to get with the times.",
                "D - Because languages are fun, the more the better!"
            ],
        
            cAns:"c"                                                    //Correct answer 1
        },
        {
            q:"Why do we even need CSS? Why not just use HTML?",                          //Question 2 
        
            ans:[
                "A - You don't need CSS, HTML can do it all.",
                "B - CSS makes your page load faster.",
                "C - CSS gives you more control over the page.",
                "D - CSS is not even a programming language"
            ],
        
            cAns:"c"                                                    //Correct answer 2
        },
        {
            q:"Which four things make up a stack?",                          //Question 3
        
            ans:[
                "A - An operating system, a server system,  a database, and a back-end language.",
                "B - One front end language, one back end language, and a database for each.",
                "C - You only need a back-end language and the rest is up to you.",
                "D - The 4 different languages you use to make your app."
            ],
        
            cAns:"a"                                                    //Correct answer 3
        },
        {
            q:"Which 'answer' would be correct? for var answer = '1' + ' 1'",                          //Question 4
        
            ans:[
                "A - 2" ,
                "B - 11",
                "C - 112",
                "D - 1 1"
            ],
        
            cAns:"d"                                                    //Correct answer 3
        },
    ]

    //Once ALL of the DOM is set, start listening for the clicks!
    //Buttons listener
    $(".start-game").click(startGame);
    //Answers listener
    $("#trivia-container").click(function(event) {
        var answerClick = event.target.attributes.data;
        if (answerClick.nodeValue == correctAnswer) {
            alert("Correct!");
            correctTries++;
            newQuestion();
        } else {
            alert("Incorrect!");
            incorrectTries++;
            newQuestion();
        }
    });

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
        clearInterval(intervalID);
        intervalID = setInterval(function(){
            $("#timer").text(pTimer);
            pTimer--;
        } , 1000);
    }

    //Sets the new question in the DOM
    //Should also start the timer that is shown, and the timer that counts the time before the new question is automatically shown
    function newQuestion() {
        clearTimeout(timeOutID);
        //Check if the user hasn't finished all the questions
        if(questionsLeft()){
            //catch all the DOM elements
            var question = $("#question");
            var answer1 = $("#answer-one");
            var answer2 = $("#answer-two");
            var answer3 = $("#answer-three");
            var answer4 = $("#answer-four");

            //Get questions and answers from the array                          //SHOULDN'T BE RANDOM, SHOULD BE IN ORDER!!!
            //var currentQuestNum = Math.floor(Math.random() * questionsArr.length, 1);
            var currentQuestion = questionsArr[currentQuestNum].q;
            var currentAnswer1 = questionsArr[currentQuestNum].ans[0];
            var currentAnswer2 = questionsArr[currentQuestNum].ans[1];
            var currentAnswer3 = questionsArr[currentQuestNum].ans[2];
            var currentAnswer4 = questionsArr[currentQuestNum].ans[3];
            var currentCorrAnswer = questionsArr[currentQuestNum].cAns;
            correctAnswer = currentCorrAnswer;

            //Set the values in the DOM
            question.text(currentQuestion);
            answer1.text(currentAnswer1);
            answer2.text(currentAnswer2);
            answer3.text(currentAnswer3);
            answer4.text(currentAnswer4);

            //Add a new try to the counter
            triesCounter++;
            //Add 1 to the currentQuestNum to make sure it circles through the array
            currentQuestNum++;

            //Once the DOM is set, call the timers (both the invisible and the visible one)
            //Invisible, calls the new question through another function if the user takes too much time
            //It's sent through another function to add to the incorrectTries var
            timeOutID = setTimeout(noAnswer, secToMilSec(seconds));
            //Visible, shows the timer in the screen
            timer(milSecToSec(seconds));
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
        incorrectTries++;
        alert("Sorry, you ran out of time!");
        newQuestion();
    }

    function endGame() {
        clearTimeout(timeOutID);
        clearInterval(intervalID);
        //Sets the values of the correct/incorrect answers
        $("#score-correct").text(correctTries);
        $("#score-incorrect").text(incorrectTries);
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



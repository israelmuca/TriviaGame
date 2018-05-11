/*

PSEUDOCODE:

- PAGE LOADS                                    YES
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

*/

//Makes sure the document is fully loaded!
$(document).ready(function() {

    //Global variables
    var questionTimer;          //Maybe local scope?
    var questionsToUse;
    var currentQuestion;        //Maybe local scope?
    var correctAnswer;          //Maybe local scope?
    var userAnswer;             //Maybe local scope?
    var triesCounter = 0;
    var correctTries;
    var incorrectTries;
    var seconds = 10000;          //Sets the seconds for each question, in milliseconds

    //Array of objects to hold the questions and answers
    var questionsArr = [
        {
            q:"Test question 1 with answer a",                         //Question 1
        
            ans:["a","b","c","d"],         //Answers to show 1
        
            cAns:"a"
        },                       //Correct answer 1
        {
            q:"Test question 2 with answer b",                         //Question 2 
        
            ans:["a","b","c","d"],         //Answers to show 2 
        
            cAns:"b"
        },                       //Correct answer 2
        {
            q:"Test question 3 with answer c",                         //Question 3
        
            ans:["a","b","c","d"],         //Answers to show 3
        
            cAns:"c"
        },                       //Correct answer 3
    ]

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

    function timer(pTimer) {
        intTimer = pTimer;
        //Code to show a timer in the screen            -- NOT WORKING YET
        // var timerDisplay = $("#timer");
        // setInterval(function() {
        //     do {
        //         timerDisplay.text(timer);
        //         timer - 1;
        //     }
        //     while (timer>0);
        // } , 1000);

        //Code to call the new question once the timer runs out
        setTimeout(newQuestion(), secToMilSec(intTimer));
    }

    //Button function fired from HTML button
    function startGame() {
        $("#secondary-container").hide();
        $("#trivia-container").show();
        newQuestion();
    }

    //Sets the new question in the DOM
    function newQuestion() {
        //Check if the user hasn't finished all the questions
        if(questionsLeft()){
            //catch all the DOM elements
            var question = $("#question");
            var answer1 = $("#answer-one");
            var answer2 = $("#answer-two");
            var answer3 = $("#answer-three");
            var answer4 = $("#answer-four");

            //Get random question and answers from the array
            var currentQuestNum = Math.floor(Math.random() * questionsArr.length, 1);
            var currentQuestion = questionsArr[currentQuestNum].q;
            var currentAnswer1 = questionsArr[currentQuestNum].ans[0];
            var currentAnswer2 = questionsArr[currentQuestNum].ans[1];
            var currentAnswer3 = questionsArr[currentQuestNum].ans[2];
            var currentAnswer4 = questionsArr[currentQuestNum].ans[3];
            var currentCorrAnswer = questionsArr[currentQuestNum].cAns;


            //Set the values in the DOM
            question.text(currentQuestion);
            answer1.text(currentAnswer1);
            answer2.text(currentAnswer2);
            answer3.text(currentAnswer3);
            answer4.text(currentAnswer4);

            //Once the DOM is set, call the timer
            //timer(seconds);                                               -- NOT WORKING
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

    function endGame() {
        $("#trivia-container").hide();
        $("#end-game-container").show();
        //Should send the values of correct or incorrect answers
    }


    //Once ALL of the DOM is set, start listening for the clicks!
    //Button listeners
    $(".start-game").click(startGame);
    //Answers listener
    $("#trivia-container").click(function(event) {
        var answerClick = event.currentTarget.data;


    });

});
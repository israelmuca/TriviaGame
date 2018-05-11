/*

PSEUDOCODE:

- PAGE LOADS
- GET DROPDOWN VALUE                            TBD
- SET QUESTION AMMT TO DROPDOWN VALUE           TBD
- START WITH BUTTON
- START TIMER
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
var correctTries;
var incorrectTries;

//Array of objects to hold the questions and answers
var questions = [
    {q1:"Test question 1 with answer a",                         //Question 1
    ans1:["a","b","c","d"],         //Answers to show 1
    cAns1:"a"},                       //Correct answer 1
    {q2:"Test question 2 with answer b",                         //Question 2 
    ans2:["a","b","c","d"],         //Answers to show 2 
    cAns2:"b"},                       //Correct answer 2
    {q3:"Test question 3 with answer c",                         //Question 3
    ans3:["a","b","c","d"],         //Answers to show 3
    cAns3:"c"},                       //Correct answer 3
]

//Button function fired from HTML button
function startGame() {

}

//Sets the new question in the DOM
function newQuestion() {

}

function newTimer() {  //Maybe needed?

}


});
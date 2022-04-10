      //canvas.style = "position:absolute; left: 50%; width: 400px; margin-left: -200px;";
      const TIME_LIMIT = 5;
      const FULL_DASH_ARRAY = 283

      // Initially, no time has passed, but this will count up
      // and subtract from the TIME_LIMIT
      let timePassed = 0;
      let timeLeft = TIME_LIMIT;

      const WARNING_THRESHOLD = 3;
      // Alert occurs at 5s
      const ALERT_THRESHOLD = 1;

      const COLOR_CODES = {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: WARNING_THRESHOLD
        },
        alert: {
          color: "red",
          threshold: ALERT_THRESHOLD
        }
      };

      const SCORE_CODE = new Map();
      SCORE_CODE.set('easy', 1);
      SCORE_CODE.set('medium', 2);
      SCORE_CODE.set('hard', 3);

			document.body.style.backgroundColor = "#cbd4cd";
      let remainingPathColor = COLOR_CODES.info.color;
      /* console.log("remainingPathColor: " + remainingPathColor); */
      let timerInterval = null;
      document.getElementById("timer").innerHTML = `
<div class="base-timer">
<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g class="base-timer__circle">
<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
<path
id="base-timer-path-remaining"
stroke-dasharray="283"
class="base-timer__path-remaining ${remainingPathColor}"
d="
M 50, 50
m -45, 0
a 45,45 0 1,0 90,0
a 45,45 0 1,0 -90,0
"
></path>
      </g>
      </svg>
<span id="base-timer-label" class="base-timer__label">${formatTimeLeft(timeLeft)}</span>
      </div>
`;

/*       console.log(formatTimeLeft(timeLeft));
      console.log(remainingPathColor); */

      function formatTimeLeft(time) {
        // The largest round integer less than or equal to the result of time divided being by 60.
        const minutes = Math.floor(time / 60);

        // Seconds are the remainder of the time divided by 60 (modulus operator)
        let seconds = time % 60;

        // If the value of seconds is less than 10, then display seconds with a leading zero
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }

        // The output in MM:SS format
        return `${minutes}:${seconds}`;
      }


      function startTimer() {
      console.log("in startTimer");
        setRemainingPathColor(timeLeft) /* console.log("in startTimer") */ ;
        timePassed = 0;
        
        timeLeft = TIME_LIMIT - timePassed;
        if (flagRun == 1) {
          timerInterval = setInterval(() => {
            if (timeLeft > 0) {
              // The amount of time passed increments by one
              timePassed = timePassed += 1;
              timeLeft = TIME_LIMIT - timePassed;
              /* console.log("timePassed"+timePassed+", timeLeft: "+timeLeft) */
              ;
              // The time left label is updated
              document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft);
              setCircleDasharray();
              setRemainingPathColor(timeLeft);
            } else { // time ended
              clearInterval(timerInterval);
              move();
              next = data.results.pop();
              console.log("startTimer: poping new q");
              console.log(data.results.length);
              console.log(questionsCounter);
              if (next == null) {
              flagRun=0;
                summerizeGame();
              } else {
                runProg(data, next);
              }
            }
          }, 1000);
        }
      }

      /* 
      console.log(timerInterval);
      console.log("timePass ed:"+timePassed); */
      /* function myStopFunction() {
        clearInterval(myInterval);
      } */


      function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
      }


      // Update the dasharray value as time passes, starting with 283
      function setCircleDasharray() {
        const circleDasharray = `${(
          calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        console.log("in setCircleDasharray()"+circleDasharray);
        document
          .getElementById("base-timer-path-remaining")
          .setAttribute("stroke-dasharray", circleDasharray);
      }

      function setRemainingPathColor(timeLeft) {
        const {
          alert,
          warning,
          info
        } = COLOR_CODES;
        // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
        if (timeLeft <= alert.threshold) {
          document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
          document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);

          // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
        } else if (timeLeft <= warning.threshold) {
          document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
          document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
        } else {
          document
            .getElementById("base-timer-path-remaining")
            .classList.remove(alert.color);
          document
            .getElementById("base-timer-path-remaining")
            .classList.add(info.color);
        }
      }


      //document.getElementById("app").innerHTML = `...`
      /* startTimer(); */

      //////////////////////////////////////////////
// landing page
      var x = document.getElementById("ans1");
      var flagStart = 0
      if (flagStart == 0) {
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("ans4").style.display = "none";
        document.getElementById("correctAnswersCounter").style.display = "none";
        document.getElementById("startAgain").style.display = "none";
      }


      /*  async function sleep(ms) {
         return new Promise(resolve => setTimeout(resolve, ms));
       } */

      const api_url = 'https://opentdb.com/api.php?amount=100'
      var next = 0
      var data = 0
      var flagFirst;
      var corAns = "none"
      var score = 0;
      var flagRun = 0;
      var difficulty;
      var questionsCounter=0
      var numOfQuestions;
      var progressWidth=1;
      var correctAnswersCounter=0;
      var levelChosen;
      
      
  /*    let a1 = document.getElementById("easy");
      b1.addEventListener("click", function(e) {
      console.log("Easy was chosen!");
      document.getElementByName("level").style.display = "none";
      } ) */

      
      
      
      async function startGame() {
        next = 0
        data = 0
        corAns = "none"
        score = 0;
        flagRun = 0;
        questionsCounter=0
        numOfQusWidth=1;
        progresswersCounter=0;
        data = await getData();
        console.log("in startGame");
        levelChosen=document.querySelector('input[name="level"]:checked').value;
      
      document.getElementById("radioButtonContainer").style.display = 'none'
        document.getElementById("Start Game").style.display = "none";
                document.getElementById("difficultyLevel").style.display = "none";
/*         document.getElementById("question").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("ans4").style.display = "none"; */
        document.getElementById("correctAnswersCounter").style.display = "none";
        /*document.getElementById("ans1").style.display = "inline-flex";
         document.getElementById("ans2").style.display = "inline-flex";
         document.getElementById("ans3").style.display = "inline-flex";
         document.getElementById("ans4").style.display = "inline-flex";  */
         //data.results=data.results.slice(0,5); // temo!!!!!!!!!!!!!!!!
         
         // filter by chosen diffuculty:
         if (levelChosen=='easy'){
         filtQuestions = x => x['difficulty'] ==='easy';
         data.results = data.results.filter(filtQuestions);correctAnswersCounter
         } else if (levelChosen=='medium'){
         filtQuestions = x => x['difficulty'] ==='medium';
         data.results = data.results.filter(filtQuestions);
         } else if (levelChosen=='hard'){
         filtQuestions = x => x['difficulty'] ==='hard';
         data.results = data.results.filter(filtQuestions);
         }
         
				
         numOfQuestions=data.results.length;
         console.log("len:"+data.results.length);
        next = data.results.pop();
        console.log("startGame: poping new q");
        console.log("len:"+ data.results.length);
        console.log(questionsCounter);
        if (next == null) {
        flagRun=0;
          summerizeGame();
        }
        else {
        flagStart = 1;
        flagFirst = 0;
        await runProg(data, next);
        }
      }

      async function getData() {
        const response = await fetch(api_url);
        let data = await response.json();
        flagStart = 1;
        console.log("downloaded data");
        return data;
      }

      async function runProg(data, next) {
        let correct = presentQ(next);        
        console.log("in runProg");
        //console.log("next:", next);
        difficulty = next['difficulty'];
        corAns = await correct.then(result => result);
        /* console.log("corAns: " + corAns + "!!!") */;
      }
			// progress bar
      function move() {
        var elem = document.getElementById("myBar");
        progressWidth=progressWidth+(100/numOfQuestions);
        elem.style.width = progressWidth + "%";
      }
     
      async function summerizeGame() {
        console.log("in summerizeGame");
        clearInterval(timerInterval);
        document.getElementById("timer").style.display = "none";
        document.getElementById("difficultyLevel").style.display = "none";
        document.getElementById("question").style.display = "none";
        document.getElementById("ans1").style.display = "none";
        document.getElementById("ans2").style.display = "none";
        document.getElementById("ans3").style.display = "none";
        document.getElementById("ans4").style.display = "none";
        document.getElementById("reply").innerHTML = "End Game!!!"
        flagStart=0;
        setInterval(function() {
          document.getElementById("reply").style.visibility  = (document.getElementById("reply").style.visibility  == 'hidden' ? '' : 'hidden');
        }, 500);
        if (levelChosen=='hard') {
        score+=5;
        }
        let text = "Your Final Score: " + score;
        if (levelChosen=='hard') {
        text=text+ (". You recieved 5 points bonus for your braveness!")
        }
        document.getElementById("score").innerHTML = text.bold();
        document.getElementById("score").fontSize = "40px"
        document.getElementById("score").style.color = "magenta";
        document.getElementById("correctAnswersCounter").style.display = "block";
       document.getElementById("correctAnswersCounter").innerHTML="You answered "+correctAnswersCounter+" out of "+numOfQuestions+" questions correctly."
        //document.getElementById("startAgain").style.display = "block";
      }
      
      async function startAgain(){
      document.getElementById("radioButtonContainer").style.display = "block";
      document.getElementById("correctAnswersCounter").style.display = "none";
      document.getElementById("reply").style.display = "none";
      var elem = document.getElementById("myBar");
        progressWidth=1;
        elem.style.width = progressWidth + "%";
      }

      let b1 = document.getElementById("ans1");
      b1.addEventListener("click", function(e) {
        let chosen = document.getElementById("ans1").innerHTML;
      /*   console.log("correct: " + corAns);
        console.log("chosen1: " + chosen); */
        flagRun = 0;
        clearInterval(timerInterval);
        move();
        if (chosen == corAns) {
          //document.getElementById("reply").innerHTML = "Correct answer!!";
          document.getElementById("ans1").style.background = "green";
          score = score + SCORE_CODE.get(difficulty);
          correctAnswersCounter++;
        } else {
          //document.getElementById("reply").innerHTML = "Wrong answer!!";
          document.getElementById("ans1").style.background = "red";
          if (document.getElementById("ans2").innerHTML == corAns) {
            document.getElementById("ans2").style.background = "green";
          }
          if (document.getElementById("ans3").innerHTML == corAns) {
            document.getElementById("ans3").style.background = "green";
          }
          if (document.getElementById("ans4").innerHTML == corAns) {
            document.getElementById("ans4").style.background = "green";
          }
        }
        document.getElementById("score").innerHTML = "Your Current Score: <strong>" + score+"</strong>";
        next = data.results.pop();
        console.log("b1: poping new q");
              console.log("len:"+ data.results.length);
              console.log(questionsCounter);
        
        if (next == null ) {
        console.log("b1");
        flagRun=0;
         summerizeGame();
        }
        else{
        runProg(data, next); }
      })
      let b2 = document.getElementById("ans2");
      b2.addEventListener("click", function(e) {
        let chosen = document.getElementById("ans2").innerHTML;
        /* console.log("correct: " + corAns) */;
        flagRun = 0;
        clearInterval(timerInterval);
        move();
        /* console.log("chosen2: " + chosen) */;
        if (chosen == corAns) {
          //document.getElementById("reply").innerHTML = "Correct answer!!";
          document.getElementById("ans2").style.background = "green";
          score = score + SCORE_CODE.get(difficulty);
          correctAnswersCounter++;
        } else {
          //document.getElementById("reply").innerHTML = "Wrong answer!!";
          document.getElementById("ans2").style.background = "red";

          if (document.getElementById("ans1").innerHTML == corAns) {
            document.getElementById("ans1").style.background = "green";
          }
          if (document.getElementById("ans3").innerHTML == corAns) {
            document.getElementById("ans3").style.background = "green";
          }
          if (document.getElementById("ans4").innerHTML == corAns) {
            document.getElementById("ans4").style.background = "green";
          }
        }
        document.getElementById("score").innerHTML = "Your Current Score: <strong>" + score+"</strong>";
        next = data.results.pop();
        console.log("b2: poping new q");
              console.log("len:"+ data.results.length);
              console.log(questionsCounter);
        if (next == null) {
        flagRun=0;
          summerizeGame();
        } else {
        runProg(data, next);
        }
      })
      let b3 = document.getElementById("ans3");
      b3.addEventListener("click", function(e) {
        let chosen = document.getElementById("ans3").innerHTML;
        /* console.log("correct: " + corAns) */;
        /* console.log("chosen3: " + chosen) */;
        flagRun = 0;
        clearInterval(timerInterval);
        move();
        if (chosen == corAns) {
          //document.getElementById("reply").innerHTML = "Correct answer!!";
          document.getElementById("ans3").style.background = "green";
          score = score + SCORE_CODE.get(difficulty);
          correctAnswersCounter++;
        } else {
          //document.getElementById("reply").innerHTML = "Wrong answer!!";
          document.getElementById("ans3").style.background = "red";
          if (document.getElementById("ans1").innerHTML == corAns) {
            document.getElementById("ans1").style.background = "green";
          }
          if (document.getElementById("ans2").innerHTML == corAns) {
            document.getElementById("ans2").style.background = "green";
          }
          if (document.getElementById("ans4").innerHTML == corAns) {
            document.getElementById("ans4").style.background = "green";
          }
        }
        document.getElementById("score").innerHTML = "Your Current Score: <strong>" + score+"</strong>";
        next = data.results.pop();
        console.log("b3: poping new q");
              console.log("len:"+ data.results.length);
              console.log(questionsCounter);
        if (next == null) {
        flagRun=0;
          summerizeGame();
        } else {
        runProg(data, next);
        }
      })
      let b4 = document.getElementById("ans4");
      b4.addEventListener("click", function(e) {
        let chosen = document.getElementById("ans4").innerHTML;
        /* console.log("correct: " + corAns) */;
        /* console.log("chosen4: " + chosen) */;
        flagRun = 0;
        clearInterval(timerInterval);
        move();
        if (chosen == corAns) {
          //document.getElementById("reply").innerHTML = "Correct answer!!";
          document.getElementById("ans4").style.background = "green";
          score = score + SCORE_CODE.get(difficulty);
          correctAnswersCounter++;
        } else {
          //document.getElementById("reply").innerHTML = "Wrong answer!!";
          document.getElementById("ans4").style.background = "red";
          if (document.getElementById("ans1").innerHTML == corAns) {
            document.getElementById("ans1").style.background = "green";
          }
          if (document.getElementById("ans2").innerHTML == corAns) {
            document.getElementById("ans2").style.background = "green";
          }
          if (document.getElementById("ans3").innerHTML == corAns) {
            document.getElementById("ans3").style.background = "green";
          }
        }
        document.getElementById("score").innerHTML = "Your Current Score: <strong>" + score+"</strong>";
        next = data.results.pop();
        console.log("b4: poping new q");
              console.log("len:"+ data.results.length);
              console.log(questionsCounter);
        
        if (next == null) {
        flagRun=0;
          summerizeGame();
        } else {
        runProg(data, next);
        }
      })

      async function presentQ(next) {
        /*         console.log("aaaaaaa!");
            const response = await fetch(api_url);
            console.log("cccccccccccc!");
            const data = await response.json(); 
            console.log(data.results.length) */
        //      var i=0;
        //       while (data.results.length>0) {
        //       console.log("now:");
        //      console.log(i);
        //			let question=data.results[i]['question'];
        //      let correct=data.results[i]['correct_answer'];
        //      let answers=data.results[i]['incorrect_answers'];
        //while (1){
        if (flagFirst == 1) {
          await new Promise(r => setTimeout(r, 1500));
        } else {
          flagFirst = 1;
        }
        flagRun = 1;
        console.log('in; presentQ');
        startTimer();
        
        questionsCounter++;
        let question = next['question'];
        console.log("question: "+next['question']);
        let correct = next['correct_answer'];
        let answers = next['incorrect_answers'];
        answers.push(correct); // now 'answers' includes all answers
        answers.sort(() => Math.random() - 0.5)
        document.getElementById("question").innerHTML = question;
        document.getElementById("difficultyLevel").style.display='block';
        if (next["difficulty"]=='easy'){
        console.log("easy");
        document.getElementById("difficultyLevel").src = "https://i.ibb.co/88ZT28G/easy.jpg";
        } else if (next["difficulty"]=='medium'){
        console.log("medium");
        document.getElementById("difficultyLevel").src = "https://i.ibb.co/qpdcMxZ/medium.jpg";
        } else {
        console.log("hard");
        document.getElementById("difficultyLevel").src = "https://i.ibb.co/r38p0CQ/hard.jpg";
        }
        console.log("vered");
        document.getElementById("question").style.display = "block";
        document.getElementById("ans1").style.display = "inline-flex";
        document.getElementById("ans2").style.display = "inline-flex";
        document.getElementById("ans1").innerHTML = answers[0];
        document.getElementById("ans2").innerHTML = answers[1];
        if (answers.length > 2) {
          document.getElementById("ans3").style.display = "inline-flex";
          document.getElementById("ans4").style.display = "inline-flex";
          document.getElementById("ans3").innerHTML = answers[2];
          document.getElementById("ans4").innerHTML = answers[3];
        } else {
          document.getElementById("ans3").style.display = "none";
          document.getElementById("ans4").style.display = "none";
        }
        document.getElementById("ans1").style.background = "none";
        document.getElementById("ans2").style.background = "none";
        document.getElementById("ans3").style.background = "none";
        document.getElementById("ans4").style.background = "none";
        document.getElementById("reply").innerHTML = "";
        /* console.log("correct in presentQ:" + correct) */
        return correct;
      }

      /*  let b1= document.getElementById("ans1");
              b1.addEventListener("click",function(e) {
                let chosen=document.getElementById("ans1").innerHTML;
                if (chosen==correct){
                  document.getElementById("reply").innerHTML = "Correct answer!!";
                } else {
                  document.getElementById("reply").innerHTML = "Wrong answer!!";
                }
                next=data.results.pop();
                getISS();
              })
              let b2= document.getElementById("ans2");
              b2.addEventListener("click",function(e) {
                let chosen=document.getElementById("ans2").innerHTML;
                if (chosen==correct){
                  document.getElementById("reply").innerHTML = "Correct answer!!";
                } else {
                  document.getElementById("reply").innerHTML = "Wrong answer!!";
                }
              })
              let b3= document.getElementById("ans3");
              b3.addEventListener("click",function(e) {
                const chosen=document.getElementById("ans3").innerHTML;
                if (chosen==correct){
                  document.getElementById("reply").innerHTML = "Correct answer!!";
                } else {
                  document.getElementById("reply").innerHTML = "Wrong answer!!";
                }
              //  i++;
              })
              let b4= document.getElementById("ans4");
              b4.addEventListener("click",function(e) {
                const chosen=document.getElementById("ans4").innerHTML;
                if (chosen==correct){
                  document.getElementById("reply").innerHTML = "Correct answer!!";
                } else {
                  document.getElementById("reply").innerHTML = "Wrong answer!!";
                }
              //  i++;
              })
              console.log("hi");
              console.log(data.results.length);
               */
      // }


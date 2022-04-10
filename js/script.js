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
	setRemainingPathColor(timeLeft);
	timePassed = 0;
	
	timeLeft = TIME_LIMIT - timePassed;
	if (flagRun == 1) {
	  timerInterval = setInterval(() => {
		if (timeLeft > 0) {
		  // The amount of time passed increments by one
		  timePassed = timePassed += 1;
		  timeLeft = TIME_LIMIT - timePassed;
		  ;
		  // The time left label is updated
		  document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft);
		  setCircleDasharray();
		  setRemainingPathColor(timeLeft);
		} else { // time ended
		  clearInterval(timerInterval);
		  move();
		  next = data.results.pop();
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



  function calculateTimeFraction() {
	const rawTimeFraction = timeLeft / TIME_LIMIT;
	return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }


  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
	const circleDasharray = `${(
	  calculateTimeFraction() * FULL_DASH_ARRAY
	).toFixed(0)} 283`;
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
	levelChosen=document.querySelector('input[name="level"]:checked').value;
  
  document.getElementById("radioButtonContainer").style.display = 'none'
	document.getElementById("Start Game").style.display = "none";
	document.getElementById("difficultyLevel").style.display = "none";
	document.getElementById("correctAnswersCounter").style.display = "none";
	 
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
	next = data.results.pop();
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
	return data;
  }

  async function runProg(data, next) {
	let correct = presentQ(next);     
	difficulty = next['difficulty'];
	corAns = await correct.then(result => result);
  }
		// progress bar
  function move() {
	var elem = document.getElementById("myBar");
	progressWidth=progressWidth+(100/numOfQuestions);
	elem.style.width = progressWidth + "%";
  }
 
  async function summerizeGame() {
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
	flagRun = 0;
	clearInterval(timerInterval);
	move();
	if (chosen == corAns) {
	  document.getElementById("ans1").style.background = "green";
	  score = score + SCORE_CODE.get(difficulty);
	  correctAnswersCounter++;
	} else {
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
	
	if (next == null ) {
	flagRun=0;
	 summerizeGame();
	}
	else{
	runProg(data, next); }
  })
  let b2 = document.getElementById("ans2");
  b2.addEventListener("click", function(e) {
	let chosen = document.getElementById("ans2").innerHTML;
	flagRun = 0;
	clearInterval(timerInterval);
	move();
	if (chosen == corAns) {
	  document.getElementById("ans2").style.background = "green";
	  score = score + SCORE_CODE.get(difficulty);
	  correctAnswersCounter++;
	} else {
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
	flagRun = 0;
	clearInterval(timerInterval);
	move();
	if (chosen == corAns) {
	  document.getElementById("ans3").style.background = "green";
	  score = score + SCORE_CODE.get(difficulty);
	  correctAnswersCounter++;
	} else {
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
	flagRun = 0;
	clearInterval(timerInterval);
	move();
	if (chosen == corAns) {
	  document.getElementById("ans4").style.background = "green";
	  score = score + SCORE_CODE.get(difficulty);
	  correctAnswersCounter++;
	} else {
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
	
	if (next == null) {
	flagRun=0;
	  summerizeGame();
	} else {
	runProg(data, next);
	}
  })

  async function presentQ(next) {
	if (flagFirst == 1) {
	  await new Promise(r => setTimeout(r, 1500));
	} else {
	  flagFirst = 1;
	}
	flagRun = 1;
	startTimer();
	
	questionsCounter++;
	let question = next['question'];
	let correct = next['correct_answer'];
	let answers = next['incorrect_answers'];
	answers.push(correct); // now 'answers' includes all answers
	answers.sort(() => Math.random() - 0.5)
	document.getElementById("question").innerHTML = question;
	document.getElementById("difficultyLevel").style.display='block';
	if (next["difficulty"]=='easy'){
	document.getElementById("difficultyLevel").src = "https://i.ibb.co/88ZT28G/easy.jpg";
	} else if (next["difficulty"]=='medium'){
	document.getElementById("difficultyLevel").src = "https://i.ibb.co/qpdcMxZ/medium.jpg";
	} else {
	document.getElementById("difficultyLevel").src = "https://i.ibb.co/r38p0CQ/hard.jpg";
	}
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
	return correct;
  }

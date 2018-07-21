$(document).ready(function() {
	var qArray;
	var correct;
	var incorrect; 
	var unanswered; 
	var currentIndex;
	var timeIsUp;
	var audio = new Audio("assets/audio/Tetsugaku - The Legend Of Zelda Ocarina Of Time - Gerudo Valley.mp3");
	
	var questionTimer = {
		time: 15,

		reset: function () {
			questionTimer.time = 15;
    	},
   		start: function(){
   			$('#time').html("Time Remaining: " + questionTimer.time).css("color", "red");;
        	counter = setInterval(questionTimer.count, 1000);
    	},
    	stop: function(){
        	clearInterval(counter);
    	},
    	count: function(){
   	        questionTimer.time--;
	        $('#time').html("Time Remaining: " + questionTimer.time);

	        if(questionTimer.time < 6) {	//At 5 text will start flashing
	        	if(questionTimer.time % 2 == 0) {
	        		$('#time').css("color", "yellow");
	        	} else {
	        		$('#time').css("color", "#90ddff");	//lt blue
	        	}
	        }
    	},
	}

	function varSet() {
		qArray = [{
			question: "Who is the main character of the Legend of Zelda series?",
            answers: ["Biggoron", "Link", "Majora", "Princess Zelda"], 
            imgRight: './assets/images/dancinglink.gif',
            imgWrong: './assets/images/what-link.gif', 
            backgrd:'./assets/images/zelda-startpage.jpg',
            correctAnswer:1
		}, {
			question: "What village is Link from?",
            answers: ["Kokiri Forest", "Gerudo Valley", "Death Mountain", "Hyrule"], 
            imgRight: './assets/images/dancinglink.gif', 
            imgWrong: './assets/images/falling.gif', 
            backgrd:'./assets/images/bck2.jpg',
            correctAnswer:3
		}, {
            question: "How many Legend of Zelda games are there?",
            answers: [8, 4, 11, 19], 
            imgRight: './assets/images/dancinglink.gif', 
            imgWrong: './assets/images/cantbelieve.gif', 
            backgrd:'./assets/images/bck3.jpg',
            correctAnswer:3
		}, {
			question: "When did the first game in the series came out?",
            answers: ["February 21, 1986", "July 16, 1969", "November 4, 2008", "November 29, 1972"], 
            imgRight: './assets/images/dancinglink.gif', 
            imgWrong: './assets/images/dying.gif',
            backgrd:'./assets/images/bck4.jpg', 
            correctAnswer: 0
		}, {
			question: "Who is the main villain in the Legend of Zelda series?",
            answers: ["Ghirahim", "Kriemhild", "Shadarastra", "Ganondorf"], 
            imgRight: './assets/images/dancinglink.gif', 
            imgWrong: './assets/images/tenor.gif',
            backgrd:'./assets/images/bck5.jpg', 
            correctAnswer: 3
		}]

		correct = 0;
		incorrect = 0;
		unanswered = 0;

		currentIndex = -1;	//Starts at -1 because advance automatically increases it by 1 so it will start at 0

		$('#question').html("<button class='btn' id='start'>Start</button>");
		// $('.main-container').css("background-color", "rgba(0, 0, 0, 0)");
		$('#answer0, #answer1, #answer2, #answer3').hide().off('click');

		$('#start').on("click", function() {
			advance();
			audio.play();
		
		});
	}

	function askQuestions() {
		questionTimer.start();
		$('.main-container').css("background-color", "rgba(0, 0, 0, .3)");
		$('#question').html(qArray[currentIndex].question);
		$('#answer0').show().html(qArray[currentIndex].answers[0]);
		$('#answer1').show().html(qArray[currentIndex].answers[1]);
		$('#answer2').show().html(qArray[currentIndex].answers[2]);
		$('#answer3').show().html(qArray[currentIndex].answers[3]);
		$('#imgresponse').hide().off('click');
		$('body').css("background-image", "url(" + qArray[currentIndex].backgrd + ")");
		
		
		// $('body').css("background-image", "url('" + qaArra[currentIndex].backgrd + "')").animate({opacity: 1},1000);
		onClickAnswer();
		audio.play();
		
	}

	function onClickAnswer() {
		$('.btn').on("click", function() {
			var buttonClick = parseInt($(this).attr('value'));
			if(buttonClick === qArray[currentIndex].correctAnswer) {
				rightAnswer();
			}
			else {
				wrongAnswer();
			}
		});
	}

	function rightAnswer() {
		clearTimeout(timeIsUp);
		correct++;
		questionTimer.stop();
		questionTimer.reset();
		$('#time').empty();
		$('#question').html("<h2>You've got it right!</h2>");
		$('#answer0, #answer1, #answer2, #answer3').hide().off('click');
		$('#imgresponse').show().html("<img class='gifs' src=" + qArray[currentIndex].imgRight + ">");

		timeIsUp = setTimeout(advance, 1* 1000);
	}

	function wrongAnswer() {
		clearTimeout(timeIsUp);
		incorrect++;
		questionTimer.stop();
		questionTimer.reset();
		$('#time').empty();
		$('#question').html("<h2>Sorry, you're incorrect!</h2>");
		$('#answer0, #answer1, #answer2, #answer3').hide().off('click');
		$('#imgresponse').show().html("The correct answer was: " + qArray[currentIndex].answers[qArray[currentIndex].correctAnswer] +
			"<br><img id='wimg' src=" + qArray[currentIndex].imgWrong + ">");

		timeIsUp = setTimeout(advance, 1 * 1000);
	}

	function timesUp() {
		clearTimeout(timeIsUp);
		unanswered++;
		questionTimer.stop();
		questionTimer.reset();
		$('#time').empty();
		$('#question').html("<h2>Time's Up!</h2>");
		$('#answer0, #answer1, #answer2, #answer3').hide().off('click');
		$('#imgresponse').show().html("<p> The correct answer was: </p>" + qArray[currentIndex].answers[qArray[currentIndex].correctAnswer] +
			"<br><img class='gifs' src=" + qArray[currentIndex].imgWrong + ">");

		timeIsUp = setTimeout(advance, 1 * 1000);
	}

	function endScreen() {
		audio.pause();
		$('#time').html("<h2>Good job!</h2>");
		$('#question').html("Your results: <br><br>Right: " + correct + "<br>Wrong: " + incorrect + "<br>Not Answered: " + unanswered);

		$('#imgresponse').html("<button class='btn' id='playagain'>Play again?</button>");

		$('#playagain').on("click", function() {
			varSet();
			advance();
		});
	}

	function advance() {
		currentIndex++;

		if(currentIndex < qArray.length) {
			askQuestions();
			timeIsUp = setTimeout(timesUp, 15 * 1000);
		} else {
			endScreen();
		}
	}


	varSet();

});



// var backgrounds = [
//     //Entrance to temple === [0]
//     'https://initiate.alphacoders.com/images/709/cropped-1920-1080-709974.jpg?8408',
//     //Climbing mountain === [1]
//     'https://images6.alphacoders.com/805/805656.jpg',
//     //Riding horse and shooting arrow === [2]
//     'https://initiate.alphacoders.com/images/712/cropped-1366-768-712175.jpg?7548',
//     //Forest at midnight === [3]
//     'https://images7.alphacoders.com/557/557051.jpg',
//   ];
  
  
//   var imgIdx = 0;
//   function swapBackgrounds() {
//     if(++imgIdx >= backgrounds.length) {
//         imgIdx = 0;
//     }
//     $('.background').animate({ opacity: 0}, 1000, function() {
//         $('.background').css("background-image", "url('" + backgrounds[imgIdx] + "')").animate({opacity: 1},1000);
//     });
//   }
  
//   setInterval(swapBackgrounds, 1000);
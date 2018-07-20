$(document).read(function(){
    var count = 0;
    var time = 16;
    var correct = 0;
    var incorrect = 0;
    // var seconds;
    var isSelected = false;
    var quesArray;
    var currentIndex;
    var unanswered; 
    var timeIsUp;

    correct = 0;
    incorrect = 0;
    unanswered = 0;

    currentIndex = -1; 

    $("#question").html("<button class = 'btn' id = 'start'> start </button");
    $("#answer0, #answer1, #answer2, #answer3").hide().off('click');
    $("#start").on("click", function(){
        advance();

    var questionTimer = {
		seconds: 15,

		reset: function () {
        	time.seconds = 15;
    	},
   		start: function(){
   			$('#time').html("Time Remaining: " + time.seconds).css("color", "#BCFEFF");;
        	counter = setInterval(time.count, 1000);
    	},
    	stop: function(){
        	clearInterval(counter);
    	},
    	count: function(){
   	       time.seconds--;
	        $('#time').html("Time Remaining: " + time.seconds);

	        if(time.seconds < 6) {	//At 5 text will start flashing
	        	if(time.seconds % 2 == 0) {
	        		$('#time').css("color", "#EBFFE3");	//Whiteyellow
	        	} else {
	        		$('#time').css("color", "#E8867D");	//Redpink
	        	}
	        }
    	},
	}
function varSet (){
    quesArray = [{
        question: "Who is the main character of the Legend of Zelda series?",
        answers: ["Biggoron", "Link", "Majora", "Princess Zelda"], 
        imgRight: './assets/images/dancinglink.gif',
        imgWrong: './assets/images/wrong.png', 
        backgrd:'https://initiate.alphacoders.com/images/709/cropped-1920-1080-709974.jpg?8408',
        correctAnswer:1
    }, {
        question: "What village is Link from?",
        answers: ["Kokiri Forest", "Gerudo Valley", "Death Mountain", "Hyrule"], 
        imgRight: './assets/images/dancinglink.gif', 
        imgWrong: './assets/images/wrong.png', 
        backgrd:'https://images6.alphacoders.com/805/805656.jpg',
        correctAnswer:3

    }, {
        question: "How many Legend of Zelda games are there?",
        answers: [8, 4, 11, 19], 
        imgRight: './assets/images/dancinglink.gif', 
        imgWrong: './assets/images/wrong.png', 
        backgrd:'https://images7.alphacoders.com/557/557051.jpg',
        correctAnswer:3

    }, {
        question: "When did the first game in the series came out?",
        answers: ["February 21, 1986", "July 16, 1969", "November 4, 2008", "November 29, 1972"], 
        imgRight: './assets/images/dancinglink.gif', 
        imgWrong: './assets/images/wrong.png',
        backgrd:'https://initiate.alphacoders.com/images/712/cropped-1366-768-712175.jpg?7548', 
        correctAnswer: 0

    }, {
        question: "Who is the main villain in the Legend of Zelda series?",
        answers: ["Ghirahim", "Kriemhild", "Shadarastra", "Ganondorf"], 
        imgRight: './assets/images/dancinglink.gif', 
        imgWrong: './assets/images/wrong.png',
        backgrd:'https://images6.alphacoders.com/805/805656.jpg', 
        correctAnswer: 3
        
    }]

    correct = 0;
    incorrect = 0;
    unanswered = 0;

    currentIndex = -1; 

    $("#question").html("<button class = 'btn' id = 'start'> start </button");
    $("#answer0, #answer1, #answer2, #answer3").hide().off('click');
    $("#start").on("click", function(){
        advance();
    });
}

function askQ() {
    time.start();
    $("#question").html(quesArray[currentIndex].question);
    $("#answer0").show().html(quesArray[currentIndex].answers[0]);
    $("#answer1").show().html(quesArray[currentIndex].answers[1]);
    $("#answer2").show().html(quesArray[currentIndex].answers[2]);
    $("#answer3").show().html(quesArray[currentIndex].answers[3]);
    $("#imgresponse").hide().off("click");

    onClickAnswer();
}

function onClickAnswer() {
    $('.btn').on("click", function() {
        var buttonClick = parseInt($(this).attr('value'));
        if (buttonClick === quesArray[currentIndex].correctAnswer) {
                correctAnswer();
            
        } else {
            incorrectAnswer();
        }
    });
}

function correctAnswer() {
    clearTimeout(timeIsUp);
    correct ++;
    time.stop();
    time.reset();
    $("#time").empty();
    $("question").html("<h2>You answered correctly!</h2>");
    $("#answer0, #answer1, #answer2, #answer3").hide().off("click");
    $("#imgresponse").show().html("<img class ='gifs' src =" + quesArray[currentIndex].imgRight + ">");

    timeIsUp = setTimeout(advance, 4 * 1000);
}

function incorrectAnswer() {
    clearTimeout(timeIsUp);
    incorrect ++;
    time.stop();
    time.reset();
    $("#time").empty();
    $("#question").html("<h2> Wrong Answer!</h2>");
    $("#answer0, #answer1, #answer2, #answer3").hide().off("click");
    $("#imgresponse").show().html("The correct answer was: " + quesArray[currentIndex].answers[quesArray[currentIndex].correctAnswer] + "<br> <img class ='gifs' src =" + quesArray[currentIndex].imgRight + ">");
    timeIsUp = setTimeout(advance, 4 * 1000);
}
function timesUp() {
    clearTimeout(timeIsUp);
    unanswered++;
    time.stop();
    time.reset();
    $('#time').empty();
    $('#question').html("<h2>Time's Up!</h2>");
    $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
    $('#gifHolder').show().html("The correct answer was: " + quesArray[currentIndex].answers[quesArray[currentIndex].correctanswer] +
        "<br><img class='gifs' src=" + quesArray[currentIndex].imgWrong + ">");

    timeIsUp = setTimeout(advance, 4 * 1000);
}

function endScreen() {
    $('#time').html("<h2>Good job!</h2>");
    $('#question').html("Your results <br><br>Right: " + correct + "<br>Wrong: " + incorrect + "<br>Not Answered: " + unanswered);

    $('#gifHolder').html("<button class='btn' id='playagain'>Play again?</button>")

    $('#playagain').on("click", function() {
        varSet();
        advance();
    });
}

function advance() {
    currentIndex++;

    if(currentIndex < quesArray.length) {
        askQuestions();
        timeIsUp = setTimeout(timesUp, 30 * 1000);
    } else {
        endScreen();
    }
}


varSet();



// //Append img (logo) to class= "title"
$(".title").append("<img src='https://vignette.wikia.nocookie.net/zelda/images/f/fb/The_Legend_of_Zelda_%28logo%29.png/revision/latest?cb=20090404221145' width='300px' height='100px'/>");



var backgrounds = [
    //Entrance to temple === [0]
    'https://initiate.alphacoders.com/images/709/cropped-1920-1080-709974.jpg?8408',
    //Climbing mountain === [1]
    'https://images6.alphacoders.com/805/805656.jpg',
    //Riding horse and shooting arrow === [2]
    'https://initiate.alphacoders.com/images/712/cropped-1366-768-712175.jpg?7548',
    //Forest at midnight === [3]
    'https://images7.alphacoders.com/557/557051.jpg',
  ];
  
  
  var imgIdx = 0;
  function swapBackgrounds() {
    if(++imgIdx >= backgrounds.length) {
        imgIdx = 0;
    }
    $('.background').animate({ opacity: 0}, 1000, function() {
        $('.background').css("background-image", "url('" + backgrounds[imgIdx] + "')").animate({opacity: 1},1000);
    });
  }
  
//   setInterval(swapBackgrounds, 1000);
  


});
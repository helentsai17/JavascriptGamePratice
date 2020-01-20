var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function(){
  if(!start){
    started = true;
    $("#level-title").text("Level "+level);
    nextSequence();
  }
});

function nextSequence(){
   userClickedPattern = [];
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(1000).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("h1").text("level "+level);
}


//when button got click
$(".btn").click(function() {
  // get the id when user push the button
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  //play sound
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});



function playSound(color){
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

   setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

        if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },2000);

      $("h1").text("Game Over, Press Any Key to Restart");


      startover();
    }

}
function startover(){
  level = 0;
  gamePattern = [];
  start = false;

}

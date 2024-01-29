// alert("This is working");

var colourArray = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var randomNum;

var randomColour;

var _roundStarted = false;

var level = 0;

var gameOver = false;

function generateSequence(){
    randomNum = Math.floor(Math.random()*4);
    randomColour = colourArray[randomNum];
    gamePattern.push(randomColour);
    colourSelected(randomColour);
    console.log(gamePattern);
}

function colourSelected(color){
    playSound(color);
    $("#" + color).fadeOut(200);
    $("#" + color).fadeIn(200);
}

$(".btn").on("click", function(e){
        var userChosenColour = e.currentTarget.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animateClick(userChosenColour);
        checkPlayerInput(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animateClick(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}1

$(document).on("keypress", function(e){
    if(e.key == "a" && !_roundStarted){
        _roundStarted = true;
        nextSequence();
    }
})

function nextSequence(){
    $("h1").text("Level " + level);
    level++;
    userClickedPattern = [];
    generateSequence();
}

function checkPlayerInput (currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel] && !gameOver){
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        gameOver = true;
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart")

        $(document).one("keypress", function(e){
            startOver();
        });
    }
}

function startOver(){
    level = 0;
    _roundStarted = false;
    gamePattern = [];
    userClickedPattern =[];
    gameOver = false;
    $("h1").text("Press A Key to Start");
}
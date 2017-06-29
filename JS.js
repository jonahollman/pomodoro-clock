$(document).ready(function() {
});

var timerPercentage = 0;
var workTime = 1500;
var breakTime = 300;
var elapsedTime = 0;
var timerOn = false;
var interval;
var workOrBreak = "work";
var chime = $("#chime")[0];


$(".startButton").click(function() {
  var randR = Math.floor(Math.random() * 128);
  var randG = Math.floor(Math.random() * 128);
  var randB = Math.floor(Math.random() * 128);
  
  $(".timerCompleted, .timerState").css("background-color", "rgba(" + randR + "," + randG + "," + randB + ", 0.5");
  
    interval = window.setInterval(moveProgress, 1000);
    timerOn = true;
  $(".stopButton").html("Stop");
  $(".timerState").css("display", "block");
});

$(".stopButton").click(function() {
  if (timerOn) {
    clearInterval(interval);
    timerOn = false;
    $(".stopButton").html("Reset");
  } else {
    elapsedTime = 0;
    $(".timerCompleted").animate({"width": "0%"}, 500);
    $(".timerState").css("display", "none");
    workOrBreak = "work";
  }
});


function moveProgress() {
  if (timerPercentage != 100) {
    elapsedTime += 1 
    if (workOrBreak == "work") {
      timerPercentage = ((elapsedTime / workTime) * 100).toFixed(2);
    } else {
      timerPercentage = ((elapsedTime / breakTime) * 100).toFixed(2);
    }
    $(".timerCompleted").animate({"width": timerPercentage + "%"}, 1000);
  } else {
    elapsedTime = 0;
    chime.play();
    
    var randR = Math.floor(Math.random() * 128);
    var randG = Math.floor(Math.random() * 128);
    var randB = Math.floor(Math.random() * 128);
  
    $(".timerCompleted, .timerState").css("background-color", "rgba(" + randR + "," + randG + "," + randB + ", 0.5");
    
    $(".timerCompleted").animate({"width": "0%"}, 500);
    if (workOrBreak == "work") {
      workOrBreak = "break";
      $(".timerState").html("Take a Break!")
      timerPercentage = ((elapsedTime / breakTime) * 100).toFixed(2);
    } else {
      workOrBreak = "work";
      $(".timerState").html("Time to Work!")
      timerPercentage = ((elapsedTime / workTime) * 100).toFixed(2);
    }
  }
  
}

$("#decreaseWork").click(function() {
  if (Number($("#workValue").html()) > 1) {
    $("#workValue").html($("#workValue").html() - 1);
    workTime -= 60;
  }
});

$("#increaseWork").click(function() {
  $("#workValue").html(Number($("#workValue").html()) + 1);
  workTime += 60;
});

$("#decreaseBreak").click(function() {
  if (Number($("#breakValue").html()) > 1) {
    $("#breakValue").html($("#breakValue").html() - 1);
    breakTime -= 60;
  }
});

$("#increaseBreak").click(function() {
  $("#breakValue").html(Number($("#breakValue").html()) + 1);
  breakTime += 60;
});
$(function(){


var card = $("#trivia-area");


  var questions = [{

    q: "What city is the US Open played in?",
    c: ["Flushing Meadows", "Queens", "Brooklyn", "Bronx"],
    a: 0,   //  "Flushing Meadows", 
    chosen: null 
  }, {
  
  
    q: "How many Grand Slams has Serena Williams Won??",
    c: ["21", "22", "23", "24"],
    a: 2, // 
    chosen: null
  }, {
  
    q: "What player has won the most evening matches on Arthur Ashe stadium?",
    c: ["Nadal", "Federer", "Williams", "Sharapova"],
    a: 3, // 3
    chosen: null
  }, {
  
  
    q: "How many Grand Slams has Roger Federer won?",
    c: ["19", "20", "21", "22"],
    a: 1, // 1
    chosen: null
  }, {
  
  
    q: "How many courts are at the US Open?",
    c: ["19", "20", "21", "22"],
    a: 3, //3
    chosen: null
  }, {
  
  
    q: "What year did John McEnroe win his first US Open",
    c: ["1979", "1980", "1981", "1982"],
    a: 3, //3
    chosen: null
  }, {
  
  
    q: "What year did Billie Jean King win her first US Open?",
    c: ["1966", "1967", "1968", "1969"],
    a: 1, //1
    chosen: null
  }, {
  
  
    q: "What year did Pete Sampras win his first US Open?",
    c: ["1989", "1990", "1991", "1992"],
    a: 1, //1
    chosen: null
  
  }];
  

  var game = {


    correct: 0,
    incorrect: 0,
    counter: 120,
    
  
    countdown: function() {
      game.counter--;
      $("#counter-number").html(`<div>${game.counter}</div>`);
  
      if (game.counter === 0) {
        console.log("TIME UP");
        game.done();
      }
    },
  
    start: function() {
      // console.log('hit');
      timer = setInterval(game.countdown, 1000);
  
      $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");
  
      $("#start").remove();
  
      for (var i = 0; i < questions.length; i++) {
      var $question = $("<div>");
      card.append($question);
      var $form = $(`<form>`).attr("id", i);
       $question.append("<h2>" + questions[i].q+ "</h2>");
        for (var j = 0; j < questions[i].c.length; j++) {
          $question.append($form);
          var $choice = $(`<input id=${i} type='radio' name='question-${i}' value='${questions[i].c[j]}'></input>`);
          var $label = $(`<label for=${i}>${$choice.val()}</label><br/>`)
          $form.append($choice);
          $form.append($label);
        }
      }
      card.append("<button id='done'>Done</button>");
    },
  
    done: function() {
      for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var selectedForm = $(`form[id=${i}]`)
        var inputCheckedValue = selectedForm.children("input:checked").val();
          if (inputCheckedValue === question.c[question.a]){
            this.correct++;
          } else {
            this.incorrect++;
          }
      }
      this.result();
    },
     
    result: function() {
  
      clearInterval(timer);
  
      $("#sub-wrapper h2").remove();
  
      card.html("<h2>Finished</h2>");
      card.append("<h3>Correct Answers: " + this.correct + "</h3>");
      card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
      // card.append("<h3>Unanswered: " + this.unanswered + "</h3>");
    }
  };
  

// console.log("hello")


// --------------------- DOM ELEMENTS-----------------------------------------

var row = $("<div>").attr("class", "row");
var pageOne = $("<div>").append([])
pageOne.attr("class", "container-fluid");


// ------------------------ EVENT LISTENERS -----------------------------------------

$(document).on("click", "#start", function() {
  game.start();
});


$(document).on("click", "#done", function() {
  game.done();
});

})
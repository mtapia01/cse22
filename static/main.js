wordIndex = -1;
let lastCommentId = -1;

$(document).ready(function () {
  $("#mybtn").click(function () {
    let name = $("#inputbox").val();
    let nametwo = $("#musicresponses").val();
    $("#responses").html("<p>" + name + ":" + " " + nametwo + "</p>");
  });
  $("#sign-In").click(function () {
    let userName = $("#username").val();
    let passWord = $("#password").val();
    $.get(
      "/verify",
      { username: userName, password: passWord },
      function (response) {
        if (response == "You have successfully signed in") {
          $.get("/boardroom", {}, function (signed_response) {
            $("#boardroom").html(signed_response);
            $("#login-space").addClass("hidden");
            $("#board").removeClass("hidden");
            $("#posted-Comments").removeClass("hidden");
          });
        } else {
          alert("Try Again");
        }
      }
    );
  });

  let word = "";
  $.get("/word", {}, function (response) {
    word = response["word"];
    wordIndex = response["length"];
    for (let i = 0; i < wordIndex; i++) {
      $("#jumbo").prepend(`<span id= "letter${i}">_ </span>`);
    }
  });
  wrong = 0;
  $("#user_textbox").keypress(function () {
    let value = $("#user_textbox").val();
    if (value.length > 0) {
      $("#letter_box").val("");
    }
  });

  $("#restart").click(function () {
    window.location.reload();
  });
  let right = 0;
  $("#gamebtn").click(function () {
    let guess = $("#user_textbox").val();
    $.get("/word_lists", { guess: guess, word: word }, function (response) {
      let user_guessed = response["user_guess"];
      let positions = response["positions"];
      if (response == "Try Again") {
        wrong += 1;
      }
      if (wrong == 1) {
        $("#head").removeClass("hidden");
      }
      if (wrong == 2) {
        $("#body").removeClass("hidden");
      }
      if (wrong == 3) {
        $("#left-arm").removeClass("hidden");
      }
      if (wrong == 4) {
        $("#right-arm").removeClass("hidden");
      }
      if (wrong == 5) {
        $("#right-leg").removeClass("hidden");
      }
      if (wrong == 6) {
        $("#left-leg").removeClass("hidden");
        $("#gameover").removeClass("hidden");
        $("#gamebtn").addClass("hidden");
        $("#restart").removeClass("hidden");
      }
      if (response != "Try Again") {
        for (let i = 0; i < positions.length; i++) {
          let item = "#letter" + positions[i];
          if ($(item).html() == "_ ") {
            console.log("imhere");
            $(item).html(user_guessed);
            right += 1;
          }
        }

        if (right == word.length) {
          $("#you_won").removeClass("hidden");
        }
      }
    });
  });
  //lab 6
  function getComments() {
    $.get("/getcomments", {}, function (response) {
      let comments = response["comments"];

      for (let i = lastCommentId + 1; i < comments.length; i++) {
        let name = comments[i]["name"];
        let message = comments[i]["message"];

        message = message.replaceAll("<", "&lt");
        message = message.replaceAll(">", "&gt");

        if (i > lastCommentId) {
          lastCommentId = i;
        }
        $("#responses").append(`<b>${name}</b><br>${message}<br>`);
      }
    });
  }
  //lab 6
  getComments();
  setInterval(getComments, 5000);
  $("#dis-boardbtn").click(function () {
    let name = $("#inputbox").val();
    let message = $("#discussion_response").val();

    $.get(
      "/savecomments",
      { name: name, message: message },
      function (response) {
        getComments();
      }
    );
  });

  //lab 6
  $("#sign_up").click(function () {
    let newUser = $("#newUser").val();
    let newPassword = $("#newPassword").val();
    console.log(newUser, newPassword);
    $.get(
      "/signupaccount",
      { newUser: newUser, newPassword: newPassword },
      function (response) {
        alert("You have made an account");
        window.location.reload();
      }
    );
  });

  $("#sign_in").click(function () {
    let userName = $("#newUser").val();
    let passWord = $("#newPassword").val();
    $.get(
      "/verifyLogin",
      { newUser: userName, newPassword: passWord },
      function (response) {
        if (response == "You have successfully signed in") {
          $.get("/boardroom", {}, function (signed_response) {
            $("#boardroom").html(signed_response);
            $("#board").removeClass("hidden");
            $("#posted-Comments").removeClass("hidden");
            $("#sign-in-and-up").addClass("hidden");
            $("sign-in-and-up-Jumbotron").addClass("hidden");
            $("post-sign-in").removeClass("hidden");
          });
          //lab 8
          $.get("/address_book", {}, function (signed_response) {
            $("#address_info").removeClass("hidden");
            $("#favorites").removeClass("hidden");
            $("#search").removeClass("hidden");
            $("#").removeClass("hidden");
          });
        } else {
          alert("Try Again");
        }
      }
    );
  });

  $("#user_textbox").keypress(function () {
    let value = $("#user_textbox").val();
    if (value.length > 0) {
      $("#user_textbox").val("");
    }
  });
  // This assigns the number of _ a word needs. Works as of Oct 22.
  $("/word_lengths", {}, function (response) {
    position = response["postion"];
    length = response["length"];
    var i;
    for (let i = 0; i < length; i++) {
      $("#jumbo").append('<span id= "letter${i}">_</span>');
    }
  });
  //lab7
  $("#learn-more").click(function () {
    $("#learn-more").addClass("hidden");
    $("#huckleberry-learn").removeClass("hidden");
    $("#show-less").removeClass("hidden");
    $("#learn-more-bookone").addClass("hidden");
    $("#picture-of-bookone").addClass("hidden");
  });
  // $("#learn-more-bookone").click(function(){
  // 	$("#learn-more").addClass("hidden")
  // 	$("#odyssey-learn").removeClass("hidden")
  // 	$("#show-less").removeClass("hidden")
  // 	$("#learn-more").addClass("hidden")
  // 	$("#picture-of-book").addClass("hidden")
  // 	$("#readbook").addClass("hidden")
  // })
  //lab 7
  // $("#learn-more").click(function(){
  // 	$.get('/views', {"view": +1 })
  // })

  $("#readbook").click(function () {
    $("#learn-more").addClass("hidden");
    $("#learn-more-bookone").removeClass("hidden");
    $("#book").removeClass("hidden");
    $("#picture-of-book").addClass("hidden");
    $("#stopreading").removeClass("hidden");
    $("#readbook").addClass("hidden");
    $("#learn-more-bookone").addClass("hidden");
  });
  // $("#readbook-one").click(function(){
  // 	$("#learn-more").addClass("hidden")
  // 	$("#learn-more-bookone").addClass("hidden")
  // 	$("#bookodyssey").removeClass("hidden")
  // 	$("#picture-of-book").addClass("hidden")
  // 	$("#picture-of-bookone").addClass("hidden")
  // 	$("#stopreading-b-one").removeClass("hidden")
  // 	$("#readbook").addClass("hidden")
  // })
  // $("#stopreading-b-one").click(function(){
  // 	$("#learn-more").removeClass("hidden")
  // 	$("#learn-more-bookone").removeClass("hidden")
  // 	$("#book").addClass("hidden")
  // 	$("#bookodyssey").addClass("hidden")
  // 	$("#picture-of-book").removeClass("hidden")
  // 	$("#picture-of-bookone").addClass("hidden")
  // 	$("#stopreading-b-one").addClass("hidden")
  // 	$("#readbook").removeClass("hidden")
  // 	$("#readbook-one").removeClass("hidden")
  // 	$("#learn-more-bookone").removeClass("hidden")
  // })
  $("#stopreading").click(function () {
    $("#learn-more").removeClass("hidden");
    $("#book").addClass("hidden");
    $("#picture-of-book").removeClass("hidden");
    $("#stopreading").addClass("hidden");
    $("#readbook").removeClass("hidden");
    $("#learn-more-bookone").removeClass("hidden");
    $("#picture-of-bookone").removeClass("hidden");
    $("#learn-more-bookone").removeClass("#hidden");
  });
  $("#show-less").click(function () {
    $("#learn-more").removeClass("hidden");
    $("#huckleberry-learn").addClass("hidden");
    $("#show-less").addClass("hidden");
    $("#learn-more-bookone").addClass("hidden");
  });
  // lab7
  $("#learn-more").click(function () {
    $.get("/views", {}, function (response) {
      view_counter = response["views"];
      console.log(response);
      $("#views-on-page").html(view_counter);
    });
  });
  $.get("/countwords", {}, function (response) {
    wordcount = response["number_of_words"];
    $("#wordcount").append(
      "There are " + "<b>" + wordcount + "</b>" + " words!"
    );
  });
  $.get("/longestwordforbook", {}, function (response) {
    longest = response["longest"];
    $("#longestword").append(
      "<b>" + " ' " + longest + " ' " + "</b>" + "is the longest word!"
    );
  });
  $.get("/mostusedwords", {}, function (response) {
    pop_word = response["frequent_word"];
    number_of_times_used = response["numberoftimes"];
    $("#most-used-word").append(
      " '" +
        "<b>" +
        pop_word +
        " '" +
        "</b>" +
        " was the most used word." +
        " It was used " +
        "<b>" +
        number_of_times_used +
        "</b>"
    );
  });
  $.get("/textofbook", {}, function (response) {
    let book = response["book"];
    $("#book").html(book);
  });
  $.get("/address_file", {}, function (response) {
    let file = response["rolodex"];
    $("#file").html(file);
  });
  //Lab 4 things
  // $("#gamebtn").click(function(){
  // 	alert("hello")
  // let user_guess = $("#user_guess").val();
  // })
  // $("#user_guess").val("");
  // $.get('/word_lists', {user_guess: user_guess}, function(response){
  // 		// Lab 4 stuff
  // 		// if (response != "Try Again")
  // 		// 	if	(response == "C"){
  // 		// 		$("#letter_c").addClass("hidden")
  // 		// 		$("#letter_one").removeClass("hidden");
  // 		// 	}

  // 	})

  // wrong should add the body parts
  //gobal variable

  // let wrong = 0
  // $("#user_guess").keypress(function(){
  // 	let value = $("#user_guess").val();
  // 	if (value.length > 0){
  // 		$("#user_guess").val("");
  // 	}
  // })
  // $("#gamebtn").click(function(){
  // 	let user_guess = $("#user_guess").val();
  // 	if (value.length > 0){
  // 		$("#user_guess").val("");
  // 	}
  // })
  // this chekcs to see if the letter is correct
  //	$("#user_guess").val("");

  // 	$.get('/game_check', {user_guess: user_guess}, function(response){
  // 		if (response != "Try Again"){
  // 			if	(response == "C"){
  // 				$("#letter_c").addClass("hidden")
  // 				$("#letter_one").removeClass("hidden");
  // 			}
  // 			if (response == "O"){
  // 				$("#letter_o").addClass("hidden")
  // 				$("#letter_two").removeClass("hidden");
  // 			}
  // 			if (response == "M"){
  // 				$("#letter_m").addClass("hidden")
  // 				 $("#letter_three").removeClass("hidden");
  // 			}
  // 			if (response == "U"){
  // 				$("#letter_u").addClass("hidden")
  // 				$("#letter_four").removeClass("hidden");
  // 			}
  // 			if (response == "R"){
  // 				$("#letter_r").addClass("hidden")
  // 				$("#letter_five").removeClass("hidden");
  // 			}
  //End of lab 4 stuff
});

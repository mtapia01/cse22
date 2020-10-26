wordIndex = -1

$(document).ready(function (){
	$("#mybtn").click(function(){
		let name = $("#inputbox").val();
		let nametwo = $("#musicresponses").val();
		$("#responses").html("<p>"+ name + ":" + " " + nametwo + "</p>")
})

	$("#sign-In").click(function() {
		let userName = $("#username").val();
		let passWord = $("#password").val();
		$.get('/verify', {username: userName, password: passWord}, function(response){
			if(response == "You have successfully signed in"){

				$.get('/boardroom', {}, function(signed_response){
					$("#boardroom").html(signed_response);
					$("#login-space").addClass("hidden");
					$("#board").removeClass("hidden");
					$("#posted-Comments").removeClass("hidden");
				})											
			} 
			else {
				alert("Try Again")
			}
		})
	})

	let word = ""
	$.get('/word', {}, function(response){
		word = response['word']
		wordIndex = response['length']
		for (let i=0; i < wordIndex; i++){
			$("#jumbo").append(`<span id= "letter${i}">_ </span>`);
		}
	});
	wrong = 0;
	$("#user_textbox").keypress(function(){
		let value = $("#user_textbox").val();
		if (value.length > 0){
			$("#letter_box").val("");
		}
	});

	$("#restart").click(function(){
		window.location.reload();
	})
	let right = 0;
	$("#gamebtn").click(function(){
		let guess = $("#user_textbox").val();
		$.get('/word_lists', {guess: guess, word: word}, function(response){
			let user_guessed = response["user_guess"]
			let positions = response["positions"]
			if (response == "Try Again") {
				wrong += 1
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
			if (response != "Try Again"){
				for (let i=0; i < positions.length; i++){
					let item = '#letter' + positions[i];
					if ($(item).html() == "_ "){
						console.log("imhere")
						$(item).html(user_guessed);
						right += 1;
						
					}
				}
				
				if (right == word.length){
				
					$("#you_won").removeClass("hidden")
				}
			}
		})
	})
	

	$("#user_textbox").keypress(function(){
		let value = $("#user_textbox").val();
		if (value.length > 0){
			$("#user_textbox").val("");
		}
	})
	// This assigns the number of _ a word needs. Works as of Oct 22.
	$('/word_lengths',{},function(response){
		position = response['postion']
		length = response['length']
		var i; 
		for (let i = 0; i < length; i++){
		$("#jumbo").append('<span id= "letter${i}">_</span>')	
		}
	})

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
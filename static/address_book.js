$(document).ready(function () {
	$.get("/pretty", {}, function(response){
		let the_list = response['pretty_list'];

		for (let i = 0; i < the_list.length; i++){
			let current = the_list[i];
			let first_name = current['first_name']
			let last_name = current['last_name']
			let city = current['city']
			let state = current['state']
			let zip = current['zip']
			let phone1 = current['phone1']
			let phone = current['phone']
			let email = current['email']

			let line = `<tr><td>${first_name}</td><td>${last_name}</td><td>${city}</td><td>${state}</td><td>${zip}</td><td>${phone1}</td><td>${phone}</td><td>${email}</td></tr>`;

			$("#address_book").append(line);
		}
	});


	$("#searchbox").keyup(function(){
		let q = $("#searchbox").val();
		$.get("/search", {'q': q}, function(response){
			$("#").empty();
			let header = "<td><b>First Name</b></td><td><b>Last Name</b></td><td><b>Score</b></td>";
			$("#").append(header);
			let the_list = response['result'];
			if (the_list.length == 0){
				$("#").append("<tr><td colspan='3'>No results found...</td></tr>");
			}
			for (let i = 0; i < the_list.length; i++){
				let current = the_list[i];
				let first_name = current['first_name']
				let last_name = current['last_name']
				let score = current['score']

				let line = `<tr><td>${first_name}</td><td>${last_name}</td><td>${score}</td></tr>`;

				$("#gradebook").append(line);
			}
		});
	});
		$("#sign_up").click(function() {
		let newUser = $("#newUser").val();
		let newPassword = $("#newPassword").val();
			console.log(newUser, newPassword)
		$.get('/signupaccount', {"newUser": newUser, "newPassword": newPassword}, function(response){
			alert("You have made an account")
			window.location.reload();
		})
	});
	
	$("#sign_in").click(function() {
		let userName = $("#newUser").val();
		let passWord = $("#newPassword").val();
		$.get('/verifyLogin', {newUser: userName, newPassword: passWord}, function(response){
			if(response == "You have successfully signed in"){
				
				$.get('/boardroom', {}, function(signed_response){
					$("#boardroom").html(signed_response);
					$("#board").removeClass("hidden");
					$("#posted-Comments").removeClass("hidden");
					$("#sign-in-and-up").addClass("hidden");
				})	
				//lab 8
				$.get('/address_book', {}, function(signed_response){
					$("#address_info").removeClass("hidden")
					$("#favorites").removeClass("hidden")
					$("#search").removeClass("hidden")
					$("#").removeClass("hidden")

				})										
			} 
			else {
				alert("Try Again")
			}
		})
	})
});
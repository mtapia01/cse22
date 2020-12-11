$(document).ready(function () {
	$.get("/pretty", {}, function(response){
		let the_list = response['pretty_list'];

		for (let i = 0; i < the_list.length; i++){
			let current = the_list[i];
			let first_name = current['first_name']
			let last_name = current['last_name']
			let address = current['address']
			let city = current['city']
			let state = current['state']
			let zip = current['zip']
			let phone1 = current['phone_one']
			let phone = current['phone']
			let email = current['email']

			let line = `<tr><td>${first_name}</td><td>${last_name}</td><td>${address}</td><td>${city}</td><td>${state}</td><td>${zip}</td><td>${phone1}</td><td>${phone}</td><td>${email}</td></tr>`;

			$("#address_book").append(line);
		}
	});


	$("#search_conatacts").keyup(function(){
		let q = $("#search_conatacts").val();
		$.get("/search", {'q': q}, function(response){
			$("#").empty();
			let header = "<td><b>First Name</b></td><td><b>Last Name</b></td><td><b>Address</b></td><td><b>City</b></td><td><b>State</b></td><td><b>Zip</b></td><td><b>Phone 1</b></td><td><b>Phone</b></td><td><b>Email</b></td>";
			$("#").append(header);
			let the_list = response['result'];
			if (the_list.length == 0){
				$("#").append("<tr><td>No results found</td></tr>");
			}
			for (let i = 0; i < the_list.length; i++){
				let current = the_list[i];
				let first_name = current['first_name']
				let last_name = current['last_name']
				let address = current['address']
				let city = current['city']
				let state = current['state']
				let zip = current['zip']
				let phone1 = current['phone_one']
				let phone = current['phone']
				let email = current['email']

				let line = `<tr><td>${first_name}</td><td>${last_name}</td><td>${address}</td><td>${city}</td><td>${state}</td><td>${zip}</td><td>${phone1}</td><td>${phone}</td><td>${email}</td></tr>`;

				$("#address_book").append(line);
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
					// $("#").removeClass("hidden")

				})										
			} 
			else {
				alert("Try Again")
			}
		})
	})
	// add_newcontact
	$("#add_newcontact").click(function() {
		// alert("hello")
		let first_name = 'new_first_name'
		let last_name = 'new_last_name'
		let address = 'new_address'
		let city = 'new_city'
		let state = 'new_state'
		let zip = 'new_zip'
		let phoneone = 'new_phone_one'
		let phone = 'new_phone'
		let email = 'new_email'
		$.get('/add_new', {"first_name": first_name, "last_name": last_name, "address": address, "city": city, "state": state, "zip": zip, "phoneone": phoneone, "phone": phone, "email": email}, function(response){
		console.log(response)
		alert("You added a new contact")
			window.location.reload();	
		})
	})
	$("#new_zip").keypress(function(){
	let value = $("#new_zip").val();
	if (value.length > 5){
		alert("Zip Codes are only six digits")
		
		}
	});
});
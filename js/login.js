const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const host = "http://localhost:4000";



signUp= () => {
	console.log("in this function")
	const user = $('#user').val();
	const pass = $('#pass').val();
	const email = $('#email').val();

	console.log("info",user,pass,email);
	
	const data = {
		username:user,
		password:pass,
		email:email
	}

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body:JSON.stringify(data),
	redirect: 'follow'
	};

	
	fetch("http://localhost:4000/api/v1/user/create", requestOptions)
	.then((response) => {
		if (response.status == 409) throw response.json()
		window.location.href = "../views/login.html";
		return response.json()

	})


	.catch(error => error.then(msg => alert(msg.message)));
};

signIn = () => {
	const user = $('#username').val();
	const pass = $('#password').val();
	const data = {
		username:user,
		password:pass,
	}

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	
	let requestOptions = {
	method: 'POST',
	body:JSON.stringify(data),
	headers: myHeaders,
	redirect: 'follow'
	};
	fetch("http://localhost:4000/api/v1/login", requestOptions)
		.then(response => response.json())
		.then((result) => {
			console.log("Hello",result);
			localStorage.setItem("token", result.token);
			localStorage.setItem("id", result.id);

			if(localStorage.getItem("token") !== null)
			{
				window.location.href = "../views/Profile.html";
			}
			
		})
		.catch(error => console.log('error', error));
};
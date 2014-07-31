//When the DOM loads, the magic happens
EventUtil.addHandler(window, "load", function(){
	var allQuestions = [
		{
			question: "A tradição cultural do teatro veio de que país?",
			choices: ["Espanha", "Itália", "Grécia", "França"],
			correctAnswer: 2,
		},
		{
			question: "A origem do teatro pode ser remontada desde:",
			choices: ["O surgimento da escrita", "Das primeiras sociedades primitivas", "A origem do Livro", "As festas Judias"],
			correctAnswer: 1,
		},
		{
			question: "A tragédia surgiu de uma poesia chamada:",
			choices: ["Ditirambo", "Cauvinista", "Prepunha", "Causolel"],
			correctAnswer: 0,
		},
		{
			question: "A palavra teatro tem origem grega theatron, que significa:",
			choices: ["Arte de encenar", "Texto interpretado", "Encenação", "Local onde se vê"],
			correctAnswer: 3,
		},
		{
			question: "Uma peça teatral é escrita ou adaptada por seu _____. É ele quem cria os personagens, e todos os outros elementos que fazem parte da linguagem teatral. A palavra que completa a frase é:",
			choices: ["Cineasta", "Dramaturgo", "Telespectador", "Ator"],
			correctAnswer: 1,
		},
		{
			question: "Quais os elementos principais, ou tríade, essenciais que compõem o teatro:",
			choices: ["Comédia, drama e tragédia", "Ator, cena e público", "Ator, texto e público", "Cenário, trilha sonora e personagens"],
			correctAnswer: 2,
		},
		{
			question: "O que é Tépsis?",
			choices: ["Ator grego do Século V a.C", "Parte do cenário", "Roteiro", "Personagem que faz papel de Triste(geralmente em peças trágicas"],
			correctAnswer: 0,
		},
		{
			question: "O que significa Persona?",
			choices: ["Roteiro", "Personagem", "Dramaturgo", "Máscara"],
			correctAnswer: 3,
		},
	],
		score = 0,
		answers = [], //array containing the answers the user gave.
		points = 12,
		nextQuestion = 0,
		markup = "",
		answer = "",
		wrapperQuestion = document.getElementById("quiz-wrapper"),
		btnNext = document.getElementById("btn-next"),
		btnPrev = document.getElementById("btn-back");
		btnWrapper = document.getElementById("buttons-quiz");

	function createNextQuestion(questionNum) {
		// create the unordered list
		markup = "<p class='question'>" + allQuestions[questionNum].question + "</p><ul>";
		//loop through the choices and create the list and checkboxes
		(function(){
			for (var i = 0, len = allQuestions[questionNum].choices.length; i < len; i++) {
				markup += "<li class=\"radio\"><label><input type='radio' value='";
				markup += allQuestions[questionNum].choices[i] + "' name='question" + questionNum + "' required"

				console.log(answers[nextQuestion]);

				if (answers.length && answers[nextQuestion] === i) {
					markup += " checked>";
				} else {
					markup += ">";
				}

				markup += allQuestions[questionNum].choices[i] + "</li>";
				// if i equals correct answer, then save the answer for later comparison.
				if (i === allQuestions[questionNum].correctAnswer) {
					answer = allQuestions[questionNum].choices[i];
				}
			}
		})();

		markup += "</ul>";

		//using innerHTML, create the next question
		wrapperQuestion.innerHTML = markup;
	}

	function createScorePage() {
		var quiz = document.getElementById("quiz");

		//create the score title
		markup = "<div class=\"col-sm-6 col-sm-offset-3\">"
		markup += "<div class=\"panel panel-default\">"
		markup += "<div class=\"panel-heading\">"
		markup += "<h2>Congratulations for completing the quiz</h2>"; //multiple texts
		markup += "</div>"
		markup += "<div class=\"panel-body\">"
		markup += "<h3>Your score is:";

		//create the score text and put the variable in the tag
		markup +=  score + "</h3>";
		markup +=  "</div>";
		markup +=  "</div>";
		markup +=  "</div>";
		markup +=  "</div>";

		//using innerHTML, create the score page
		quiz.innerHTML = markup;
	}

	//Store the answer for later comparison
	function storeAnswer() {
		var form = document.forms[0],
		elements = form.elements["question" + nextQuestion];
		(function(){
			var i,
				len,
				field = null;
			for (i = 0, len = elements.length; i < len; i++){
				field = elements[i];
				if (field.name.length && field.checked) {
					answers[nextQuestion] = i;
					console.log(answers);
					break;
				}
			}
		})();
	}

	function calculateScore() {
		// Compare the correct answer with the answer the user gave.
		(function(){
			var i,
				len;

			for (i = 0, len = allQuestions.length; i < len; i++){
				// If equal, add the points
				if (allQuestions[i].correctAnswer === answers[i]) {
					score += points;
				}
			}
		})();
	}

	function isFormValid() {
		//check if the required field has checked before submission
		if (document.forms[0].checkValidity()) {
			return true;
		} else {
			return false;
		}
	}

	function getLocalStorage(){
		if (typeof localStorage == "object"){
			return localStorage;
		} else if (typeof globalStorage == "object"){
			return globalStorage[location.host];
		} else {
			throw new Error("Local storage not avaliable");
		}
	}

	function storeCredencials(user, password) {
		//check if username already exists
		//if not, set item

		//serialize form as json
		localStorage.setItem("user", user);
		localStorage.setItem("password", password);
	}

	function getCredencials(user, password) {
		storedUser = localStorage.getItem("user"),
		storedPassword = localStorage.getItem("password");

		if (user === storedUser && password === storedPassword) {
			return true;
		} else {
			return false;
		}
	}

	function credencials() {
		var form = document.getElementById(""),
			user = form.elements["username"][0].value,
			password = form.elements["password"][0].value;

		if (getCredencials(user, password)){
			createNextQuestion;
		} else {
			alert("Wrong username or password");
		}
	}

	function createButton(name, type, text, element) {
		console.time("button method 1");
		var node;
		name = document.createElement("button");
		name.type = type;
		node = document.createTextNode(text);
		name.appendChild(node);
		element.appendChild(name);
		console.timeEnd("button method 1");
	}

	function createButton2(type, text, element) {
		console.time("button method 2");
		var btn = "<button type=\"" + type + "\">" + text + "</button>";
		element.innerHTML = btn;
		console.timeEnd("button method 2");
	}

	function createHomePage() {
		var btnLogin = null,
			btnSignup = null;
		//create the login
		markup = "<p> Welcome to the Javascript Quiz.Please login or signup</p>";
		markup += "<div id=\"button-wrapper\">";
		markup += "<button class=\"btn btn-primary\" id=\"btn-login\" type=\"button\">Log in</button>";
		markup += "<button class=\"btn btn-default\" id=\"btn-signup\" type=\"button\">Sign up</button>";
		markup += "</div>"
		wrapperQuestion.innerHTML = markup;

		//Get button references
		btnLogin = document.getElementById("btn-login");
		btnSignup = document.getElementById("btn-signup");

		//Add the handlers (delegate works here better)
		EventUtil.addHandler(btnLogin, "click", createLoginPage);
		EventUtil.addHandler(btnSignup, "click", createSignupPage);
	}

	//two functions that can be one
	function createLoginPage(){
		var btnLogin = document.getElementById("btn-login"),
			btnSignup = document.getElementById("btn-signup");


		//Remove the handlers to regain memory in the app
		EventUtil.removeHandler(btnLogin, "click", createLoginPage);
		EventUtil.removeHandler(btnSignup, "click", createSignupPage);

		//Create the fields username, name and password
		markup = "<div class=\"form-group\">";
		markup += "<label for=\"username\">Username</label>";
		markup += "<input class=\"form-control\" id=\"username\" name=\"username\" type=\"text\"/ required>";
		markup += "</div>";

		// markup = "<div>";
		// markup += "<label for=\"realname\">Name</label>";
		// markup += "<input id=\"realname\" name=\"realname\" type=\"text\"/ required>";
		// markup = "</div>";

		markup += "<div class=\"form-group\">";
		markup += "<label for=\"password\">Password</label>";
		markup += "<input class=\"form-control\" id=\"password\" name=\"password\" type=\"password\"/ required>";
		markup += "</div>";

		markup += "<div id=\"button-wrapper\">";
		markup += "<button class=\"btn btn-primary\" id=\"btn-login\" type=\"button\">Log in</button>";
		markup += "</div>"

		wrapperQuestion.innerHTML = markup;

		//Get button references
		btnLogin = document.getElementById("btn-login");

		EventUtil.addHandler(btnLogin, "click", login);

	}

	function login(){
		if (isFormValid()){
			//check credencials
			var form = document.getElementsByTagName("form")[0];
			//serialize form
			var user = serialize(form);
			//get localStorage item based on the user
			var storedUser = localStorage.getItem(user.username)
			if(storedUser) {
				storedUser = JSON.parse(storedUser);
				//compare username
				if (storedUser.username !== user.username){
					alert("Invalid username");
					return;
				} else {
					//compare password
					if (storedUser.password !== user.password){
						alert("Invalid password");
						return;
					} else {


						//store credencial. Create as a option later
						if (CookieUtil.get("username") !== user.username) {
							storeCookie(user);
						}

						//create first question
						alert("Welcome " + storedUser.realname);
						btnWrapper.style.display = "block";
						createNextQuestion(nextQuestion);
						btnPrev.disabled = true;
					}
				}

			} else {
				alert("User not registered");
			}
		}
	}

	function serialize(form){
		var parts = {},
		field = null,
		i,
		len,
		j,
		optLen,
		option,
		optValue;

		//for each form element
		for (i = 0, len = form.elements.length; i < len; i++){
			field = form.elements[i];

			//check type
			switch (field.type) {

				case "select-one":
				case "select-multiple":
					// if field is valid
					if (field.name.length) {
						//loop through the select
						for (j = 0, optLen = field.options.length; j < optLen; j++){
							option = field.options[i];
							if (option.selected) {
								optValue = "";
								if (option.hasAttribute){
									optValue = (option.hasAttribute("value") ? option.value : option.text);
								} else {
									optValue = (option.attributes["value"].specified ? option.value : option.text);
								}
								parts[field.name].push(optValue);
							}
						}
						break;
					}
				case "undefined":
				case "file":
				case "submit":
				case "reset":
				case "button":
					break;

				case "radio":
				case "checkbox":
					if(!field.checked) {
						break;
					}
				//falls through
				default:
					if (field.name.length) {
						parts[field.name] = field.value;
					}
			}
		}
		console.log(parts);
		//return an array containing everything
		return parts;

	}

	//cookies
	//if has, login and create first question
	//if hasn't, create home page

	function checkCookie(){
		//get the username and password cookies
		var cookieUser = CookieUtil.get("username"),
			cookiePassword = CookieUtil.get("password"),
			storedUser = localStorage.getItem(cookieUser);
		//check local storage for the username data
		if (storedUser) {
			storedUser = JSON.parse(storedUser);
			if (storedUser.username === cookieUser && storedUser.password === cookiePassword) {
				//as function
				alert("Welcome " + storedUser.realname);
				createNextQuestion(nextQuestion);
				btnPrev.disabled = true;
			}
		} else {
			
			btnWrapper.style.display = "none";
			createHomePage();
		}
	}

	function storeCookie(data){
		console.log(data);
		for (var prop in data) {
			if (prop !== "realname") {
				console.log("set" + prop)
				CookieUtil.set(prop, data[prop]);
			}
			// console.log("prop: " + prop + " data: " + data[prop]);
		}
	}

	checkCookie();

	//50 cookie per domain
	// Cookie has the following pieces of information stored by the browser
	// Name (url encoded)
	// Value (url encoded)
	// Domain - If not set, is assumed to be the one from whih the cookie was set
	// Path
	// Expiration - time stamp when the cookie should be deleted. Can be deleted if the date has already ocurred.
	// Secure flag
	// Only cookie name and value are required


	//document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas") + "domain=.wrox.com; path=/";



	function createSignupPage(){
		var btnLogin = document.getElementById("btn-login"),
			btnSignup = document.getElementById("btn-signup");


		//Remove the handlers to regain memory in the app
		EventUtil.removeHandler(btnLogin, "click", createLoginPage);
		EventUtil.removeHandler(btnSignup, "click", createSignupPage);

		//Create the fields username, name and password
		markup = "<div class=\"form-group\">";
		markup += "<label for=\"username\">Username</label>";
		markup += "<input class=\"form-control\" id=\"username\" name=\"username\" type=\"text\"/ required>";
		markup += "</div>";

		markup += "<div class=\"form-group\">";
		markup += "<label for=\"realname\">Name</label>";
		markup += "<input class=\"form-control\" id=\"realname\" name=\"realname\" type=\"text\"/ required>";
		markup += "</div>";

		markup += "<div class=\"form-group\">";
		markup += "<label for=\"password\">Password</label>";
		markup += "<input class=\"form-control\" id=\"password\" name=\"password\" type=\"password\"/ required>";
		markup += "</div>";

		markup += "<div id=\"button-wrapper\">";
		markup += "<button class=\"btn btn-primary\" id=\"btn-signup\" type=\"button\">Sign up</button>";
		markup += "</div>"

		wrapperQuestion.innerHTML = markup;

		//Get button references
		btnSignup = document.getElementById("btn-signup");

		EventUtil.addHandler(btnSignup, "click", signup);

	}

	function signup(){
		if(isFormValid()){
			var form = document.getElementsByTagName("form")[0],
			user = serialize(form),
			storedUser = localStorage.getItem(user.username),
			btnSignup = document.getElementById("btn-signup");
			if (!storedUser){
				//remove handler
				EventUtil.removeHandler(btnSignup, "click", signup);


				localStorage.setItem(user.username, JSON.stringify(user));
				storeCookie(user);

				//set as function
				alert("Welcome " + user.realname);
				btnWrapper.style.display = "block";
				createNextQuestion(nextQuestion);
				btnPrev.disabled = true;

			} else {
				alert("Username already exists. Try another one");
				return;
			}
		}
	}

	function recoverUser(user){
		var a = {'a':'b'}
		a = JSON.stringify(a);
		localStorage.setItem('obj',a)
		var b = localStorage.getItem('obj')
		b = JSON.parse(b);
		console.log(b);
		return b; //later, obj
	}

	// Issue an HTTP GET request for the contents of the specified URL.
	// When the response arrives pass it to the callback function as a
	// parsed XML Document object, a JSON-parsed object, or a string
	function get(url, callback) {
	  var request = new XMLHttpRequest();                                 // Create new request
	  request.open("GET", url);                                           // Specify URL to fetch
	  request.onreadystatechange = function() {                           // Define event listener
	    // If the request is complete and was successful
	    if (request.readyState === 4 && request.status === 200) {
	      //get the type of the response
	      var type = request.getResponseHeader("Content-type");
	      //Check type so we don't get HTML documents in the future
	      if(type.indexOf("xml") !== -1 && request.responseXML) {
	        callback(request.responseXML);                               //Document response
	      } else if (type === "application/json") {
	        callback(JSON.parse(request.responseText));                   // JSON response
	      } else {
	        callback(request.responseText);                              // String response
	      }

	    }
	  };
	  request.send(null);
	}

	// get("example.json", console.log);

	//initialize



	// btnPrev.disabled = true;
	// createNextQuestion(nextQuestion);



	//create event delegation

	//when next button click
	EventUtil.addHandler(btnNext, "click", function(event){

		// If the form is valid, proceed
		if (isFormValid()) {

			var questions = allQuestions.length;

			btnPrev.disabled = false;

			event = EventUtil.getEvent(event);
			EventUtil.preventDefault(event);

			//store answer
			storeAnswer();

			// If it's the last question, calculate score and create the score page. If not, create the next question
			if (nextQuestion === (questions - 1)){
				//calculate the score
				calculateScore();

				//create the score page
				createScorePage();
			} else {

				//increment nextQuestion variable
				nextQuestion = ++nextQuestion;

				//call createNextQuestion function
				createNextQuestion(nextQuestion);
			}
		}
	});

	//when next button click
	EventUtil.addHandler(btnPrev, "click", function(event){
		// event = EventUtil.getEvent(event);
		// EventUtil.preventDefault(event);
		// If the form is valid, proceed

		var questions = allQuestions.length;

		// If it's the last question, create the score page. If not, create the next question
		if (nextQuestion === 0){
			//disable button
			btnPrev.disabled = true;
		} else {


			//increment nextQuestion variable
			nextQuestion = --nextQuestion;

			//call createNextQuestion function
			createNextQuestion(nextQuestion);
		}
	});
});

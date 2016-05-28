$(document).ready(function(){

	var mail;
	var pass;
	var pass_md5;
	var token;
	var SERVER = "http://88.199.155.137:82/";
	var test;			// obiekt testu

	$("input#mail").val(Cookies.get('mail'));	// ustaw mail z ciasteczka

	// BUTTON LOGIN
	$("button#login").click(function(){

		mail = $("input#mail").val();
		pass = $("input#pass").val();
		pass_md5 = $.md5(pass);

		Cookies.set('mail',mail, { expires: 7 });	// ustaw ciasteczko

		var url = SERVER+"api/account/loginuser?email="+mail+"&password="+pass_md5

		$.mobile.loading("show");
		$("#error").html("");			// wyczyść div z błędem

		$.getJSON(url).done(function(json){									// udało się

			token = json['AuthorizationToken'];

			if(json['IsSucceed']){
				$.mobile.navigate("#page_list");	// przejdź do listy testów
			} else {
				$("#error").html("Błąd po stronie serwera");
			}

		}).fail(function( error ){					// nie udało się

				var err = error['status'] +" "+ error['statusText']
		    	$("#page_login #error").html( "Wystąpił błąd - " + err );

			}).always(function(){											// zawsze

				$.mobile.loading("hide");

			});

	});

	// BUTTON REFRESH LIST OF TESTS
	$("#page_list button#refresh").click(function(){

		$("#message_refresh").hide();	// schowaj div z dużym przyciskiem i opisem
		$("#page_list #error").html("");	// wyczyść error
		$.mobile.loading("show");

		var url = SERVER+"api/test/getalltests?authorizationtoken="+token;

		$.getJSON(url).done(function(json){				// udało się

			$("#page_list #tests_list").empty();	// wyczyść listę

			for(x in json){
				// dodaj po jednym elemencie listy
				$("#page_list #tests_list").append("<li test-id=\""+ json[x]['Id'] +"\"><a href=\"#\">"+json[x]['Name']+"<p class=\"ui-mini\">"+json[x]['CreatedOn']+"</p></a></li>");
			}

			$("#page_list #tests_list").listview("refresh");	// odśwież listę

		}).fail(function( jqxhr){	// błąd

			var err = jqxhr['status'] +" "+ jqxhr['statusText']
			$("#page_list #error").html( "Wystąpił błąd - " + err );

		}).always(function(){							// zawsze

			$.mobile.loading("hide");

		});

	});

	// LIST ITEM CLICK
	$("#page_list #tests_list").on('click','li', function(){

		$("#page_list #error").html("");	// wyczyść error
		$.mobile.loading("show");

		var test_id = $(this).attr("test-id");

		var url = SERVER+"api/test/gettest?id="+test_id+"&authorizationtoken="+token;

		$.getJSON(url).done(function(json){				// udało się

			console.log(json);
			test = json;
			test['QuestionsMade'] = 0;
			test['QuestionsCount'] = test['Questions'].length;
			test['CurrentQuestionId'] = null;

			$.mobile.navigate("#page_test");

		}).fail(function( jqxhr){	// błąd

			var err = jqxhr['status'] +" "+ jqxhr['statusText']
			$("#page_test #error").html( "Wystąpił błąd - " + err );

		}).always(function(){							// zawsze

			$.mobile.loading("hide");

		});

	});

	function loadQuestion(){

		test['CurrentQuestionId'] = Math.floor((Math.random() * test['Questions'].length) + 0);
		question = test['Questions'][test['CurrentQuestionId']];

		$("#page_test #question").html(question['Text']);

		$("#page_test #answers").empty();

		$("#page_test #counter").html(test['QuestionsMade']+"/"+test['QuestionsCount']);

		for(x in question['Answers']){

			var answer = question['Answers'][x];

			console.log(answer);

			$("#page_test #answers").append('<input type="checkbox" id="checkbox-'+answer["Id"]+'" answer-id="'+answer["Id"]+'" answer-true="'+answer["IsCorrect"]+'"><label for="checkbox-'+answer["Id"]+'">'+answer["Text"]+'</label>');

		}

		$("#page_test #answers").trigger('create');

	}

	// BUTTON CHECK
	$("#page_test #check").click(function(){

		var mistakes = 0;

		$("#page_test #answers input").each(function(i){
			var answer_id = $(this).attr('answer-id');
			var answer_val = $(this).is(':checked');
			var answer_true = $(this).attr('answer-true');
			if(answer_true === 'true'){
				answer_true = true;
			} else {
				answer_true = false;
			}

			if(answer_true){
				$("#page_test [for='checkbox-"+answer_id+"']").css('background-color','#AEE8AF');
			}

			if(answer_true != answer_val){
				mistakes++;
			}

		});

		// jeśli nie ma błędów
		if(mistakes == 0){
			test['QuestionsMade']++;
			test['Questions'].splice(test['CurrentQuestionId'],1);
		} else {

		}


	});

	// BUTTON NEXT
	$("#page_test #next").click(function(){

		if(test['Questions'].length > 0){
			loadQuestion();
		} else {
			$.mobile.navigate("#page_finish");
		}

	});

	// GDY JEST WCZYTANA STRONKA Z TESTEM
	$("#page_test").on("pageshow",function(event){

		loadQuestion();

	});

});

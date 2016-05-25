$(document).ready(function(){

	var mail;
	var pass;
	var pass_md5;
	var token;
	var SERVER = "http://88.199.155.137:82/";

	// BUTTON LOGIN
	$("button#login").click(function(){

		mail = $("input#mail").val();
		pass = $("input#pass").val();
		pass_md5 = $.md5(pass);

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

			}).fail(function( jqxhr, textStatus, error ){					// nie udało się

		    var err = textStatus + ", " + error;
		    $("#page_login #error").html( "Wystąpił błąd - " + err );

			}).always(function(){											// zawsze

				$.mobile.loading("hide");

			});

	});

	// BUTTON REFRESH LIST OF TESTS
	$("#page_list button#refresh").click(function(){

		$("#message_refresh").hide();	// schowaj div z dużym przyciskiem i opisem
		$("#page_login #error").html("");	// wyczyść error
		$.mobile.loading("show");

		var url = SERVER+"api/test/getalltests?authorizationtoken="+token;

		$.getJSON(url).done(function(json){				// udało się

			$("#page_list #tests_list").empty();	// wyczyść listę

			for(x in json){
				// dodaj po jednym elemencie listy
				$("#page_list #tests_list").append("<li><a href=\"#page_test\">"+json[x]['Name']+"<p class=\"ui-mini\">"+json[x]['CreatedOn']+"</p></a></li>");
			}

			$("#page_list #tests_list").listview("refresh");	// odśwież listę

		}).fail(function( jqxhr, textStatus, error ){	// błąd

			var err = textStatus + ", " + error;
			$("#error").html("Wystąpił błąd - " + err);

		}).always(function(){							// zawsze

			$.mobile.loading("hide");
			
		});

	});

});

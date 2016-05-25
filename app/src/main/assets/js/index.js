$(document).ready(function(){

	var mail;
	var pass;
	var pass_md5;
	var token;
	var SERVER = "http://88.199.155.137:82/";

	$("button#login").click(function(){

		var url = SERVER+"api/account/loginuser?email="+mail+"&password="+pass_md5;

		mail = $("input#mail").val();
		pass = $("input#pass").val();
		pass_md5 = $.md5(pass);

		$.mobile.loading("show");
		$("#page_login #error").html("");			// wyczyść div z błędem

		$.getJSON(url).done(function(json){									// udało się

		  	console.log(json);
				$.mobile.navigate("#page_list");	// przejdź do listy testów

			}).fail(function( jqxhr, textStatus, error ){					// nie udało się

		    var err = textStatus + ", " + error;
		    $("#page_login #error").html( "Request Failed: " + err );

			}).always(function(){											// zawsze

				$.mobile.loading("hide");

			});

	});

	$("#page_list button#refresh").click(function(){

		$("#message_refresh").hide();
		$.mobile.loading("show");

	});

	$("#load_tests").click(function(){
		var url = "http://88.199.155.137:82/api/account/loginuser?email=rkrawczyszyn@gmail.com&password=912ec803b2ce49e4a541068d495ab570&callback=?";
		url = "http://jsonplaceholder.typicode.com/posts/1";
		url = "http://dualjack.pe.hu/test.php";

		$.get( url, function( data ) {
		  $( "#response" ).html( data["title"] );
			console.log(data);
		});

	});

});

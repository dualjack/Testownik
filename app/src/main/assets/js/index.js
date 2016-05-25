$(document).ready(function(){
	$("#load_tests").click(function(){
		var url = "http://88.199.155.137:82/api/account/loginuser?email=rkrawczyszyn@gmail.com&password=912ec803b2ce49e4a541068d495ab570&callback=?";
		url = "http://jsonplaceholder.typicode.com/posts/1";
		url = "http://dualjack.pe.hu/test.php";

		$.ajaxPrefilter( "json script", function( options ) {
    	options.crossDomain = true;
		});
		$.get( url, function( data ) {
		  $( "#response" ).html( data["title"] );
			console.log(data);
		});

	});

	$("#gen_md5").click(function(){
		var pass = $("#pass").val();
		$("#md5").html($.md5(pass));
	});

});

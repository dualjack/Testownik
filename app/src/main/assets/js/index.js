$(document).ready(function(){

	var mail;
	var pass;
	var pass_md5;

	$("button#login").click(function(){

		mail = $("input#mail").val();
		pass = $("input#pass").val();
		pass_md5 = $.md5(pass);

		$.mobile.loading("show");

		//$.mobile.changePage("#page_list");
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

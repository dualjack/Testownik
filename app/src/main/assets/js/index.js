$(document).ready(function(){
	$("#load_tests").click(function(){
		$.get("http://88.199.155.137:82/api/account/loginuser?email=rkrawczyszyn@gmail.com&password=912ec803b2ce49e4a541068d495ab570", function(data, status){
        $("#response").html("Data: " + data + "\nStatus: " + status);
    },"json");
	});
});

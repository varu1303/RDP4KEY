$(document).ready(function(){
    
    
    $(document).on('click','#login-form-link',function(e) {
    	$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		e.preventDefault();
	});
	$(document).on('click','#register-form-link',function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		e.preventDefault();
	});
    
    
	$(document).on('click','.login',function() {
		$('.register').css({
            "color": "#2D3B55",
            "background-color": "white",
        });
		$(this).css({
            "color": "white",
            "background-color": "#2D3B55",
        });
	});
    
	$(document).on('click','.register',function() {
		$('.login').css({
            "color": "#2D3B55",
            "background-color": "white",
        });
		$(this).css({
            "color": "white",
            "background-color": "#2D3B55",
        });
	});

    
});

var url_check_user ='/s/user/is_logged_in.php';

function checkUser() {
   
    $('body').on( "click", ".check-user", function(e) {    	
        e.preventDefault();       
        $.ajax({
            async: false,
            type : "POST",
            url :  url_check_user,                     
            success:function (response) {
    
    			var jsonData = JSON.parse(response);
               	if(jsonData.success){
                   
                } 
                else {                                  
                    $('.modal-body').empty();
                    $('#default-modal').addClass('paywall');
                    $('.modal-body').append(jsonData.data);                    
                    $('#default-modal').modal('show');
                }                             
            }          
        });
    });
    
}




$( document ).ready(function() {
    checkUser();
});



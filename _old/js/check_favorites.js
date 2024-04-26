
 $(document).ready(function () 
 {
    return;
    var url_check_fav ='/s/user/check_favorites.php';
    var data;

    function get_favorites() {    
            jQuery.ajax({
                async: false,
                type : "POST",
                url :  url_check_fav,         
                success:function (response) {                
                    var favorites = JSON.parse(response); 
                    data=favorites;
                    //console.log(favorites);
                    return favorites;          
                  
                }          
            });
            
    }

    get_favorites();
    //console.log("FAVORITES RETURNED: "+data['id']);

    if(data['id']!='empty'){
        var result = [];
        result= data['id'].map(function(index,value){
            return [index];
        });
    }

    if ( typeof data['button_text'] !== 'undefined' )
    if(data['button_text']!='empty'){
        var result_text = [];
        result_text= data['button_text'].map(function(index,value){
            return [index];
        });
    }
    
     
    if(data['id']!="empty"){

        if (jQuery('.fav-count').hasClass("icon-bookmark")) {
            jQuery('.fav-count').removeClass("icon-bookmark");
        }            
        jQuery('.fav-count').addClass("icon-bookmark-solid");
        
        if(data['total']<=99) jQuery('.count').text(data['total']);
        else jQuery('.count').text('99');        
    }     
    else {  
    
        if (jQuery('.fav-count').hasClass("icon-bookmark-solid")) {
            jQuery('.fav-count').removeClass("icon-bookmark-solid");
        }            
        jQuery('.fav-count').addClass("icon-bookmark");

        jQuery('.count').text('0');               
    }
    

    //console.log("FAVORITE POSTS IDS:" + data['id']);

        
    var all = $(".save").map(function() {  
      return [this.id];
    }).get();

    //console.log("ALL POSTS IDS: "+ all);

    $.each(result, function( index, value ) {
        if ($.inArray(value,all)) {
            //console.log(value);
            jQuery(".save"+"."+value).html(result_text[index]);
            jQuery(".save"+"."+value).addClass("active");
        }
    });
    
});


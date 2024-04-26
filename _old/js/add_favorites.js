
var url_add ='/s/user/add_favorites.php';

function favGame() {
   
    $('body').on( "click", ".save", function(e) {
        //console.log('SAVE PRESSED');
        e.preventDefault();
        var id=this.id;
        var total=$(".count").text();
        $.ajax({
            async: false,
            type : "POST",
            url :  url_add,         
            data: {
               id  : id,
               total : total,
           },
        success:function (response) {
        //console.log("Post :"+id);
        //console.log("Save Pressed");
        var jsonData = JSON.parse(response);
        console.log(jsonData);
                //$("#"+id).addClass("active");
                if(jsonData.success){
                    $(".save"+"."+id).html(jsonData.button_text);

                    if(jsonData.action=="added") $(".save"+"."+id).addClass("active");
                    else if (jsonData.action=="removed") {
                        //console.log("REMOVED "+id );
                        $(".save"+"."+id).removeClass("active");
                        //$(".item "+id)
                        $(".favorites" ).find(".item"+"."+id).remove();
                    }


                    var total = jsonData.total;
                    jQuery('.count').text(jsonData.total);
                    if(total==0){
                        if (jQuery('.fav-count').hasClass("icon-bookmark-solid")) {
                            jQuery('.fav-count').removeClass("icon-bookmark-solid");
                        }            
                        jQuery('.fav-count').addClass("icon-bookmark");
                    }
                    else if(total>0){
                        if (jQuery('.fav-count').hasClass("icon-bookmark")) {
                            jQuery('.fav-count').removeClass("icon-bookmark");
                        }            
                        jQuery('.fav-count').addClass("icon-bookmark-solid");

                    }         

                } 
                else {
                    //var data = jsonData.data;
                    //console.log('MODAL WINDOW: '+jsonData.data);
                    $('.modal-body').empty();
                    $('#default-modal').addClass('paywall');
                    $('.modal-body').append(jsonData.data);
                    
                    $('#default-modal').modal('show');
                }
                
                //$("#add_ti_favorites-'.$id.' i").toggleClass("icon-favorite icon-favorite-solid");
                //console.log(jsonData);
                total = parseInt($("#favorites_count").text());
                if (jsonData.action=="added") total = total+1;
                else total = total-1;

                $("#favorites_count").text(total);
            },
             error: function(){
               alert('error!');
             }          
        });
    });
}

$( document ).ready(function() {
    favGame();
    
});



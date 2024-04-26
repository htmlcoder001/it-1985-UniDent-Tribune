$(document).ready(function(){
	$('.searchform').append('<div class="search-resultss"></div>');
    $('.search-field').append('<div class="search-resultss"></div>');

    let timer = 1000; // TIME IN MILLISECONDS
    let start_timing = null;

    $('#searchsubmit').off('click.radu-submit').on('click.radu-submit',function(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();

        log_search_term($("input[name='s']").val(),JSON.stringify(nav_tracker),site_ref);        
        clearTimeout(start_timing);        
    }); 

    $("input[name='s']").keyup(function(){
        var search = $(this).val();
        //let nav = JSON.parse(nav_tracker);

        //console.error('INPUT VALUE: ',search,' || NAV: ', nav_tracker.type);
        if(search != ""){
            
            clearTimeout(start_timing);
            start_timing = setTimeout(()=>log_search_term(search,JSON.stringify(nav_tracker),site_ref),timer);

            $.ajax({
                url: "/s/es/get_search.php",
                type: 'post',
                data: {search:search, results:10},
                dataType: 'json',
                success:function(response){
                    
                    if (typeof response['posts'] !== 'undefined' && response['posts'].length > 0) {
                        // the array is defined and has at least one element
                        var len = response['posts'].length;
                    }
                    else var len=0;
                    
                    $(".search-wrap .search-resultss").empty();
                    $(".show-all").remove();

                    var root = document.location.hostname;
                    if(len>0) $(".search-field").append('<div class="show-all"><a href="/?s='+search+'" class="btn large">Show all results</a></div>');
                    
                    for( var i = 0; i<len; i++){
                	       /*
                        	$.ajax({
								url:"/wp-content/themes/dt/template-parts/search/small_card.php",
								dataType:"html",
								type:'POST', 
								data: {
									title:response['posts'][i]['title'],
									content:response['posts'][i]['content'],
									image:response['posts'][i]['image'],
									link:response['posts'][i]['link'],
                                    id:response['posts'][i]['id'],

								},
								beforeSend: function(){
								},
								success:function(result){
								    $(".search-resultss").append(result);
								     
								},
                	       });*/
                           
                           var card=
                           '<div class="search-card '+response['posts'][i]['type']+'">'+
                                    '<div class="banner-wrap">'+
                                    //'<img src="'+response['posts'][i]['image']+'"/>'+                                    
                                    '<a href="'+response['posts'][i]['link']+'" class="name">'+response['posts'][i]['image']+'</a>'+
                                '</div>'+


                            '<div class="text">'+
                                '<span>'+response['posts'][i]['post_date']+'</span>'
                                +
                                '<a href="'+response['posts'][i]['link']+'" class="name">'+response['posts'][i]['title']+'</a>'+
                                '<p class="excerpt">'+response['posts'][i]['content']+'</p>'                                                            
                            +'</div>'+
                           '</div>';

                           //$(".search-wrap .search-resultss").append(card);
                            let elem = $(card).appendTo(".search-wrap .search-resultss");
                            //console.log('ELEMENT APPEND: ',elem);

                            var curEl = response['posts'][i];
                            $(elem).off('click.readu_search').on('click.radu_search',function(e){
                                //e.stopImmediatePropagation();
                                //e.preventDefault();

                                //console.log('clicked item :',curEl.id);
                                //save
                            });

                    }          
                }
                
            });
        }
        else 
        {
            $(".search-wrap .search-resultss").empty();
            $(".show-all").remove();
        }

        
    });


    function log_search_term(term = '',extra='',site='')
    {
        //console.log('LOGGING: ',term,extra,site);       
        
        data = {'term':term,'extra':extra,'site':site};

        //console.log('DATA: ',data);

        var formData = new FormData();
        formData.append('data', JSON.stringify(data));

        let result = navigator.sendBeacon('/s/es/log_search.php',formData);

        if(result) 
        {
            
        }
        else console.error('Error sending search log ...');

        
    }

});
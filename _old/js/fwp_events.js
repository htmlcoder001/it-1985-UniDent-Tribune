$(document).ready(function() {
	
	const queryString = window.location.search;
	//console.log("QUERY:"+queryString);

	$(document).off('change', '.facetwp-type-fselect'); // unregister
	$(document).off('change', '.facetwp-type-search'); // unregister
	if(queryString =="") {
		(function($) {    
		    $(document).on('change', '.facetwp-type-fselect', function() { // register
		    	//console.log("facet-wp changed");
		    	FWP.extras.sort = $(this).val();
		            //FWP.soft_refresh = true; // remove soft_refresh
		            FWP.autoload();                        
		            setTimeout(() => window.location.reload());
		            //
		        });
		})(jQuery);	
		// .facetwp-type-search
		(function($) {    
		    $(document).on('change', '.facetwp-type-search', function() { // register
		    	//console.log("facet-wp changed");
		    	FWP.extras.sort = $(this).val();
		            //FWP.soft_refresh = true; // remove soft_refresh
		            FWP.autoload();                        
		            setTimeout(() => window.location.reload());
		            //
		        });
		})(jQuery);	
	}
});		

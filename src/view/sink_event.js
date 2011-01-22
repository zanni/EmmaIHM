Sink.initCoreEvents = function(){

	$('.navigation li.composite a').tap(function(){
		
			var component = sink.find($(this).attr("id").replace("link-",""));
			
			sink.currentNavigation = component;
	    	if(component.card){
				component.displayCard();
			} 
	    	component.loadComponent();
	    			
			
	});
	
	$('.navigation li.leaf a').tap(function(){
	    	var component = sink.find($(this).attr("id").replace("link-",""));
	    	if(component.card) {
				
				component.displayCard();
				
				if(!sink.isScreenView()){
					sink.navigationVisible = false;
					$(".navigation").removeClass("visible");
					$("#"+sink.currentCard.id).addClass("visible");
				}
			}		
			
	});
	
	
	 $(".back").tap(function(){
		sink.currentNavigation.unrenderChild();
		var component = sink.find($(this).attr("id").replace("link-",""));
		sink.currentNavigation = component;
	});
	
	$(".navigation_button").tap(function(){
	
		if(sink.navigationVisible){
			sink.navigationVisible = false;
			$(".navigation").removeClass("visible");
			$("#card-"+sink.currentCard.id).addClass("visible");
		}
		else {
			sink.navigationVisible = true;
			sink.currentCard = sink.find($(".card.visible").attr("id").replace("card-",""));
			$("#card-"+sink.currentCard.id).removeClass("visible");
			$(".navigation").addClass("visible");
		}
		
	});
	
	

};
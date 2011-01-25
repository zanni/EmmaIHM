Sink.initCoreEvents = function(){
	$('.view li a').tap(function(){
			
			var component = Sink.find($(this).attr("id").replace("link-",""));
			
			Sink.currentView = component;
			/*
			if(component.children && component.children.length > 0){
				
				for(var i in component.children){
					child = component.chilren[i];
					if(child.card || child.renderCard){
						child.render("card");
					}
					if(child.load){
						child.load();
					}
				}
			}
			*/
			if(component.renderCard)component.renderCard();
			
			if(component.card || component.renderCard){
				component.display("card");
			}
			
			
	    	
	    	
	    	
			
	});
	/*
	$('.view li.leaf a').tap(function(){
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
	*/
	/*
	 $(".back").tap(function(){
		sink.currentNavigation.unrenderChild();
		var component = sink.find($(this).attr("id").replace("link-",""));
		sink.currentNavigation = component;
	});
	
	$(".view_button").tap(function(){
	
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
	*/
	

};
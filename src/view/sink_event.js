Sink.initCoreEvents = function(){
	$('.view li a').tap(function(){
			var component = Sink.find($(this).attr("id").replace("link-",""));
			
			Sink.currentView = component;
			for(var i in component.children){
				component.children[i].load(component.children[i]);
			}
			if((component.card || component.renderCard)){
				//Sink.renderer.selected.removeHTML("#card-"+Sink.currentCard.id);
				$("#card-"+Sink.currentCard.id).remove();
				Sink.currentCard.rendered.card = false;
				Sink.currentCard.displayed.card = false;
				if(!component.rendered.card){
					
					component.render("card");
					component.display("card");
					
					Sink.currentCard = component;
				}
				else if(!component.displayed.card){
					component.display("card");
					Sink.currentCard = component;
				}
				Sink.viewVisible = false;
				if(Sink.isMobile()){
					if(Sink.isViewVisible()){
						//Sink.renderer.selected.removeClass(Sink.viewcls, "visible");
						$(Sink.viewcls).removeClass("visible");
					}
					else {
						//Sink.renderer.selected.addClass(Sink.viewcls, "visible");
						$(Sink.viewcls).addClass("visible");
					}
				}

			}
			
			
			
			
	    	
	    	
	    	
			
	});
	/*
	 $(".back").tap(function(){
		sink.currentNavigation.unrenderChild();
		var component = sink.find($(this).attr("id").replace("link-",""));
		sink.currentNavigation = component;
	});
	*/
	$(".view_button").tap(function(){
	
		if(Sink.isViewVisible()){
			Sink.viewVisible = false;
			$(Sink.viewcls).removeClass("visible");
			$("#card-"+Sink.currentCard.id).addClass("visible");
		}
		else {
			Sink.viewVisible = true;
			Sink.currentCard = Sink.find($(".card.visible").attr("id").replace("card-",""));
			$("#card-"+Sink.currentCard.id).removeClass("visible");
			$(Sink.viewcls).addClass("visible");
		}
		
	});
	
	
	window.onresize = function(){
		var xMax = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var yMax = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
		$(Sink.body).css({"height":yMax,"width":xMax});
		
		$(Sink.body).removeClass(Sink.screencls);
		$(Sink.body).removeClass(Sink.mobilecls);
		$(Sink.body).removeClass(Sink.tablettels);
		if(Sink.isScreen()){
			$(Sink.body).addClass(Sink.screencls);
			$(".view_button").removeClass("visible");
			$("#card-"+Sink.currentCard.id).addClass("visible");
		}
		else if(Sink.isMobile()){
			$(Sink.body).addClass(Sink.mobilecls);
			$(".view_button").addClass("visible");
		}
		else if(Sink.isTablette()){
		
			////////////////////////////////////////////////
			//
			//TODO - implement tablette recocgnizing
			//
			////////////////////////////////////////////////		
			$(Sink.body).addClass(Sink.screencls);
			$(".view_button").removeClass("visible");
			$("#card-"+sink.currentCard.id).addClass("visible");
		}
	
	};
	

};
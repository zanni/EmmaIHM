/*************************************************************/
/*
	jqtouch init 

*/
var jQT = new $.jQTouch({
                icon: 'jqtouch.png',
                addGlossToIcon: false,
                startupScreen: 'jqt_startup.png',
                statusBar: 'black',
                fullscreen: true, 
                fixedViewport:true,
            	slideSelector: "body > * > ul li:not(.leaf) a",
            	touchSelector: "body > * > ul li:not(.leaf) a",
            //	useAnimations:false,
                
});
/*************************************************************/

Sink.init = function(){

	//Sink.renderer.selected = Sink.renderer.provider.get("jquery");
	
	Sink.root.render("view");
	Sink.root.render("card");
	
	Sink.root.display("card");
	Sink.root.display("view");
	
	
	Sink.currentView = Sink.root;
	Sink.currentCard = Sink.root;

	
	if(Sink.isScreen()){
		//Sink.renderer.selected.addClass(Sink.body, Sink.screencls);
		$(Sink.body).addClass(Sink.screencls);
	}
	else if(Sink.isTablette()){
		$(Sink.body).addClass(Sink.tablettecls);
		//Sink.renderer.selected.addClass(Sink.body, Sink.tablettecls);
	}
	else if(Sink.isMobile()){
		$(Sink.body).addClass(Sink.mobilecls);
		//Sink.renderer.selected.addClass(Sink.body, Sink.mobilecls);
	}
	
	var xMax = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var yMax = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	$(Sink.body).css({"height":yMax,"width":xMax});
	
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

	
	Sink.initCoreEvents();
	
};
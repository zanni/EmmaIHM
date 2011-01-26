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
                
});

$(function(){

	
	
	
	
	
			
});
/*************************************************************/
/*************************************************************/
/*
	sink root declaration & init
	
	input :
	
		spec = {
			id : {id},
			parent : {parent},
			children : [...],
			loadChild : function(component){...},
						
			card : {card},
			renderView : callback
			renderCard : callback
			
			renderer : {renderer},
			comm : {comm},
			controler : {controler},
			
		}
*/
/*************************************************************/

Sink.init = function(spec){
	Sink.linkcls = spec.linkcls || "link";
	Sink.viewcls = spec.viewcls || "view";
	Sink.cardcls = spec.cardcls || "card";
	
	Sink.body = spec.body || "body";
	
	Sink.mobilecls = spec.mobilecls || "mobile";
	Sink.tablettecls = spec.tablettecls || "tablette";
	Sink.screencls = spec.screencls || "screen";
	
	Sink.mobilemaxwidth = spec.mobilemaxwidth || 800;
	
	Sink.root = spec.root;
	
	//try{
		
		Sink.comm.selected = Sink.comm.provider.get(spec.comm.name);
		Sink.renderer.selected = Sink.renderer.provider.get(spec.renderer);
		
		
		Sink.controler.selected = Sink.controler.provider.get(spec.controler);	
		Sink.controler.selected.init(spec.comm);
		
		//need child loaded i.e controler init
		Sink.root.render("view");
		Sink.root.render("card");
		
		Sink.root.display("card");
		Sink.root.display("view");
		
		
		Sink.currentView = Sink.root;
		Sink.currentCard = Sink.root;
		
		
		/*	
		
	}catch(err){
		console.log(err);
	}*/
	
	if(Sink.isScreen()){
		Sink.renderer.selected.addClass(Sink.body, Sink.screencls);
	}
	else if(Sink.isTablette()){
		Sink.renderer.selected.addClass(Sink.body, Sink.tablettecls);
	}
	else if(Sink.isMobile()){
		Sink.renderer.selected.addClass(Sink.body, Sink.mobilecls);
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
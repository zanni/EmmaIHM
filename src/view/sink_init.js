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
                backSelector: '.back, .goback',
                initializeTouch: 'li.composite a, li.leaf p, .touch',
                slideSelector: 'li.composite a, .touch',
                
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
	
	Sink.root = spec.root;
	
	try{
		
		Sink.widget.provider.get("view").init();
		//Sink.comm.selected = Sink.comm.provider.get(spec.comm);
		Sink.renderer.selected = Sink.renderer.provider.get(spec.renderer);
		
		
		//var controler = Sink.controler.provider.get(spec.controler);	
		//controler.init();
		
		//Sink.root.render("card");
		//need child loaded i.e controler init
		Sink.root.render("view");
		//Sink.root.display("view");
		//Sink.root.display("card");
		
		//Sink.currentView = Sink.root;
		
		
			
		
	}catch(err){
		console.log(err);
	}
	
	
	
};
/*
*
*	UIComponent.toolbar 
*	input : 
*		{
*			name:"name",
*			items:[UIComponent.button(...), ...], //array of HTML elements
*		}
*
*/
UIComponent.toolbar = function(spec){

	var that = UIComponent.component();
	
	that.name = spec.name || "";
	that.items = spec.items;
	
	that.render = function(){
		var render = "";
		render += "<div class='toolbar'><h1>"+that.name+"</h1>";
		//loop on that.items to add elements to toolbar
		var nav_button = [];
		var cls = "view_button";
		if(Sink.view_visible){
			cls += " visible";
		}
		render += UIComponent.button({
					name : "view",
					style : "add",
					cls : cls,
		}).render();
		
		
		
		if(that.items){
			for(var i=0; i<that.items.length;i++){
				if(that.items[i].render) render += that.items[i].render();
				else render += that.items[i];
			}
		}
		
		render += "</div>";
		return render;
	};
	
	return that;
};
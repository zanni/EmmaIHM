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
UIComponent.toolbar = function(){

	var that = UIComponent.component();
	
	that.render = function(spec){
		var render = "";
		render += "<div class='toolbar'><h1>"+spec.name+"</h1>";
		//loop on spec.items to add elements to toolbar
		var nav_button = [];
		var cls = "navigation_button";
		
		
		if(Sink.view_visible){
			cls += " visible";
		}
		
		
		render += UIComponent.button({
					name : "navigation",
					style : "add",
					cls : cls,
		});
		
		
		
		if(spec.items){
			for(var i=0; i<spec.items.length;i++){
				render += spec.items[i];
			}
		}
		
		render += "</div>";
		return render;
	};
	
	return that;
};
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
UIComponent.slider = function(spec){

	var that = {};
	
	that.id = spec.id;
	
	that.render = function(){
		var render = "";
		render += "<div id='"+that.id+"' class='dragdealer rounded-cornered'>";
		render += "<div class='red-bar handle' style='left: 400px; '>drag me</div>";
		render += "</div>";
		return render;
	};
	
	return that;
};


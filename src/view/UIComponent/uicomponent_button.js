/*
*
*	UIComponent.button 
*	input : 
*		{
*			href:"id",
*			name:"name",
*			style:"style",
*			cls : "cls",
*		}
*
*/
UIComponent.button = function(spec){

	var that = UIComponent.component();
	
	that.href = spec.href;
	that.name = spec.name;
	that.style = spec.style;
	that.cls = spec.cls;
	
	that.render = function(){
		var href = "";
		var cls= "";
		var id = "";
	
		
		if(that.href) {
			href = "href='#"+that.href+"'";
			id = "id='link-"+that.href+"'";
		}
		if(that.style || that.cls) cls= "class='"+that.style +" "+that.cls+"'";
		
		
		
		return "<a "+id+" "+href+" "+cls+">"+that.name+"</a>";
	};
	
	return that;
};
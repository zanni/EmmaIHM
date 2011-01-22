/*
*
*	UIComponent.button 
*	input : 
*		{
*			href:"id",
*			name:"name",
*			style:"style",
*			cls : "cls",
*			callback:function(){}
*		}
*
*/
UIComponent.card = function(){

	var that = UIComponent.component();
	
	that.render = function(spec){
		var href = "";
		var cls= "";
		var balise = "a";
		var id = "";
	
		
		if(spec.href) {
			href = "href='#"+spec.href+"'";
			id = "id='link-"+spec.href+"'";
		}
		if(spec.style || spec.cls) cls= "class='"+spec.style +" "+spec.cls+"'";
		
		
		
		return "<"+balise+" "+id+" "+href+" "+cls+">"+spec.name+"</"+balise+">";
	};
	
	return that;
};
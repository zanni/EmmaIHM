/*
*
*	UIComponent.link
*	input : 
*		{
*			id:"id",
*			name:"name",
*			leaf:true/false,
*			style:"style",
*			ico:"path_to_ico",
*			item:{item},
*		}
*
*/
UIComponent.link = function(){

	var that = UIComponent.component();
	
	that.render = function(spec){
		var ico = "";
		var temp = "";
		for(var i in spec.item) temp+=spec.item[i];
		
		if(spec.ico) ico = "src='"+spec.ico+"'";
		if(spec.leaf) return "<li id='link-"+spec.id+"' class='"+spec.style+" leaf"+"'><a id='link-"+spec.id+"'><img "+ico+"></img><span>"+spec.name+"</span></a>"+temp+"</li>";
		
		
		else return "<li id='link-"+spec.id+"' class='"+spec.style+" composite"+"'><a id='link-"+spec.id+"' href='#"+spec.id+"'><img src='"+spec.ico+"'></img><span>"+spec.name+"</span></a></li>";
	};
	
	return that;
};
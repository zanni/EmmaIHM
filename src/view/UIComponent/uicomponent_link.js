/*
*
*	UIComponent.link
*	input : 
*		{
*			id:"id",
*			name:"name",
*			style:"style",
*			ico:"path_to_ico",
*			item:{item},
*		}
*
*/
UIComponent.link = function(spec){

	var that = UIComponent.component();
	that.id = spec.id;
	that.name = spec.name;
	that.style = spec.style;
	that.ico = spec.ico;
	that.items = spec.items;
	that.leaf = spec.leaf;
	that.cls = spec.cls 
	that.render = function(){
		var ico = "";
		var temp = "";
		if(that.items){
			for(var i=0;i<that.items.length;i++){
				if(that.items[i].render) temp += that.items[i].render();
				else temp += that.items[i];
			}
		}
		
		if(that.ico) ico = "src='"+that.ico+"'";
		var href = "";
		var cls = "";
		if(!that.leaf){
			 href = " href='#"+that.id+"' ";
		}
		else cls = "leaf";
		
		if(that.cls) cls+= " "+that.cls;
	
	var link = "<li class='"+that.style+" "+cls+"'><a id='link-"+that.id+"' "+href+"><img "+ico+"></img><span>"+that.name+"</span></a>"+temp+"</li>";
		
		return link;
	};
	
	return that;
};
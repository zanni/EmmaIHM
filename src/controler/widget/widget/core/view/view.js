var view = function(){
	var that = new Sink.widget.interface();
	
	that.init = function(){
		/*
		var name = "view";
		var url = Sink.widget.uri+name+"/"+name;
		$.ajax({
				url:url+".css",
				success:function(data){
					 $("<style></style>").appendTo("head").html(data);
			}
		});
		*/
	};
	that.render = function(component){

		var children = component.children;
		var bar_items = [];
		//if component have parent, add back button to navigation bar 
		if(component.parent != null) {
			bar_items.push(
				UIComponent.button({
					href:component.parent.id,
					name:component.parent.name,
					style:"back",
			}).render());
		}
	
		
		//create navigation list 
		var item;
		var list_items = [];
		if(children){
			for(var i=0;i<children.length;i++){
				if(children[i].renderLink ){
					
					list_items.push(
						"<div id='link-"+children[i].id+"'></div>"
					);
					children[i].renderLink(children[i]);
				}
				else {
					item = UIComponent.link({
						id:children[i].id,
						name:children[i].name,
						style:children[i].link_style,
						ico:children[i].ico,
					}).render();
					list_items.push(
						item
					);
				}			
			}
		}
		//add title of current card to the navigation view
		/*
		var name = "";
		if(!Sink.isScreen() && Sink.currentCard){
			name = Sink.currentCard.name;
		}
		*/
		var component = new UIComponent.view({
			id:component.id,
			style:component.list_style+ " vertical-scroll",
			items:[
				UIComponent.toolbar({
					//name: component.name, 
					items:bar_items,
				}),
				UIComponent.list({
					style:component.list_style,
					items:list_items,
				}),
			],
		});
		
		Sink.renderer.selected.appendHTML(Sink.body,component.render());
		
		if(children){
			for(var i=0;i<children.length;i++){
				if(children[i].renderLink ){
					children[i].renderLink(children[i]);
				}
			}
		}
		
	};
	
	that.renderLink = function(component){
		//alert("view widget renderLink: "+component.id);
		//alert("link: "+component.id);
		var link = UIComponent.link({
					id:component.id,
					name:component.name,
					ico:component.ico,
					leaf:component.leaf,
		}).render();
		Sink.renderer.selected.appendHTML("#link-"+component.id, link);
		
	};
	
	that.update = function(component){
		//alert("view widget update: "+component.id);
		if(component.renderView){
			Sink.renderer.selected.removeHTML("#"+component.id);
			component.render("view");
		}
		
	};
	
	return that;
};

Sink.widget.provider.add("view", new view());
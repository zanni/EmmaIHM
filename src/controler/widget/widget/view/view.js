var view = function(){
	var that = new Sink.widget.interface();
	
	that.init = function(){
		var name = "view";
		var url = Sink.widget.uri+name+"/"+name;
		$.ajax({
				url:url+".css",
				success:function(data){
					 $("<style></style>").appendTo("head").html(data);
				}
			});
	};
	that.render = function(component){
		//Sink.renderer.selected.appendHTML()
		
		
		
		/*
		var bar_items = [];
		//if component have parent, add back button to navigation bar 
		if(that.parent != null) {
			//alert("generate :"+that.id+" parent :"+that.parent.id);
			bar_items.push(
				UIComponent.button({
					href:that.parent.id,
					name:that.parent.name,
					style:"back",
			}));
		}
		//if Mobile view, add navigation select to navigation bar 
		
		if(!Sink.isScreen()) {
			$(".navigation_button").addClass("visible");
		
		};
		
		
		//create navigation list 
		var list_items = [];
		for(var i=0;i<that.children.length;i++){
			var item = null;
			if(that.children[i].loadLink && that.children[i].loadLink(that.children[i])) item =  that.children[i].loadLink(that.children[i]);
			else item = UIComponent.list_link({
					id:that.children[i].id,
					name:that.children[i].name,
					leaf:that.children[i].leaf,
					style:that.children[i].link_style,
					ico:that.children[i].ico,
				})
				
			list_items.push(
				item
				
			);
		}
		//add title of current card to the navigation view
		var name = "";
		if(!Sink.isScreenView() && Sink.currentCard){
			name = Sink.currentCard.name;
		}
		*/
		
		var component = new UIComponent.view();
		alert(component.render({
			id:that.id,
			//style:that.list_style+ " vertical-scroll",
			
			
			items:[
				UIComponent.toolbar({
					name: name, 
					//items:bar_items,
				}),
				UIComponent.list({
					//style:that.list_style,
					//items:list_items,
				}),
			],
		}));
		Sink.renderer.selected.appendHTML("body",component.render({
			id:that.id,
			//style:that.list_style+ " vertical-scroll",
			
			
			items:[
				UIComponent.toolbar({
					name: name, 
					//items:bar_items,
				}),
				UIComponent.list({
					//style:that.list_style,
					//items:list_items,
				}),
			],
		}));
		
		
	};
	
	that.renderLink = function(component){
		
	};
	
	that.update = function(component){
	
	};
	
	return that;
};

Sink.widget.provider.add("view", new view());
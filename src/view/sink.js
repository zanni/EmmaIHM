/*
*
* TreeComponent class declaration 
*	input :
*
*	spec = {
*			//properties
*			"id" : {id},
*			"parent" : {parent},
*
*			//static load 
*			"children" : [		
*					sink.MODEL.component,
*			],	
*
*			//dynamic load using controler callback
*			"load" : function(component){
*					component.add(new sink.MODEL.component);
*			},
*	},
*	optional : parent, children, loadChildren
*	
*	methods :
*		
*		//add children 
*		this.add(component);
*
*		//recursive search
*		var component = this.find(id);
*
*		//dynamic children loading
*		this.load();
*
*		//did component load it's children ?
*		that.isLoaded();
*
*
*		
*/


var TreeComponent = function(spec){

	var that  = {};
	
	that.id = spec.id || null;
	that.parent = spec.parent || null;
	that.children = spec.children || [];
	that.loaded = false;
	if(that.children) loaded = true;
		
	that.add = function(component){
		component.parent = that;
		that.children.push(component);
	};
	
	that.find = function(id){
		if(that.id === id) return that;
		for(i in that.children){
			var child = that.children[i].find(id)
			if(child) return child;		
		}		
	};
	
	that.load = function(){
		
		try{
			if(spec.load && !that.isLoaded()){
				spec.load(that);
				that.loaded = true;
			} 
		}
		catch(err){
			console.log(err.description);
		};
		
	};
	
	that.isLoaded = function(){
		return that.loaded;
	}
	
	return that;
};


/*
*
* Sink class declaration 
*	input :
*
*	spec = {
*		"linkcls" : "" - optional,
*		"cardcls" : "" - optional,
*		"viewcls" : "" - optional,
*
*		"appendHTML" : function(html){append(html)},
*		"remove" : function(selector){remove(selector)},
*
*		"root" : Sink.component,
*		
*	},
*	optional : parent, children, loadChildren
*	
*	methods :
*		
*		find(id) : component
*		append(html) 
*		remove(selector)
*
*
*
*		
*/
var Sink = {};


Sink.linkcls =  "link";
Sink.viewcls =  "view";
Sink.cardcls =  "card";

Sink.body =  "body";

Sink.mobilecls =  "mobile";
Sink.tablettecls =  "tablette";
Sink.screencls =  "screen";

Sink.mobilemaxwidth = 800;

Sink.currentCard = null;
Sink.currentView = null;

Sink.root = null;

Sink.find =function(id){
	return Sink.root.find(id);
};

Sink.renderer = null;
Sink.comm = null;

Sink.isScreen = function(){
	var xMax = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var yMax = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	if(xMax >= Sink.mobilemaxwidth) return true;
	else return false;
};
Sink.isMobile = function(){
	return !Sink.isScreen()
};
Sink.isTablette = function(){
	////////////////////////////////////////////////
	//
	//TODO - find a way to recognize tactil input
	//
	////////////////////////////////////////////////
	return false;
	
};


Sink.viewVisible = false;
Sink.isViewVisible = function(){return Sink.viewVisible};



/*
*
* Sink.component class declaration -> extend TreeComponent
*	input :
*
*	spec = {
*			//properties
*			"id" : {id},
*			"parent" : {parent},
*			"name" : {name},
*			"style" : {
*				"link" : {style_link},
*				"view" : {style_view},
*			}
*			"ico" : {path_to_ico},
*
*			//static load 
*			"children" : [		
*					Sink.component,
*			],	
*			"link" : {html_link},
*			"card" : {html_card},
*			"view" : {html_view},
*
*			"data" : {data},
*
*			//dynamic load using controler callback
*			"load" : function(component){
*					component.add(new sink.MODEL.component);
*			},
*			"renderView" : function(renderer){
*				renderer.write(html_view);
*			},
*			"renderLink" : function(renderer){
*				renderer.write(html_link);
*			},
*			"renderCard" : function(renderer){
*				renderer.write(html_card);
*			},
*			"update" : function(id){
*				//update ... 
*			},
*	},
*/


Sink.component = function(spec){

	var that = TreeComponent(spec);
	
	that.name = spec.name || null;
	
	that.style = {};
	if(spec.style){
		that.style.link = spec.style.link || "arrow";
		that.style.view = spec.style.view || "rounded";
	}
	else{
		that.style.link = "arrow";
		that.style.view = "rounded";
	}
	that.ico = spec.ico;
	that.cls = spec.cls;
	that.link = spec.link || null;
	that.view = spec.view || null;
	that.card = spec.card || null;
	
	that.data = spec.data || null;
	
	that.rendered = {};
	that.rendered.link = false;
	that.rendered.card = false;
	that.rendered.view = false;
	
	that.displayed = {};
	that.displayed.link = false;
	that.displayed.card = false;
	that.displayed.view = false;
	
	that.renderLink = spec.renderLink || null;
	that.renderView = spec.renderView || null;
	that.renderCard = spec.renderCard || null;
	
	that.leaf = spec.leaf || false;
	
	
	that.render = function(element){
		//try{
			switch(element){
			
				case "link" : 
					if(that.renderLink)that.renderLink(that);
					that.rendered.link = true;
					break;
					
				case "view" : 
					if(that.renderView) that.renderView(that);
					that.rendered.view = true;
					break;
					
				case "card" : 
					if(that.renderCard) that.renderCard(that);
					that.rendered.card = true;
					break;
			};
		/*		
		}catch(err){
			//console.log(err.message);
		}*/
	};
	
	that.update = function(){
	
		
		//try{
			if(spec.update)spec.update(that);
		/*}catch(err){
			console.log(err.description);
		}*/
	};
	////////////////////////////////////////////////
	//
	//TODO - implement display function with renderer API
	//
	////////////////////////////////////////////////
	
	that.display = function(element){
		
		try{
				
			switch(element){
				case "link" : 
					alert("display link");
					that.displayed.link = true;
					break;
					
				case "view" : 
					/***********************************************
					/*
						view displaying is managed by jqtouch with 
						"current" cls
					*/					
					/**********************************************/
					//Sink.renderer.selected.removeClass(".view.visible", "visible");
					//Sink.renderer.selected.addClass("#"+that.id, "visible");
					that.displayed.view;
					break;
					
				case "card" : 
					$(".card.visible").removeClass( "visible");
					$("#card-"+that.id).addClass( "visible");
					that.displayed.card = true;
					break;
			};
				
		}catch(err){
			console.log(err.description);
		}
	};
	
	that.getId = function(element){
		switch(element){
			case "link" :
				return sink.linkcls+"-"+that.id;
			case "card" :
				return sink.cardcls+"-"+that.id;
			case "view" :
				sink.viewcls+"-"+that.id;
			default :
				return that.id;			
		};
	};
	that.isLoaded = function(){
		return that.loaded;
	};
	that.isRendered = function(element){
		return that.rendered[element];
	};
	that.isDisplayed = function(element){
		return that.displayed[element];
	};
	
	
	
	
	
	
	
	return that;
};


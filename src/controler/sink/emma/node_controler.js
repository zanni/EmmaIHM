	
var ID = "emma_network";
var NAME = "Emma Network";
var TYPE = "node";

var emmaControler = function(){
	var that = new Sink.controler.interface();
	
	that.domain = null;
	that.port = null;
		
	that.type = "node";
	that.get = function(spec){			
		//dépendance comm
		Sink.comm.selected.send({
			url : "http://"+that.domain+":"+that.port+"/node/"+spec.host+"/"+spec.resource,
			method:"GET",
		});			

		//return request;	
	};
	
	that.order = function(spec){
		Sink.comm.selected.send({
			url : "http://"+that.domain+":"+that.port+"/node/"+spec.host+"/"+spec.resource,
			data:spec.data,
			method:"PUT",
		});	
	};
	
	
	that.init = function(spec){
		that.domain = spec.url;
		that.port = spec.port;
		var component = new Sink.component({
			"id" : ID,
			"name" : NAME,
			"ico" : Sink.controler.uri+"emma/resource/ico.png",
			"load" : that.get({
				"host":"*",
				"resource":"*",
			}),
			"renderView":Sink.widget.provider.get("view").render,
			"renderLink":Sink.widget.provider.get("view").renderLink,
			//"renderCard":,
			"update":Sink.widget.provider.get("view").update,
		});
		component.load();
		Sink.root.add(component);
		
		Sink.widget.load("emma_"+"led0");
	};
	that.update = function(message){
		var new_host = false;
		var new_resource = false;
		var hosts = Emma.parser.parseHost(message);
		var controler_root = Sink.find(ID);
		
		for(var i in hosts){
			var host_data = hosts[i];
			var host_id = Emma.helper.getIdFromHost(host_data);
			var host_component = Sink.find(host_id);
			if(host_component){
				var old_resources = host_component.data.resource;
				var resources = host_data.resource;
				for(var j in resources){
					var resource_data = resources[j];
					
					var resource_id = Emma.helper.getIdFromResource(host_data,resource_data);
					var resource_component = Sink.find(resource_id);
					if(resource_component){
						resource_component.data = resource_data;
						resource_component.update(resource_component);
					}
					else{
						resource_component = new Sink.component({
							"id":resource_id,
							"name":resource_id,
							"data":resource_data,
							"ico" : Sink.controler.uri+"emma/resource/emma.png",
							//"renderLink":Sink.widget.provider.get("view").renderLink,
							"renderCard":function(){
							
								Sink.widget.provider.get("card").render(this,"<p>mouai c cool</p>");
								
							},
							
							//"update":,
						});
						that.selectWidget(resource_component, "update");
						that.selectWidget(resource_component, "renderLink");
						host_component.add(resource_component);
						
						resource_component.render("card");
						
						new_resource = true;
					}
					
					
				}
				//host_component.data = host_data;
				host_component.update(host_data);
			}
			else{
				host_component = new Sink.component({
					"id":Emma.helper.getIdFromHost(host_data),
					"name":Emma.helper.getIdFromHost(host_data),
					"data":host_data,
					"ico" : Sink.controler.uri+"emma/resource/green.png",
					//"ico" : Sink.controler.uri+NAME+"/resource/ico.png",
					/*
					"load" : that.get({
						"host":host_data.ip,
						"resource":"*",
					}),
					*/
					//"renderView":that.selectWidget(host_component, "renderView"),
					//"renderLink":that.selectWidget(host_component, "renderLink"),
					//"renderCard":,
					//"update":that.selectWidget(host_component, "update"),
				});
				
				controler_root.add(host_component);
				
				that.selectWidget(host_component, "update");
				that.selectWidget(host_component, "renderLink");
				that.selectWidget(host_component, "renderView");
				
				
				
				new_host = true;
				
				var resources = host_data.resource;
				for(var j in resources){
					var resource_data = resources[j];
					
					var resource_id = Emma.helper.getIdFromResource(host_data,resource_data);
					var resource_component = Sink.find(resource_id);
					if(resource_component){
						resource_component.update(resource_data);
					}
					else{
						resource_component = new Sink.component({
							"id":resource_id,
							"name":resource_data.data.name,
							"data":resource_data,
							"ico" : Sink.controler.uri+"emma/resource/emma.png",
							"leaf":true,
							//"ico" : Sink.controler.uri+NAME+"/resource/ico.png",
							//"renderLink":that.selectWidget(this, "renderLink"),
							//"renderCard":that.selectWidget(this, "renderCard"),
							//"update":that.selectWidget(this, "update"),
							//"update":,
						});
						host_component.add(resource_component);
						that.selectWidget(resource_component, "update");
						that.selectWidget(resource_component, "renderLink");
						
						//that.selectWidget(resource_component, "renderLink");
						
						//alert(resource_component.render("view"));
						//Sink.renderer.selected.appendHTML(Sink.body, resource_component.render("view"));
						
						//resource_component.render("card");
						new_resource = true;
					}
				}
				
				//Sink.renderer.selected.appendHTML(Sink.body, host_component.render("view"));
				host_component.render("view")
			}
			
			if(new_host) controler_root.update();
		}
	};
	
	that.selectWidget = function(component, action){
	
		if(component && component.data){
			var data = component.data;
			if(data.resource){
				//component is an host
				var widget = Sink.widget.provider.get("view");				
			}
			else if(data.log){
				//component is a resource
				if(Sink.widget.provider.has("emma_"+data.data.name)){
					var widget = Sink.widget.provider.get("emma_"+data.data.name);
				}
			}
			if(widget){
				switch(action){
					case "renderLink":component.renderLink = widget.renderLink;break;
					case "renderView":component.renderView = widget.render;break;
					case "renderCard":component.renderCard = widget.render;break;
					case "update":component.update = widget.update;break;
				}
			}
		}
	};
	
	return that;
};

Sink.controler.provider.add(TYPE, new emmaControler());
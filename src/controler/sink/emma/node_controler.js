	
var ID = "emma_network";
var NAME = "Emma Network";
var TYPE = "node";

var emmaControler = function(){
	var that = new Sink.controler.interface();
	
	that.domain = null;
	that.port = null;
		
	that.type = "node";
	that.get = function(spec){	
		/*
		var request = Emma.parser.stringifyRequest({
			"type":"node",
			"host":spec.host,
			"resource":spec.resource,
		});	
		*/
		
		//dépendance comm
		Sink.comm.selected.send({
			url : "http://"+that.domain+":"+that.port+"/node/"+spec.host+"/"+spec.resource,
			method:"GET",
		});			

		//return request;	
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
						resource_component.update(resource_data);
					}
					else{
						resource_component = new Sink.component({
							"id":resource_id,
							"name":resource_id,
							"data":resource_data,
							"ico" : Sink.controler.uri+"emma/resource/emma.png",
							"renderLink":Sink.widget.provider.get("view").renderLink,
							"renderCard":function(){
								Sink.widget.provider.get("card").render(this,"<p>mouai c cool</p>");
							},
							//"update":,
						});
						host_component.add(resource_component);
						
						resource_component.render("card");
						
						new_resource = true;
					}
					
					
				}
				host_component.update();
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
					"renderView":Sink.widget.provider.get("view").render,
					"renderLink":Sink.widget.provider.get("view").renderLink,
					//"renderCard":,
					"update":Sink.widget.provider.get("view").update,
				});
				
				
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
							"name":resource_id,
							"data":resource_data,
							"ico" : Sink.controler.uri+"emma/resource/emma.png",
							"leaf":true,
							//"ico" : Sink.controler.uri+NAME+"/resource/ico.png",
							"renderLink":Sink.widget.provider.get("view").renderLink,
							"renderCard":function(){
								Sink.widget.provider.get("card").render(this,"<p>mouai c cool</p>");
							},
							//"update":,
						});
						host_component.add(resource_component);
						Sink.renderer.selected.appendHTML(Sink.body, resource_component.render("view"));
						
						//resource_component.render("card");
						
					}
				}
				controler_root.add(host_component);
				Sink.renderer.selected.appendHTML(Sink.body, host_component.render("view"));
			}
			
			if(new_host) controler_root.update();
		}
	};
	
	
	
	return that;
};

Sink.controler.provider.add(TYPE, new emmaControler());
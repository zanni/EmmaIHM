	
var ID = "emma_network";
var NAME = "node";
var TYPE = "node";

var emmaControler = function(){
	var that = new Sink.controler.interface();
		
	that.type = "node";
	that.get = function(spec){	
		var request = Emma.parser.stringifyRequest({
			"type":"node",
			"host":spec.host,
			"resource":spec.resource,
		});	
		
		//dépendance comm
		Sink.comm.selected.send(request);			

		//return request;	
	};
	
	
	that.init = function(){
		
		
		var component = new Sink.component({
			"id" : ID,
			"name" : NAME,
			"ico" : Sink.controler.uri+NAME+"/resource/ico.png",
			"load" : that.get({
				"host":"*",
				"resource":"*",
			}),
			"renderView":Sink.widget.provider.get("view").render,
			//"renderLink":,
			//"renderCard":,
			//"update":,
		});
		
		//Sink.root.add(component);
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
				var resources = host[i].resource;
				for(var j in resources){
					var resource_data = resources[j];
					var resource_id = Emma.helper.getIdFromResource(host_data,resource_data);
					var resource_component = Sink.find(id);
					if(resource_component){
						resource_component.update(resource_data);
					}
					else{
						resource_component = new Sink.component({
							"id":id,
							"name":id,
							"data":resource_data,
							//"ico" : Sink.controler.uri+NAME+"/resource/ico.png",
							//"renderLink":,
							//"renderCard":,
							//"update":,
						});
						
						host_component.add(resource_component);
						new_resource = true;
					}
					
					
				}
				host_component.update();
			}
			else{
				host_component = new Sink.component({
					"id":Emma.helper.getIdFromHost(host),
					"name":host.Emma.helper.getIdFromHost(host),
					"data":host_data,
					//"ico" : Sink.controler.uri+NAME+"/resource/ico.png",
					
					"load" : that.get({
						"host":host.ip,
						"resource":"*",
					}),
					//"renderView":,
					//"renderLink":,
					//"renderCard":,
					//"update":,
				});
				
				
				controler_root.add(host_component);
				new_host = true;
			}
			
			if(new_host) controler_root.update();
		}
	};
	
	
	
	return that;
};

Sink.controler.provider.add(TYPE, new emmaControler());
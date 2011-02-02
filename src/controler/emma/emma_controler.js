	
/***********************************************
/*
	comm init
*/


//Simulator proxy
Emma.domain = "localhost";
Emma.port = 8080;
//Ajax comm config -> unidirectional
Emma.comm = Sink.comm.provider.get("CrossDomainAjax");


Emma.id = "emma_network";
Emma.name = "Emma Network";

//Websocket comm config -> bidirectional 
/*
var websocket = new Sink.comm.Websocket({
	domain:Emma.domain,
	port:Emma.port,
});
Sink.comm.provider.add("EmmaWebsocket", websocket);
Emma.comm = Sink.comm.provider.get("EmmaWebsocket");
*/
/***********************************************/

/***********************************************
/*
	widget loading
*/
Emma.widget_path = "src/controler/emma/widget/";

Sink.widget.load(Emma.widget_path+"led0/led0");
Sink.widget.load(Emma.widget_path+"temperature/temperature");
Sink.widget.load(Emma.widget_path+"brightness/brightness");
Sink.widget.load(Emma.widget_path+"home/home");
Sink.widget.load(Emma.widget_path+"PwmLed2/PwmLed2");

/**********************************************/

Emma.updateNode = function(message){
	var new_host = false;
	var new_resource = false;
	var hosts = Emma.parser.parseHost(message);
	var controler_root = Sink.find(Emma.id);
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
						"ico" : "resource/folder/green.png",
						"load" : Emma.get({
							type:"log",
							host:host_data.ip,
							resource:resource_data.data.name,
						}),
						"leaf":true,
					});
					that.selectWidget(resource_component, "update");
					that.selectWidget(resource_component, "renderLink");
					Emma.selectWidget(resource_component, "renderCard");
					host_component.add(resource_component);
					resource_component.render("card");
					new_resource = true;
				}
			}
			host_component.update(host_data);
		}
		else{
			host_component = new Sink.component({
				"id":Emma.helper.getIdFromHost(host_data),
				"name":Emma.helper.getIdFromHost(host_data),
				"data":host_data,
				"ico" : "resource/folder/blue.png",
			});
			controler_root.add(host_component);
			Emma.selectWidget(host_component, "update");
			Emma.selectWidget(host_component, "renderLink");
			Emma.selectWidget(host_component, "renderView");
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
						"ico" : "resource/folder/yellow.png",
						"leaf":true,
						"load" : Emma.get({
							type:"log",
							host:host_data.ip,
							resource:resource_data.data.name,
						}),
					});
					host_component.add(resource_component);
					Emma.selectWidget(resource_component, "update");
					Emma.selectWidget(resource_component, "renderLink");
					Emma.selectWidget(resource_component, "renderCard");
					new_resource = true;
				}
			}
			host_component.render("view")
		}
		if(new_host) controler_root.update();
	}
};

Emma.selectWidget = function(component, action){

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

Emma.updateLog = function(message){

	var hosts = Emma.parser.parseLog(message);
	for(var i in hosts){
		//get host id from is ip
		var id = hosts[i].ip.replace(new RegExp(':', 'gi'),"-")
						 .replace(new RegExp('::', 'gi'),"--")
						 .replace(new RegExp('{|}','gi'),"");
												
							
		var component = Sink.find(id);

		if(component){
			for(var j in hosts[i].resource){
				var resource_data = hosts[i].resource[j];
				var resource = Sink.find(id+"-"+resource_data.data.name);
				
				if(resource){
				
					resource.data.log = resource_data.log;
					
					//Emma.WIDGET.provider.getService("chart");
					
				}
				else{
					//alert("log : can't find resource : "+id+"-"+resource_data.name);
				}
			}
		}
		else{
			//alert("log : can't find host : "+id);
		}
		
	}
};

Emma.updateData = function(message){
	var host = Emma.parser.parseData(message);

	var id = host.ip.replace(new RegExp(':', 'gi'),"-")
						 .replace(new RegExp('::', 'gi'),"--")
						 .replace(new RegExp('{|}','gi'),"");
	
	var component = sink.find(id);
	if(component){					 
		for(var i in host.resource){
		
			var resource = Sink.find(id+"-"+resource_data.name);
			var log = host.resource[i].log.pop();
			if(resource){
				resource.data.data.value = log.value;
				resource.data.data.log.push(log);
				//resource.refresh();
			}
			else{
				alert("data : can't find resource : "+id+"-"+resource_data.name);
			}
		}
	}
	else{
		alert("data : can't find host : "+id);
	}
};

var success = function(json){
	var model = JSON.parse(json);
	if(model.message){
		var message = model.message[1];
		if(message && message.type){
			switch(message.type){
				case "node" : 
						Emma.updateNode(message);
						break;
				case "log" :
						Emma.updateLog(message);
						break;
				case "data" :
						Emma.updateData(message);
						break;
			};
		  	
	  	}
	}

};
Emma.get = function(spec){			
	Emma.comm.send({
		url : "http://"+Emma.domain+":"+Emma.port+"/"+spec.type+"/"+spec.host+"/"+spec.resource,
		method:"GET",
		success: success,
	});
};

Emma.order = function(spec){
	Emma.comm.send({
		url : "http://"+Emma.domain+":"+Emma.port+"/node/"+spec.host+"/"+spec.resource,
		data:spec.data,
		method:"PUT",
		success: success,
	});	
};
	


/**********************************************/

var emmaControler = function(){
	
	
	var that = {};
	
	
	/***********************************************
	/*
		init Sink
	*/
	
	var sink = new Sink.component({
		"id":"home",
		"name":"Home",
		"renderView":Sink.widget.provider.get("view").render,
	
		"renderCard":Sink.widget.provider.get("home").render,
		//"renderLink":function(){alert("renderLink");},
	});
					
	Sink.root = sink;
	
	/**********************************************/
	/***********************************************
	/*
		init controler root
	*/
				

		//return request;	
	var component = new Sink.component({
		id : Emma.id,
		name : Emma.name,
		ico : "resource/folder/orange.png",
		load : Emma.get({
			type:"node",
			host:"*",
			resource:"*",
		}),
		"renderView":Sink.widget.provider.get("view").render,
		"renderLink":Sink.widget.provider.get("view").renderLink,
		//"renderCard":,
		"update":Sink.widget.provider.get("view").update,
	});
	component.load();	
	Sink.root.add(component);
	
	
	/**********************************************/
	
	////////////////////////////////////////////////
	//
	//TODO - deal with static widget loading
	//
	////////////////////////////////////////////////
	
	
	//Sink.widget.load("itunes/itunes");
	
	Sink.init();

	
	
	
	return that;
	
};

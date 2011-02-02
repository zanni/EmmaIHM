	
/***********************************************
/*
	comm init
*/

var service = {};
//Simulator proxy
service.domain = "localhost";
service.port = 8081;
//Ajax comm config -> unidirectional
service.comm = Sink.comm.provider.get("CrossDomainAjax");


service.id = "service_network";
service.name = "service Network";

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
service.widget_path = "src/controler/service/widget/";

Sink.widget.load(service.widget_path+"itunes/itunes");

/**********************************************/

service.updateNode = function(message){
	var new_host = false;
	var new_resource = false;
	var hosts = Emma.parser.parseHost(message);
	var controler_root = Sink.find(service.id);
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
						
						"leaf":true,
					});
					service.selectWidget(resource_component, "update");
					service.selectWidget(resource_component, "renderLink");
					service.selectWidget(resource_component, "renderCard");
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
			service.selectWidget(host_component, "update");
			service.selectWidget(host_component, "renderLink");
			service.selectWidget(host_component, "renderView");
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
					
					});
					host_component.add(resource_component);
					service.selectWidget(resource_component, "update");
					service.selectWidget(resource_component, "renderLink");
					service.selectWidget(resource_component, "renderCard");
					new_resource = true;
				}
			}
			host_component.render("view")
		}
		if(new_host) controler_root.update();
	}
};

service.selectWidget = function(component, action){

	if(component && component.data){
		var data = component.data;
		if(data.resource){
			//component is an host
			var widget = Sink.widget.provider.get("view");				
		}
		else if(data.log){
			//component is a resource
			if(Sink.widget.provider.has("service_"+data.data.name)){
				var widget = Sink.widget.provider.get("service_"+data.data.name);
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

service.success = function(json){
	var model = JSON.parse(json);
	if(model.message){
		var message = model.message[1];
		if(message && message.type){
			switch(message.type){
				case "node" : 
						service.updateNode(message);
						break;

			};
		  	
	  	}
	}

};
service.get = function(spec){	
	service.comm.send({
		url : "http://"+service.domain+":"+service.port+"/"+spec.type+"/"+spec.host+"/"+spec.resource,
		method:"GET",
		success: service.success,
	});
};

service.order = function(spec){
	service.comm.send({
		url : "http://"+service.domain+":"+service.port+"/node/"+spec.host+"/"+spec.resource,
		data:spec.data,
		method:"PUT",
		success: service.success,
	});	
};
	


/**********************************************/

var serviceControler = function(){
	
	
	var that = {};
	
	
	/***********************************************
	/*
		init controler root
	*/
				

		//return request;	
	var component = new Sink.component({
		id : service.id,
		name : service.name,
		ico : "resource/folder/orange.png",
		load : service.get({
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
	
	

	
	
	
	return that;
	
};

Emma.parser = {};

Emma.parser.parseHost = function(json){

	var hosts = [];
	var model = json;
	for(var i=0;i<model.payload.length;i++) {
		//instanciate an host
		var host = new Emma.host({
			ip:model.payload[i].Host,
		});		
		//for each resource
		for(var j=0;j<model.payload[i].ressources.length;j++){
			
			var text = "";
			//get data
			//alert(model.payload[i].ressources[j].name);
			if(model.payload[i].ressources[j].data){
				var name = model.payload[i].ressources[j].name;
				var uri,data,meta,status,report;
				//status and report resources are saved in host object
				if(name === "status") host.status = model.payload[i].ressources[j].value;	
				else if(name === "report") host.report = model.payload[i].ressources[j].data;
				else {
					//iterate on each element of data array (fu data representation!)
					for(var child in model.payload[i].ressources[j].data){
						//if has uri property, save uri property
						if(model.payload[i].ressources[j].data[child].uri)
							uri = model.payload[i].ressources[j].data[child].uri;
						//and so on ...	
						if(model.payload[i].ressources[j].data[child].data)
							data = model.payload[i].ressources[j].data[child].data;
						if(model.payload[i].ressources[j].data[child].meta)
							meta = model.payload[i].ressources[j].data[child].meta;											
					}
					//if all needed properties have been found
					if(name && uri && data && meta){
						//instanciate resource object
						var resource = new Emma.resource({
							
							uri:uri,
							data:data,
							meta:meta,
						});
						host.resource.push(resource);
					}
				} 
			}	
		}	
		hosts.push(host);
	}
	return hosts;
};

Emma.parser.parseMessage = function(json){
	if(json.message){
		return JSON.parse(json.message[1]);
	}
};

Emma.parser.parseLog = function(json){
	var model = json;
	var hosts = [];
	for(var i=0;i<model.payload.length;i++) {
		//instanciate an host
		var host = new Emma.host({
			ip:model.payload[i].Host,
		});
		
		for(var j=0;j<model.payload[i].ressources.length;j++){
			var resource = new Emma.resource({
				data:{
					name:model.payload[i].ressources[j].name,
				},
			});
			for(var k=0;k<model.payload[i].ressources[j].log.length;k++){
				resource.log.push(new Emma.log({
					date: model.payload[i].ressources[j].log[k].date,
					value: model.payload[i].ressources[j].log[k].value
				}));
			}
			
			host.resource.push(resource);
		}	
		hosts.push(host);
	}
	return hosts;
};

Emma.parser.parseData = function(){
	var model = JSON.parse(json);
	var date = model.date;
	var host = new Emma.host({
		ip:model.headers.x_real_ip,
	});
	for(var i=0;i<model.payload.length;i++) {
		var resource = new Emma.resource({
			name:model.payload[i].name,
		});
		
		var log = new Emma.log({
			date: date,
			value : model.payload[i].value,
		});
		
		resource.log.push(log);
		host.resource.push(resource);
	}
	return host;
};

Emma.parser.stringifyRequest = function(spec){
	
	var payload = {};
	
	var type = spec.type || null;
	payload.host = spec.host;
	payload.ressources = spec.resource;
	
	payload = JSON.stringify(payload);
	
	var request = '{"type":"'+type+'","payload":'+payload+'}';
	//return for testing
	return request;
};

Emma.parser.stringifyOrder = function(spec){
	
	var payload = {};
	
	var type = "order";
	payload.host = spec.host;
	payload.uri =spec.uri;
	payload.method = spec.method;
	payload.body = spec.body;
	
	payload = JSON.stringify(payload);
	
	var order = '{"type":"'+type+'","payload":'+payload+'}';
	
	return order;
};
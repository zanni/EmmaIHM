Emma.helper = {};

Emma.helper.getIdFromHost = function(host){
		return ip.replace(new RegExp(':', 'gi'),"-")
							 .replace(new RegExp('::', 'gi'),"--")
							 .replace(new RegExp('{|}','gi'),"");
};

Emma.helper.getIdFromResource = function(host, resource){
	return Emma.helper.getIdFromHost(host)+"-"+resource.type;
}


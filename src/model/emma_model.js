var Emma = {};

/*
*
* Emma.host class declaration -> extend Sink.component
*	input :
*
*	spec = {
*			"ip" : {ip},
*			"report" : {report},
*			"status" : {status},
*			"resource" : [Emma.resource(), ...]
*	},
*/
Emma.host = function(spec){
	
	var that = {};
	
	that.ip = spec.ip || null;
	that.report = spec.report || null;
	that.status = spec.status || null;
	
	that.resource = spec.resource || [];
	
	return that;
}; 


/*
*
* Emma.host class declaration -> extend Sink.component
*	input :
*
*	spec = {
*			"type" : {type},
*			"uri" : {uri},
*			"data" : {data},
*			"meta" : {meta},
¬			"log" : [Sink.log],
*	},
*/
Emma.resource = function(spec){
	var that = {};
	
	that.type = spec.type || null;
	
	that.uri = spec.uri || null;
	that.data = spec.data || null;
	that.meta = spec.meta || null;
	
	that.log = spec.log || null;
	
	return that;
};

/*
*
* Emma.log class declaration 
*	input :
*
*	spec = {
*			"date" : {date},
*			"value" : {value},
*	},
*/

Emma.log = function(spec){
	var that  = {};
	
	that.date = spec.date || null;
	that.value = spec.value || null;
	
	return that;
};
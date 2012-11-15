dojo.provide("cs.lib.evrythng.services.init");

var proxyUrl = cs.config.evrythng.proxyUrl;
var thngUrl = proxyUrl + "/thngs/" + cs.config.evrythng.thng;
var evrythngMessage = "EVRYTHNG -- ";

//alert(thngUrl);
/**
 * Read a property from the API
 */
cs.componentContainer.push({
	name : "cs.evrythng.properties.read",
	description : "Reads a property from the EVRYTHNG API.",
	inputs :
	[
	{
		name: "Name of the property",
		type: "cs.type.String"
	}
	],
	outputs:
	[
	{
		name: "value",
		type: "cs.type.String"
	}
	],
	image: "evrythng/evrythng-square.png",
	exec : function(state){
		var propertyName = state.inputs.item(0).getValue();
		var endPointUrl = thngUrl + "/properties/" + propertyName + "?access_token=" + cs.config.evrythng.key;
		this.setAsync();
		var compo = this;
		$.ajax({
			beforeSend: function(xhrObj){
				xhrObj.setRequestHeader("Accept","application/javascript");
				xhrObj.setRequestHeader("Authorization", cs.config.evrythng.key);
			},
			url: endPointUrl,
			type: "GET",
			dataType: "json",
			success: function(result){
				// transform result into JSON
				state.outputs.item(0).setValue(result[0].value);
				compo.finishAsync();
			},
			error: function(msg){
				compo.finishAsync();
				console.log(evrythngMessage + "Error on: " + endPointUrl);
				console.log(msg);
			}
		});

	}
});


/**
 * Update a property from the API
 */
cs.componentContainer.push({
	name : "cs.evrythng.properties.update",
	description : "Updates a property from the EVRYTHNG API.",
	inputs :
	[
	{
		name: "Name of the property",
		type: "cs.type.String"
	},
	{
		name: "Value of the property",
		type: "cs.type.String"
	}
	],
	outputs:
	[
	{
		name: "result (ok or error)",
		type: "cs.type.String"
	}
	],
	image: "evrythng/evrythng-square.png",
	exec : function(state){
		this.setAsync();
		var compo = this;
		
		var propertyName = state.inputs.item(0).getValue();
		var endPointUrl = thngUrl + "/properties/" + propertyName + "?access_token=" + cs.config.evrythng.key;
		var payload = [{
			"value" : state.inputs.item(1).getValue()
		}];
		payload = JSON.stringify(payload);

		$.ajax({
			beforeSend: function(xhrObj){
				xhrObj.setRequestHeader("Content-Type","application/json");
				xhrObj.setRequestHeader("Accept","application/json");
				xhrObj.setRequestHeader("Authorization", cs.config.evrythng.key);
			},
			url: endPointUrl,
			type: "PUT",
			data: payload,
			dataType: "json",
			success: function(result){
				state.outputs.item(0).setValue("ok");
				compo.finishAsync();
			},
			error: function(msg){
				compo.finishAsync();
				state.outputs.item(0).setValue("error");
				console.log(evrythngMessage + "Error on: " + endPointUrl);
				console.log(msg);
				
			}
		});
	}
});
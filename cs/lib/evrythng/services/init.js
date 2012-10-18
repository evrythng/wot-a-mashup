dojo.provide("cs.lib.evrythng.services.init");

var proxyUrl = "http://localhost:8001";
var apiKeyGlobal = "KEY";
var thngId = "50769af8e4b0a4cecca9b83b" // "507e77ace4b0cc3d15e38212"; // Local
var thngStoreUrl = proxyUrl + "/thngs/" + thngId;
var evrythngMessage = "EVRYTHNG -- ";

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
		var endPointUrl = thngStoreUrl + "/properties/" + propertyName + "?access_token=" + apiKeyGlobal;
		this.setAsync();
		var compo = this;
		$.ajax({
			beforeSend: function(xhrObj){
				xhrObj.setRequestHeader("Accept","application/javascript");
				xhrObj.setRequestHeader("Authorization", apiKeyGlobal);
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
		var endPointUrl = thngStoreUrl + "/properties/" + propertyName + "?access_token=" + apiKeyGlobal;
		var payload = [{"value" : state.inputs.item(1).getValue()}];
		payload = JSON.stringify(payload);

		$.ajax({
			beforeSend: function(xhrObj){
				xhrObj.setRequestHeader("Content-Type","application/json");
				xhrObj.setRequestHeader("Accept","application/json");
				xhrObj.setRequestHeader("Authorization", apiKeyGlobal);
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

/**
 * Search for tweets
 */
cs.componentContainer.push({
	name : "cs.evrythng.demo.twitter",
	description : "Get the number of tweets for EVRYTHNG",
	inputs :
	[
	{
		name: "Keyword to look for",
		type: "cs.type.String"
	}
	],
	outputs:
	[
	{
		name: "Number of tweets found",
		type: "cs.type.Number"
	}
	],
	image: "evrythng/twitter.png",
	exec : function(state){
		var propertyName = state.inputs.item(0).getValue();
		var endPointUrl = proxyUrl + "/tweets";
		alert(endPointUrl);
		this.setAsync();
		var compo = this;
		$.ajax({
			url: endPointUrl,
			type: "GET",
			dataType: "json",
			success: function(result){
				state.outputs.item(0).setValue(result.numberOfTweets);
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
 * This orders a coffee from the Thng-Coffee-Machine
 */
cs.componentContainer.push({
	name : "cs.evrythng.demo.coffee",
	description : "Orders a coffee from the connected Coffee-Machine",
	inputs :
	[
	{
		name: "Name of the coffee drinker",
		type: "cs.type.String"
	},
	{
		name: "Type of coffee (espresso | coffee)",
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
	image: "evrythng/coffee-machine.png",
	exec : function(state){
		this.setAsync();
		var compo = this;
		
		var propertyName = state.inputs.item(0).getValue();
		var endPointUrl = thngStoreUrl + "/properties/cmd?access_token=" + apiKeyGlobal;
		var payload = [{"value" : state.inputs.item(1).getValue()}];
		payload = JSON.stringify(payload);

		$.ajax({
			beforeSend: function(xhrObj){
				xhrObj.setRequestHeader("Content-Type","application/json");
				xhrObj.setRequestHeader("Accept","application/json");
				xhrObj.setRequestHeader("Authorization", apiKeyGlobal);
			},
			url: endPointUrl,
			type: "PUT",
			data: payload,
			dataType: "json",
			success: function(result){
				state.outputs.item(0).setValue("Now serving coffee for " + state.inputs.item(0).getValue());
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
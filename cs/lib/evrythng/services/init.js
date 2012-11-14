dojo.provide("cs.lib.evrythng.services.init");

var proxyUrl = "http://localhost:8001";
var coffeeMachineId = "50812fcfe4b0a4cecca9b847" // "507e77ace4b0cc3d15e38212"; // Local
var coffeeMachineUrl = proxyUrl + "/thngs/" + coffeeMachineId;

var checkinId = "50812e22e4b0a4cecca9b845";
var checkinUrl = proxyUrl + "/thngs/" + checkinId;

var spotId = "50812b69e4b0a4cecca9b843";
var spotUrl = proxyUrl + "/thngs/" + spotId;

var webcamUrl = proxyUrl + "/RestfulCamService/webcam/snapshot";

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
		var endPointUrl = coffeeMachineUrl + "/properties/" + propertyName + "?access_token=" + cs.config.evrythng.key;
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
		var endPointUrl = coffeeMachineUrl + "/properties/" + propertyName + "?access_token=" + cs.config.evrythng.key;
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

/**
 * Search for tweets
 */
cs.componentContainer.push({
	name : "cs.evrythng.demo.twitter",
	description : "Get the number of tweets for EVRYTHNG",
	inputs :
	[
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
		var endPointUrl = proxyUrl + "/tweets";
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
		
		var endPointUrl = coffeeMachineUrl + "/properties/cmd?access_token=" + cs.config.evrythng.key;
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

/**
 * This redeems a checkin
 */
cs.componentContainer.push({
	name : "cs.evrythng.demo.redeem",
	description : "Redeems a checkin.",
	inputs :
	[
	{
		name: "Name of the property to update",
		type: "cs.type.String"
	}
	],
	outputs:
	[
	{
		name: "result",
		type: "cs.type.String"
	}
	],
	image: "evrythng/redeem.png",
	exec : function(state){
		this.setAsync();
		var compo = this;
		
		var propertyName = state.inputs.item(0).getValue();
		var endPointUrl = checkinUrl + "/properties/" + propertyName + "?access_token=" + cs.config.evrythng.key;
		var payload = [{
			"value" : "empty"
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
				state.outputs.item(0).setValue("Points redeemed!");
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
 * Get a checkin
 */
cs.componentContainer.push({
	name : "cs.evrythng.demo.checkin",
	description : "Gets a checkin",
	inputs :
	[
	{
		name: "Name of the checkin",
		type: "cs.type.String"
	}
	],
	outputs:
	[
	{
		name: "Name of the person who checked in",
		type: "cs.type.String"
	}
	],
	image: "evrythng/checkin.png",
	exec : function(state){
		var propertyName = state.inputs.item(0).getValue();
		
		var endPointUrl = checkinUrl + "/properties/" + propertyName + "?access_token=" + cs.config.evrythng.key;
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
 * Get data from the SunSpot
 */
cs.componentContainer.push({
	name : "cs.evrythng.demo.sunspot",
	description : "Gets sensor data from an EVRYTHNG-connected SunSpot",
	inputs :
	[
	{
		name: "Name of the sensor",
		type: "cs.type.String"
	}
	],
	outputs:
	[
	{
		name: "Value of the sensor",
		type: "cs.type.Number"
	}
	],
	image: "evrythng/spot.png",
	exec : function(state){
		var propertyName = state.inputs.item(0).getValue();
		
		var endPointUrl = spotUrl + "/properties/" + propertyName + "?access_token=" + cs.config.evrythng.key;
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
 * This takes a snapshot from the webcam
 */
cs.componentContainer.push({
	name : "cs.evrythng.demo.webcam",
	description : "Gets a picture from a Webcam and saves it to EVRYTHNG.",
	inputs :
	[
	{
		name: "Name of the picture",
		type: "cs.type.String"
	}
	],
	outputs:
	[
	{
		name: "Image URL",
		type: "cs.type.String"
	}
	],
	image: "evrythng/webcam.png",
	exec : function(state){
		this.setAsync();
		var compo = this;
		
		var endPointUrl = webcamUrl;
		var payload = {
			"fileName" : state.inputs.item(0).getValue()
		};
		payload = JSON.stringify(payload);

		$.ajax({
			beforeSend: function(xhrObj){
				xhrObj.setRequestHeader("Content-Type","application/json");
				xhrObj.setRequestHeader("Accept","application/json");
			},
			url: endPointUrl,
			type: "PUT",
			data: payload,
			dataType: "json",
			success: function(result){
				state.outputs.item(0).setValue(result.snapshotUrl);
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
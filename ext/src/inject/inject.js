chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");

		data_orders_json = JSON.parse($("#order-map-canvas").attr("data-orders"));
		console.log(data_orders_json);

		for (let i = 0; i < data_orders_json.length; i++) {
			const element = data_orders_json[i];
			console.log(`
latitude: ${element.latitude}
longitude: ${element.longitude}
			`);
			
		}
		// ----------------------------------------------------------

	}
	}, 10);
});
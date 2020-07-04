chrome.extension.sendMessage({}, function(response) {
	let readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");

			// data_orders_json = JSON.parse($("#order-map-canvas").attr("data-orders"));
			// console.log(data_orders_json);

			// for (let i = 0; i < data_orders_json.length; i++) {
			// 	const element = data_orders_json[i];
			// 	console.log(`Coordinates: ${element.latitude}, ${element.longitude}`);
			// }

			let orders;

			// setInterval(() => {
				orders = [];
				let allDataOrders = [];
				const statuses = ['placed', 'accepted', 'packed', 'en-route', 'outside'];
				for (const status of statuses) {
					const dataOrders = getDataOrders(status);
					if (dataOrders.length !== 0) 
						allDataOrders = allDataOrders.concat(dataOrders);
				}

				// console.log(allDataOrders);

				for (let i = 0; i < allDataOrders.length; i++) {
					const order = allDataOrders[i];
					orders.push({
						"name" : order[4][order[4].length - 3].data,
						"address" : order[4][order[4].length - 1].data,
						"age" : order[7][0].innerText
					});
				}

				console.log(orders);

				chrome.runtime.sendMessage({type: 'orders', data: orders}, (response) => {
					console.log(response.message);
				});
			// }, 5000);

			// $.ajax({
			// 	url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURI('722 W Southern Ave, Phoenix, AZ 85041')}&destinations=${encodeURI(orders[0].address)}&key=AIzaSyCPKHBXKwYOzVPcv7S9rPU-SUlgvfeivjQ`,
			// 	success: (result) => { console.log(result) }
			// });

			// var xhr = new XMLHttpRequest();
			// xhr.open("GET", `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURI('722 W Southern Ave, Phoenix, AZ 85041')}&destinations=${encodeURI(orders[0].address)}&key=AIzaSyCPKHBXKwYOzVPcv7S9rPU-SUlgvfeivjQ`, true);
			// xhr.onreadystatechange = function() {
			// 	if (xhr.readyState == 4) {
			// 		// JSON.parse does not evaluate the attacker's scripts.
			// 		var resp = JSON.parse(xhr.responseText);
			// 		console.log(resp);
			// 	}
			// }
			// xhr.send();
			// ----------------------------------------------------------
		}
	}, 10);
});

function getDataOrders(status) {
	return $(`tr[data-store-order-status='${status}']`).get().map(function(row) {
		return $(row).find('td').get().map(function(cell) {
		return $(cell).contents();
		});
	});
}
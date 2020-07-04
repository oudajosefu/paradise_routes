//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'orders') {
    let apiKey = 'MY_API_KEY';
    let storeAddress = 'STORE_ADDRESS';
    let orders = request.data;

    // Uncomment for testing purposes:
    // orders = [{name: "John Doe", address: "2130 East Nighthawk Way", age: "6m"}, {name: 'Ashley Dole', address: '2700 North Hayden Road 3083', age: '20m'}];
    // storeAddress = 'Paradise Liquor Mini Mart';
    // apiKey = 'xxx';
    // console.log(JSON.stringify(orders));

    sendResponse({message: 'Received!'});

    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' +
            encodeURI(storeAddress) + '&destinations=' +
            encodeURI(orders[0].address) + '&key=' +
            apiKey,
      success: (result) => { console.log(result); }
      // Use result.rows[0].elements[0].duration.text or ''.value for the duration in minutes or seconds respectively.
      // Use orders[i].address for each address.

      // Algorithm:
      // Request duration for each address from Paradise and append the shortest one to array, request duration for every other address from first address and append shortest one to array.
      // Continue until total duation of route to all addresses is under 60 minutes. Factor in the age of the order in each calculation to make sure longer aged orders have more priority.
    });
  }
});

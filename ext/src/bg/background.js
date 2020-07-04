//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'orders') {
    let orders = request.data;
    // console.log(orders);
    // let orders = [{address: '14423 N 73rd Ln'}];
    sendResponse({message: 'Received!'});

    $.ajax({
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURI('STORE ADDRESS')}&destinations=${encodeURI(orders[0].address)}&key=MY_API_KEY`,
      success: (result) => { console.log(result); }
      // Use result.rows[0].elements[0].duration.text or ''.value for the duration in minutes or seconds
      // Use orders[i].address for each address.
    });
  }
});

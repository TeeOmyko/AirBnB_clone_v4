/**
 * This function updates the display of selected amenities checkboxes
 * and checks the status of an API.
 */
function updateSelectedAmenities () {
	const selectedAmenities = {};

	$('li input:checkbox').on('change', function () {
		if ($(this).is(':checked')) {
			console.log($(this).data('amenity-id'));
			selectedAmenities[$(this).attr('data-amenity-id')] = $(this).attr('data-amenity-name');
		} else if ($(this).not(':checked')) {
			delete selectedAmenities[$(this).attr('data-amenity-id')];
		}
		if (Object.values(selectedAmenities).length === 0) {
			$('div.amenities h4').html(' ');
		} else {
			$('div.amenities h4').text(Object.values(selectedAmenities).join(', '));
		}
	});
	// check the status of the API 
	 $.get({
		 url: 'http://127.0.0.1:5001/api/v1/status/',
		 success: function (data) {
			 if (data.status === 'OK') {
				 $('div#api-status').addClass('available');
			 } else {
				 $('div#api-status').removeClass('available');
			 }
		 }
	 });
	fetchAllPlaces();
}
/**
 * fetchAllPlaces - makes an AJAX POST request to an API to get all places
 * @return: Nothing
 */
function fetchAllPlaces () {
	const $placesSection = $('section.places');

	
	$.post({
		url: 'http://127.0.0.1:5001/api/v1/places_search/',
		headers: {
			'Content-Type': 'Application/json'
		},
		data: '{}',
		success: function (response) {
			// sort the response objects alphabetically
			response.sort((place1, place2) => {
				const name1 = place1.name.toLowerCase();
				const name2 = place2.name.toLowerCase();
				if (name1 < name2) {
					return -1;
				} else if (name1 > name2) {
					return 1;
				}
				return 0;
			});
			console.log(response);
			$.each(response, function (index, place) {
				// Place name and price
				 const $placeName = $('<h2>');
				const $pricePerNight = $('<div>', { class: 'price-per-night' });
				const $titleBox = $('<div>', { class: 'title-box' });
				// Guests information
				 const $placeInformation = $('<div>', { class: 'information' });
				const $maxGuests = $('<div>', { class: 'max-guests' });
				const $numRooms = $('<div>', { class: 'number-rooms' });
				const $numBathrooms = $('<div>', { class: 'number-bathrooms' });
				// Place description
				const $placeOwner = $('<div>', { class: 'owner' });
				const $placeDescription = $('<div>', { class: 'description' });
				const $placeArticle = $('<article>');
				let maxGuests = 0;
				let numRooms = 0;
				let numBathrooms = 0;
				// price and Name of place
				 $placeName.text(place.name).appendTo($titleBox);
				$pricePerNight.text('$' + place.price_by_night).appendTo($titleBox);
				$titleBox.appendTo($placeArticle);
				// Place Information - number of guests, restrooms
				 maxGuests = place.max_guest > 1
					? `${place.max_guest}

const $ = window.$;
$(document).ready(() => {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  const users = {};
  $.getJSON('http://0.0.0.0:5001/api/v1/users', function (data) {
    for (const user of data) {
      users[user.id] = user.first_name + ' ' + user.last_name;
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
      for (const place of Object.values(data)) {
        const article = `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guests</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
        </div>
        <div class="user">
                <b>Owner:</b> ${users[place.user_id]}
              </div>
              <div class="description">
          ${place.description}
              </div>
      </article>`;
        $('.places').append(article);
      }
    }
  });
});

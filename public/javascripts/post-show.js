mapboxgl.accessToken = mapBoxToken;
        
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: post.geometry.coordinates,
    zoom: 5
});

// create a HTML element for our post location/marker
const el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(post.geometry.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
.addTo(map);

// toggle edit review form
$('.toggle-edit-form').on('click', function() {
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    $(this).siblings('.edit-review-form').toggle();
})

// add click listener for clearing of rating from edit/new form
$('.clear-rating').click(function() {
    $(this).siblings('.input-no-rate').click();
});
function InitializeMap(selector) {
  let marker;
  let coordinatesInput = document.getElementById(
    `form-coordinates-${selector}`
  );
  let register_form_area = document.getElementById(
    `register-form-area-${selector}`
  );
  let map = L.map(`form-map-${selector}`, {
    center: [23, 45],
    zoom: 5,
    preferCanvas: true,
    closeButton: false
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  let myIcon = L.icon({
    iconUrl: register_form_area.dataset.src,
    iconSize: [22, 36]
  });

  // Initialize Search On Map

  let geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
  })
    .on("markgeocode", function (e) {
      let latitude = e.geocode.center.lat;
      let longitude = e.geocode.center.lng;
      // Change Inputs Values of Coordinates Input and Address Input
      coordinatesInput.value = changeAddressInputValue(latitude, longitude);
      changeCoordinatesInputSearchValue(latitude, longitude);

      // Check if the map has marker aleady and remove it
      if (!!marker) {
        map.removeLayer(marker);
      }

      // Adding marker to map
      let latlng = e.geocode.center;
      marker = L.marker(latlng, { icon: myIcon })
        .addTo(map)
        .bindPopup(e.geocode.html, {
          className: "search__map__padding"
        })
        .openPopup();
      map.fitBounds(e.geocode.bbox);
    })
    .addTo(map);

  // Initialize Click On Map
  function onMapClick(event) {
    let latitude = event.latlng.lat;
    let longitude = event.latlng.lng;

    // Change Inputs Values of Coordinates Input and Address Input
    coordinatesInput.value = changeAddressInputValue(latitude, longitude);
    changeCoordinatesInputSearchValue(latitude, longitude);

    // Check if the map has marker aleady and remove it
    if (!!marker) {
      map.removeLayer(marker);
    }

    // Adding marker to map
    let latlng = event.latlng;
    let markerHtml;
    let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    jQuery.get(url).then((data) => {
      markerHtml = data.display_name;
      marker = L.marker(latlng, { icon: myIcon })
        .addTo(map)
        .bindPopup(markerHtml, {
          className: "search__map__padding"
        })
        .openPopup();
    });
  }

  function changeAddressInputValue(latitude, longitude) {
    let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    jQuery.get(url, function (data) {
      register_form_area.value = `${data.display_name}`;
      //   register_form_area.setAttribute("value",`${data.display_name}`)
    });
  }

  function changeCoordinatesInputSearchValue(latitude, longitude) {
    coordinatesInput.value = `${latitude}, ${longitude}`;
    coordinatesInput.setAttribute("value", `${latitude}, ${longitude}`);
  }

  map.addEventListener("click", onMapClick);
}

document.querySelectorAll(".nav-pills .nav-link").forEach(function (item, i) {
  item.addEventListener("click", function () {
    InitializeMap(i + 1);
  });
});

InitializeMap(1);

function initializeMap() {
  var map = L.map("mega-map", {
    center: [23, 45],
    zoom: 5,
    preferCanvas: true,
    closeButton: false
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  let marker = L.marker([23, 45])
    .bindPopup(
      `<img src="https://tile.openstreetmap.org" alt="" class="logo-company img-fluid" >`,
      {
        closeButton: false,
        minWidth: 260,
        className: "blue-dot",
        autoPan: false
      }
    )
    .addTo(map);
}

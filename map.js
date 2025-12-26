let map;
let infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.05, lng: 31.33 },
    zoom: 7
  });

  infoWindow = new google.maps.InfoWindow();

  branches.forEach(branch => createMarker(branch));

  setupGeocoder();
}

function createMarker(branch) {
  const icon =
    branch.type === "FIT_FIX"
      ? "http://maps.google.com/mapfiles/kml/paddle/F.png"
      : "http://maps.google.com/mapfiles/kml/paddle/K.png";

  const marker = new google.maps.Marker({
    position: branch.position,
    map,
    icon,
    title: branch.name
  });

  marker.addListener("click", () => {
    infoWindow.setContent(`
      <strong>${branch.name}</strong><br>
      ${branch.address}<br>
      <b>Phone:</b> ${branch.phone}
    `);
    infoWindow.open(map, marker);
  });
}

function setupGeocoder() {
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    const address = document.getElementById("address").value;
    if (!address) return;

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map,
          position: results[0].geometry.location,
          icon: "User_pin.png"
        });
      } else {
        alert("Geocoding failed: " + status);
      }
    });
  });
}

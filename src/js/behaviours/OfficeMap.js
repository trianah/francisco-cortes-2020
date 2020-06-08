import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.KEY = "AIzaSyCXTB3Bp1rEk__Ro3K6JO7OBA8hCXhgCiE";
GoogleMapsLoader.VERSION = "quarterly";

const styles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        lightness: "0"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#a7a7a7"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#737373"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#eaeaea"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#dadada"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#696969"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#b3b3b3"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d6d6d6"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#ffffff"
      },
      {
        weight: 1.8
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d7d7d7"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        color: "#808080"
      },
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#d3d3d3"
      }
    ]
  }
];

function OfficeMap({ node }) {
  const loadMap = () => {
    const { latitude, longitude } = node.dataset;

    const mapOptions = {
      zoom: 16,
      center: new google.maps.LatLng(latitude, longitude),
      styles,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      scrollwheel: false,
      draggable: true,
      disableDefaultUI: true
    };

    const map = new google.maps.Map(node, mapOptions);

    const icon = {
      url: "/dist/svg/map-marker.svg",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(28, 36),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(14, 36)
    };

    // const icon = {
    // 	path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
    // 	fillColor: '#ff4817',
    // 	fillOpacity: 1,
    // 	anchor: new google.maps.Point(0, 0),
    // 	strokeWeight: 0,
    // 	scale: 1
    // }

    return new google.maps.Marker({
      map,
      position: new google.maps.LatLng(latitude, longitude),
      icon,
      draggable: false
    });
  };

  if (typeof google === "undefined") {
    return GoogleMapsLoader.load(loadMap);
  }

  return loadMap();
}

export default OfficeMap;

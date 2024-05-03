import axios from "axios";

const config_route = {
  headers: {
    "Content-Type": "np",
    "X-Goog-Api-Key": "AIzaSyDMoUTcQYZFBK9rGZZeSSPPQf_PYaeyeiE",
    "X-Goog-FieldMask":
      "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
  },
};
export async function computeRoutes(route) {
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
  let body = {
    origin: {
      location: {
        latLng: {
          latitude: route.origin.latitude,
          longitude: route.origin.longitude,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: route.destination.latitude,
          longitude: route.destination.longitude,
        },
      },
    },
    travelMode: "DRIVE",
    languageCode: "en-US",
    units: "IMPERIAL",
  };
  const res = await axios
    .post(url, body, config_route)
    .then((response) => {
      // Extract relevant data and return
      const routes = response.data.routes[0];
      return routes.polyline.encodedPolyline;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error computing routes:", error);
      throw error;
    });
  return res;
}

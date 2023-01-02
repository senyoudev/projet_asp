const baseURL = process.env.REACT_APP_API_URL;

const endpoints = {
  Auth:'api/auth',
  Cars:'api/Voiture',
  Reservations: 'api/Reservation',
  Offres:'api/OffreSpeciale',
  // Add more endpoints here as needed
};

export function getUrl(endpoint) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;
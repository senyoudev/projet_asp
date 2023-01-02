const baseURL = process.env.REACT_APP_API_URL;

const endpoints = {
  Auth:'api/auth',
  Cars:'api/Voiture',
  User:'api/User',
  Reservations: 'api/Reservation',
  Offres:'api/OffreSpeciale',
  brand:'api/Marque'
  // Add more endpoints here as needed
};

export function getUrl(endpoint) {
  return baseURL + endpoints[endpoint];
}

export default endpoints;
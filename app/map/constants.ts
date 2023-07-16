const airLabsAPIKey = process.env.REACT_APP_AIR_LABS_API_KEY
const airLabsBaseURL = `https://airlabs.co/api/v9`

export const flightsURL = `${airLabsBaseURL}/flights?api_key=${airLabsAPIKey}`
export const airportURL = `${airLabsBaseURL}/airports?api_key=${airLabsAPIKey}`

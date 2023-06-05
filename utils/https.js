const BASE_URL = 'https://api.musement.com/api/v3'

export const GetCities = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "X-Musement-Application": "{ applicationValue }",
      "X-Musement-Version": "3.4.0",
      // "Authorization": "Bearer {accessToken}"
    }
  })
  const data = await res.json();
  return data
}
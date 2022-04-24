class Provider {
  /**
   * Gets the weather for a given city
   */ static getWeather(city) {
    return Promise.resolve(`The weather of ${city} is Cloudy`)
  }
  /**
   * Gets the weather for a given city
   */ static getLocalCurrency(city) {
    return Promise.resolve(`The local currency of ${city} is GBP`)
  }
  /**
   * Given Longitude and latitude, this function returns a city
   */ static findCity(long, lat) {
    return Promise.resolve(`London`)
  }
}

async function getCityInfo(provider, long = 0, lat = 0) {
  try {
    const city = await provider.findCity(long, lat)
    const currency = await provider.getLocalCurrency(city)
    const weather = await provider.getWeather(city)

    return { city, currency, weather }
  } catch (error) {
    throw new Error("Error on getCityInfo:", error)
  }
}

// I have used async/await mixed with Promises chaining for demonstration purposes only.
const latitude = 51.5074
const longitude = 0.1278

getCityInfo(Provider, longitude, latitude)
  .then(({ city, currency, weather }) => {
    console.log(city)
    console.log(currency)
    console.log(`${weather}. ${currency}`)
  })
  .catch((e) => console.error(e))

export const EndPoints = {
  TOP_CITIES: `locations/v1/topcities/150`,
  CURRENT_CONDITION: `currentconditions/v1/`,
  FORECAST: "forecasts/v1/daily/5day/",
};
export const HelperFunctions = {
  celsiusToFahrenheit: (celsius) => Math.round(celsius * (9 / 5) + 32),
  fahrenheitToCelsius: (fahrenheit) => Math.round((fahrenheit - 32) * (5 / 9)),
  getDayName: (date, locale = "en-US") => {
    return date.toLocaleDateString(locale, { weekday: "long" }).slice(0, 3);
  },
};

// Description:
//   Get current weather
//
// Dependencies:
//
// Configuration:
//   HUBOT_WEATHER_BIT_API_KEY
//
// Commands:
//   jm <zipcode> - get weather for the zip code
//
// Notes:
//   N/A
//
// Author:
//   jmeridth

weather_bit_api_key = process.env.HUBOT_WEATHER_BIT_API_KEY || "";

module.exports = async (robot) => {
  robot.hear(/[0-9]{5}/i, async (res) => {
    const zip_code = res.match[1];
    url =
      "https://api.weatherbit.io/v2.0/current?key=#{weather_bit_api_key}&postal_code=#{zip_code}&country=US&units=I";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      await res.reply(`Something went wrong :thinking_face:`);
      robot.logger.error(
        `"Error occurred trying to get zipcode ${zip_code}.  Error: #{err}`
      );
    }
    data = JSON.parse(response.json());
    await res.reply(
      `The current weather for ${data.data[0].city_name} is ${data.data[0].weather.description} with a temperature of ${data.data[0].temp} Fahrenheit`
    );
  });
};

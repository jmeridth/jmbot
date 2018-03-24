# Description:
#   Get current weather
#
# Dependencies:
#
# Configuration:
#   WEATHER_BIT_API_KEY
#
# Commands:
#   meridthhubot <zipcode> - get weather for the zip code
#
# Notes:
#   N/A
#
# Author:
#   jmeridth

weather_bit_api_key = process.env.WEATHER_BIT_API_KEY or ''

module.exports = (robot) ->
  robot.hear /[0-9]{5}/, (msg) ->
    # make API request to weatherbit with zip code
    zip_code = msg.match[0]
    url = "https://api.weatherbit.io/v2.0/current?key=#{weather_bit_api_key}&postal_code=#{zip_code}&country=US&units=I"
    robot.http(url)
      .header('Accept', 'application/json')
      .get() (err, response, body) ->
        try
          data = JSON.parse(body)
        catch error
          msg.send "Something went wrong :thinking_face:"
          robot.logger.error "Error occurred trying to get zipcode #{zip_code}.  Error: #{err}"
        msg.send data.data[0].city_name
        msg.send "The current weather for #{data.data[0].city_name} is #{data.data[0].weather.description} with a temperature of #{data.data[0].temp} Fahrenheit"

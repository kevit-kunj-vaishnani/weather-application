const axios = require('axios');

async function forecast(latitude, longitude) {
    const url = 'http://api.weatherstack.com/current?access_key=d5a4f924b150a563a85a72818af15062&query=' + latitude + ',' + longitude; // khali url ni value url nam na variable ma assign kare chhe operation nathi kartu kai fetch nu

    try
    {
        const response = await axios.get(url);  // fetch nu operation perform kare chhe
        if (response.data.error)                // or we can also write  - if (data.success===false){}
        {
            return {"error":'location not exist'}
        }

        else
        {
            return {
                data:`${response.data.location.name} has temperature = ${response.data.current.temperature} celcius`,
                perfect_location:`${response.data.location.name},${response.data.location.country}`
            };
        }

        
    } 
    
    catch (error) 
    {
        return {"error":'net not connected'}
    }
}

module.exports = forecast;

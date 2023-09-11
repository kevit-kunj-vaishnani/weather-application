// 1st This will run then forecast

const axios = require('axios');

async function geolocation(address) {
    const locationUrl = 'https://geocode.maps.co/search?q=' + address;

    try
    {
        const response = await axios.get(locationUrl);
        
        if (response.data.length === 0) 
        {
            return {"error":'location not exist'}
        }

        else
        {
            return {
                location: response.data[0].display_name,
                latitude: response.data[0].lat,
                longitude: response.data[0].lon
            };
        }
    } 

    catch (error) 
    {
        return {"error":'net not connected'}
    }
}

module.exports = geolocation;

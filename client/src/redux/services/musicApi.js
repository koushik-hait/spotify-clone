const axios = require('axios');

export async function getPlayList(id) {

    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/playlist/',
        params: {id: id ? id : '37i9dQZF1DX4Wsb4d7NKfP'},
        headers: {
          'X-RapidAPI-Key': '449b621110msha8d35fbf8a874d0p1d66c9jsn16a898bf0008',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        // return response.data
    }).catch(function (error) {
        console.error(error);
    });
    
}
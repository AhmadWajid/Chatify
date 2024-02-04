 const axios = require('axios');
async function go(){
        data = await axios.get('https://api.apiit.edu.my/apspacequote')
        response = await data.data.QUOTE
        return response
      }

async function cat() {
  response = await axios.get('https://api.thecatapi.com/v1/images/search?format=json')
  response = await response.data[0].url
  return response
}
module.exports = {go, cat}
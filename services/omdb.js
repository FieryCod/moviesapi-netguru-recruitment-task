const axios = require('axios')

const BASE_OMDB_URL = `${ctx.env.OMDB_API_URL}/?apikey=${ctx.env.OMDB_API_KEY}&v=1&r=json`

function get (queryObj) {
  return axios.get(BASE_OMDB_URL, { params: queryObj })
}

module.exports = {
  get
}

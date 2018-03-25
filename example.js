const _ = require('lodash')
const omdbObjxx = {
  'Title': 'Galaxy',
  'Year': '1986',
  'Rated': 'N/A',
  'Released': '01 Jan 1986',
  'Runtime': '91 min',
  'Genre': 'Action, Adventure, Sci-Fi',
  'Director': 'Brett Piper',
  'Writer': 'Brett Piper',
  'Actors': 'Matt Mitler, Denise Coward, Joe Gentissi, Bill MacGlaughlin',
  'Plot': 'After hijacking a space shuttle, a spy finds that the controls are malfunctioning and sees alien battleships approaching Earth. Many years later, when the arc of his flight path returns to earth, he finds the planet under alien domination.',
  'Language': 'English, French',
  'Country': 'USA',
  'Awards': 'N/A',
  'Poster': 'https://ia.media-imdb.com/images/M/MV5BOTBhMGNhMTUtNTUwNS00NmYwLWI1ZmEtZWVlMTU4NDE3ZTFhXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg',
  'Ratings': [
    {
      'Source': 'Internet Movie Database',
      'Value': '5.1/10'
    },
    {
      'Source': 'Internet Movie Database',
      'Value': '5.1/10'
    }
  ],
  'Metascore': 'N/A',
  'imdbRating': '5.1',
  'imdbVotes': '90',
  'imdbID': 'tt0404977',
  'Type': 'movie',
  'DVD': 'N/A',
  'BoxOffice': 'N/A',
  'Production': 'N/A',
  'Website': 'N/A',
  'Response': 'True'
}

const blabla = function (omdbObj) {
  const overObjectsCollection = (maybeArray) => {
    if (_.isArray(maybeArray) && _.isObject(maybeArray[0])) {
      return _.map(maybeArray, (item) => blabla(item))
    }
  }

  const resolve = (item) => {
    return overObjectsCollection(item) || item
  }

  const reducer = (acc, value, key) => {
    return _.assign({}, acc, { [_.camelCase(key)]: resolve(omdbObj[key]) })
  }

  return _.reduce(omdbObj, reducer, {})
}

console.log(blabla(omdbObjxx))

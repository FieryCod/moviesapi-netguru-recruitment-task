const { commonHelper } = require('../../../api/helpers')
const _ = require('lodash')

describe('helpers: commonHelper', function () {
  describe('#getSwagParameter', function () {
    it('should return the correct property', function () {
      const input = { swagger: { params: { title: { value: 'someValue', schema: {} } } } }

      const ret = commonHelper.getSwagParameter(input, 'title')
      ret.should.be.eql('someValue')
    })

    it('should return default value when property is not defined', function () {
      const input = { swagger: { params: {} } }

      const ret = commonHelper.getSwagParameter(input, 'someProperty', 'Yupi!')
      ret.should.be.eql('Yupi!')
    })
  })

  describe('#getSwagParameters', function () {
    it('should return the correct properties', function () {
      const input = { swagger: { params: { title: { value: 'someValue' }, title1: { value: 'someValue1' } } } }

      const ret = commonHelper.getSwagParameters([ 'title', 'title1' ], input)
      ret.should.be.eql([ 'someValue', 'someValue1' ])
    })
  })

  describe('#propValueToArray', function () {
    it('should change empty string to empty array', function () {
      const inputProps = [ 'someProperty' ]
      const inputItem = ''

      const ret = commonHelper.propValueToArray(inputProps)(inputItem, 'someProperty')
      ret.should.be.eql([])
    })

    it('should change string of entries to array', function () {
      const inputProps = [ 'someProperty' ]
      const inputItem = 'a, b, c, d, e, f, g'

      const ret = commonHelper.propValueToArray(inputProps)(inputItem, 'someProperty')
      ret.should.be.eql([ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ])
    })
  })

  describe('#getNormalizedObj', function () {
    it('should normalize the obj with array of objects', function () {
      const input = {
        'Title': 'Galaxy',
        'Poster': 'https://ia.media-imdb.com/images/M/MV5BOTBhMGNhMTUtNTUwNS00NmYwLWI1ZmEtZWVlMTU4NDE3ZTFhXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg',
        'Ratings': [
          {
            'Source': 'Internet Movie Database',
            'Value': '5.1/10'
          },
          {
            'Source': 'Some source',
            'Value': '5.2/10'
          }
        ],
        'Budget': '50$'
      }

      const controlRet = {
        'title': 'Galaxy',
        'poster': 'https://ia.media-imdb.com/images/M/MV5BOTBhMGNhMTUtNTUwNS00NmYwLWI1ZmEtZWVlMTU4NDE3ZTFhXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg',
        'ratings': [
          {
            'source': 'Internet Movie Database',
            'value': '5.1/10'
          },
          {
            'source': 'Some source',
            'value': '5.2/10'
          }
        ],
        'budget': '50$'
      }

      const ret = commonHelper.getNormalizedObj(input, _.camelCase)
      ret.should.be.eql(controlRet)
    })

    it('should normalize the obj with array of primitives', function () {
      const input = {
        'Title': 'Galaxy',
        'Poster': 'https://ia.media-imdb.com/images/M/MV5BOTBhMGNhMTUtNTUwNS00NmYwLWI1ZmEtZWVlMTU4NDE3ZTFhXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg',
        'Ratings': [ 1, 2, 3, 4, 5 ],
        'Budget': '50$'
      }

      const controlRet = {
        'title': 'Galaxy',
        'poster': 'https://ia.media-imdb.com/images/M/MV5BOTBhMGNhMTUtNTUwNS00NmYwLWI1ZmEtZWVlMTU4NDE3ZTFhXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg',
        'ratings': [ 1, 2, 3, 4, 5 ],
        'budget': '50$'
      }

      const ret = commonHelper.getNormalizedObj(input, _.camelCase)
      ret.should.be.eql(controlRet)
    })

    it('should normalize the obj with nested objects', function () {
      const input = {
        'Title': 'Galaxy',
        'Poster': 'https://ia.media-imdb.com/images/M/MV5BOTBhMGNhMTUtNTUwNS00NmYwLWI1ZmEtZWVlMTU4NDE3ZTFhXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg',
        'SomeObj': {
          'Key': {
            'Key1': 1
          },
          'Key2': 2
        },
        'Budget': '50$'
      }

      const controlRet = {
        'title': 'Galaxy',
        'poster': 'https://ia.media-imdb.com/images/M/MV5BOTBhMGNhMTUtNTUwNS00NmYwLWI1ZmEtZWVlMTU4NDE3ZTFhXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg',
        'someObj': {
          'key': {
            'key1': 1
          },
          'key2': 2
        },
        'budget': '50$'
      }

      const ret = commonHelper.getNormalizedObj(input, _.camelCase)
      ret.should.be.eql(controlRet)
    })
  })
})

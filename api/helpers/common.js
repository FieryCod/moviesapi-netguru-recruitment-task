const dbErrorFactory = require('../../db/error-factory')
const _ = require('lodash')

/**
 * Retrieves the body parameter from the req.swagger.
 * If failed then returns defaultValue
 * @param {Object} req
 * @param {String} paramName
 * @param {Any} defaultValue
 * @returns {Any}
 */
function getSwagParameter (req, paramName, defaultValue) {
  const reqParams = req.swagger.params[paramName]
  return reqParams ? reqParams.value : defaultValue
}

/**
 * Function description.
 * @param {Type of parameters} parameters - Parameter description.
 * @param {Type of req} req - Parameter description.
 * @returns {Return Type} Return description.
 */
function getSwagParameters (parameters, req) {
  return _.map(parameters, (parameter) => getSwagParameter(req, parameter))
}

/**
 * Checks if property name matches current key
 * and then replaces the string of that property to array of strings
 * @param {Array<String>} props
 * @returns {Function}
 */
function propValueToArray (props) {
  return function (item, key) {
    return _.includes(props, key) ?
      !_.isEmpty(item) ?
        _.split(item, ', ') :
        [] :
      item
  }
}

/**
 * Normalizes json object retrieved from external API
 * Check the test/api/helpers/common
 * @param {Object} someObj
 * @param {Function} transKeyFn - function which transforms the key to another key
 * @param {Function} transValFn - function which transforms single value to another value
 * @returns {Object}
 */
function getNormalizedObj (someObj, transKeyFn, transValFn = (val, key) => val) {
  /**
   * Normalizes collection of objects in the input obj
   * eg. [{}, {}, {}]
   * @param {Any} maybeArray
   * @returns {Array|null}
   */
  const _overObjectsCollection = (maybeArray) => (_.isArray(maybeArray) && _.isObject(maybeArray[0])) ?
    _.map(maybeArray, (item) => getNormalizedObj(item, transKeyFn, transValFn)) : null

  /**
   * Normalizes the nested object in the input obj
   * eg. { key: { key1: {} } }
   * @param {Object} maybeObj
   * @returns {Object|null}
   */
  const _overNestedObject = (maybeObj) => (_.isObject(maybeObj) && !_.isArray(maybeObj)) ? getNormalizedObj(maybeObj, transKeyFn, transValFn) : null

  /**
   * Either resolve the objectCollection or nestedObject or the single one
   * @param {Any} item
   * @returns {Any}
   */
  const _resolve = (item, key) => _overObjectsCollection(item) || _overNestedObject(item) || transValFn(item, key)

  /**
   * Reducer
   */
  const reducer = (acc, value, key) => _.assign({}, acc, { [ transKeyFn(key) ]: _resolve(someObj[key], key) })

  /**
   * Execute the reducer over someObj
   */
  return _.reduce(someObj, reducer, {})
}

/**
 * Handle various db errors
 * @param {DecoratedError} err
 * @param {Express.next} next
 */
function handleDbError (err, next) {
  const decorErr = { type: err.name, message: `${err.message}. Original: ${err.original.detail}` }
  return next(dbErrorFactory[decorErr.type](decorErr.message))
}

module.exports = {
  getSwagParameters,
  getSwagParameter,
  getNormalizedObj,
  propValueToArray,
  handleDbError
}

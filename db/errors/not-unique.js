module.exports = class NotUnique extends Error {
  constructor (message) {
    // send a message to a default error object
    super(`Data already in DB use GET to retrieve it, original message: ${message}`)

    // save the constructor name in the new class
    this.name = this.constructor.name

    // create a custom status
    this.status = 409
  }
}

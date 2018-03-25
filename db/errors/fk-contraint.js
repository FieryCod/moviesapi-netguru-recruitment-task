module.exports = class FkContraintViolation extends Error {
  constructor (message) {
    // send a message to a default error object
    super(`You did violate the foreign key constraint: ${message}`)

    // save the constructor name in the new class
    this.name = this.constructor.name

    // create a custom status
    this.status = 409
  }
}

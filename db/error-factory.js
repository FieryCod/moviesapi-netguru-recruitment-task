const FkConstraintViolation = require('./errors/fk-contraint')
const NotUnique = require('./errors/not-unique')

module.exports = {
  'SequelizeUniqueConstraintError': function (message) {
    return new NotUnique(message)
  },
  // Foreign key violation
  'SequelizeForeignKeyConstraintError': function (message) {
    return new FkConstraintViolation(message)
  }
}

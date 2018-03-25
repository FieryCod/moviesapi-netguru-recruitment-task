module.exports = function () {
  ctx.app.use((err, req, res, next) => {
    // handle error
    res
      .status(err.status || 500)
      .json({ message: err.message })
  })
}

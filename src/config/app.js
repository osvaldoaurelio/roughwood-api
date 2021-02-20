module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '2d',
  },
  server: {
    port: process.env.PORT,
  }
}

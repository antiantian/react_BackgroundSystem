const domain = 'http://127.0.0.1:3000/mock'
const proxy = [
  {
    url: '/api/*',
    target: domain
  }
]

module.exports = proxy

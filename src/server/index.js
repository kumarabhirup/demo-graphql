const express = require('express')
const expressGraphql = require('express-graphql')

const sendFilePath = require('../lib/sendFilePath')
const schema = require('./schema')
const mutations = require('./resolvers/mutation')
const queries = require('./resolvers/query')

// Root resolver
const root = {
  ...queries,
  ...mutations,
}

const app = express()

app.use(
  '/graphql',
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: true,
  })
)

app.use('/public', express.static('src/public'))

// Routes
app.get('/', (req, res) => {
  res.sendFile(sendFilePath('index.html'))
})

app.listen(process.env.PORT || 3001)

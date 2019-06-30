const express = require('express')
const { buildSchema } = require('graphql')
const expressGraphql = require('express-graphql')

const sendFilePath = require('../lib/sendFilePath')

// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`)
// Root resolver
const root = {
  message: () => 'Hello World!',
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

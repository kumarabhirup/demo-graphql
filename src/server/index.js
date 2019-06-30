const express = require('express')
const { buildSchema } = require('graphql')
const expressGraphql = require('express-graphql')

const sendFilePath = require('../lib/sendFilePath')

// GraphQL schema
const schema = buildSchema(`
    type Query {
      course(id: Int!): Course
      courses(topic: String): [Course]
    },
    type Mutation {
      updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
      id: Int
      title: String
      author: String
      description: String
      topic: String
      url: String
    }
`)

const coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description:
      'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/',
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description:
      'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
  },
  {
    id: 3,
    /* eslint-disable-next-line no-script-url */
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description:
      'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/',
  },
]

const getCourse = args => {
  const { id } = args
  return coursesData.filter(course => course.id === id)[0]
}

const getCourses = args => {
  if (args.topic) {
    const { topic } = args
    return coursesData.filter(course => course.topic === topic)
  }
  return coursesData
}

const updateCourseTopic = ({ id, topic }) => {
  // eslint-disable-next-line array-callback-return
  coursesData.map(course => {
    if (course.id === id) {
      course.topic = topic
      return course
    }
  })
  return coursesData.filter(course => course.id === id)[0]
}

// Root resolver
const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic,
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

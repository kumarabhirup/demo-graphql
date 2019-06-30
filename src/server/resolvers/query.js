const coursesData = require('../couresData')

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

module.exports = {
  course: getCourse,
  courses: getCourses,
}
